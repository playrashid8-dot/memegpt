import { SITE } from "@/lib/constants";
import Logo from "@/components/ui/Logo";

const SOCIALS = [
  {
    label: "Telegram",
    href: SITE.links.telegram,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: SITE.links.twitter,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-neon/15 bg-black/80 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left flex flex-col items-center md:items-start gap-3">
            <Logo variant="footer" />
            <p className="text-sm text-foreground/45 max-w-sm">
              {SITE.tagline}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-12 h-12 rounded-xl glass-card-ultra flex items-center justify-center text-foreground/50 hover:text-neon hover:border-neon/45 hover:shadow-[0_0_25px_rgba(0,255,136,0.2)] transition-all duration-300 holographic-border"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-foreground/35">
            <span>Contract:</span>
            <code className="px-3 py-1.5 rounded-lg bg-white/[0.04] text-neon/70 border border-neon/15">
              {SITE.contract}
            </code>
          </div>
          <p className="text-xs text-foreground/35">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>

        <p className="mt-6 text-center text-[10px] text-foreground/25 leading-relaxed max-w-2xl mx-auto">
          Disclaimer: MEMEGPT is a meme token for entertainment purposes. This is
          not financial advice. Cryptocurrency investments carry high risk. Always
          do your own research before investing. Past performance does not
          guarantee future results.
        </p>
      </div>
    </footer>
  );
}
