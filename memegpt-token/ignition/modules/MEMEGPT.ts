import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TOTAL_SUPPLY = 1_000_000_000n * 10n ** 18n;

const MEMEGPTModule = buildModule("MEMEGPTModule", (m) => {
  const initialOwner = m.getParameter("initialOwner");

  const token = m.contract("MEMEGPT", [initialOwner]);

  const enableAntiWhale = m.getParameter("enableAntiWhale", false);
  const maxWallet = m.getParameter("maxWallet", TOTAL_SUPPLY);
  const maxTx = m.getParameter("maxTx", TOTAL_SUPPLY);

  m.call(token, "enableAntiWhale", [maxWallet, maxTx], {
    id: "enableAntiWhale",
    after: [token],
    if: enableAntiWhale,
  });

  return { token };
});

export default MEMEGPTModule;
