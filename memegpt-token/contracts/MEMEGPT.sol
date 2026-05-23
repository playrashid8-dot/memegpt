// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MEMEGPT (MGPT)
 * @notice Fixed-supply, no-tax BEP20 token for BNB Smart Chain.
 *
 * Features:
 * - Standard ERC20 / BEP20 transfers
 * - Public burn (any holder can burn their own tokens)
 * - Ownable with renounceOwnership() support
 * - Optional, transparent anti-whale limits (permanently removable)
 *
 * Explicitly excluded:
 * - Taxes, reflections, auto-liquidity
 * - Blacklist / whitelist / trading restrictions
 * - Hidden mint or upgradeability
 */
contract MEMEGPT is ERC20, Ownable {
    /// @notice Total supply: 1,000,000,000 tokens (18 decimals).
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10 ** 18;

    /// @notice Maximum tokens a single wallet may hold while anti-whale is active.
    uint256 public maxWalletAmount;

    /// @notice Maximum tokens per transfer while anti-whale is active.
    uint256 public maxTxAmount;

    /// @notice Whether anti-whale checks are enforced on transfers.
    bool public antiWhaleActive;

    /// @notice Once true, anti-whale can never be re-enabled.
    bool public antiWhalePermanentlyDisabled;

    event AntiWhaleEnabled(uint256 maxWalletAmount, uint256 maxTxAmount);
    event AntiWhalePermanentlyDisabled();

    /**
     * @param initialOwner Receives the full supply at deployment.
     */
    constructor(address initialOwner) ERC20("MEMEGPT", "MGPT") Ownable(initialOwner) {
        maxWalletAmount = type(uint256).max;
        maxTxAmount = type(uint256).max;

        _mint(initialOwner, TOTAL_SUPPLY);
    }

    /**
     * @notice Burn tokens from the caller's balance.
     * @param amount Amount of tokens to burn (18 decimals).
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    /**
     * @notice Enable transparent anti-whale limits.
     * @dev Can only be called while anti-whale has not been permanently disabled.
     *      Owner transfers are exempt to simplify liquidity setup.
     * @param maxWallet Maximum wallet balance (18 decimals).
     * @param maxTx Maximum transfer amount (18 decimals).
     */
    function enableAntiWhale(uint256 maxWallet, uint256 maxTx) external onlyOwner {
        require(!antiWhalePermanentlyDisabled, "MEMEGPT: anti-whale disabled");
        require(maxWallet > 0 && maxTx > 0, "MEMEGPT: invalid limits");
        require(maxTx <= maxWallet, "MEMEGPT: maxTx exceeds maxWallet");

        maxWalletAmount = maxWallet;
        maxTxAmount = maxTx;
        antiWhaleActive = true;

        emit AntiWhaleEnabled(maxWallet, maxTx);
    }

    /**
     * @notice Permanently disable anti-whale limits. This action is irreversible.
     */
    function disableAntiWhalePermanently() external onlyOwner {
        antiWhalePermanentlyDisabled = true;
        antiWhaleActive = false;
        maxWalletAmount = type(uint256).max;
        maxTxAmount = type(uint256).max;

        emit AntiWhalePermanentlyDisabled();
    }

    /**
     * @inheritdoc ERC20
     */
    function _update(address from, address to, uint256 value) internal override {
        if (antiWhaleActive && from != address(0) && to != address(0)) {
            // Exempt owner for liquidity provisioning and distribution.
            if (from != owner() && to != owner()) {
                require(value <= maxTxAmount, "MEMEGPT: exceeds max tx");

                if (to != address(0)) {
                    uint256 newBalance = balanceOf(to) + value;
                    require(newBalance <= maxWalletAmount, "MEMEGPT: exceeds max wallet");
                }
            }
        }

        super._update(from, to, value);
    }
}
