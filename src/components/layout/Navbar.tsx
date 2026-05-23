"use client";

import { motion } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="mt-2.5 sm:mt-3 flex items-center justify-between rounded-xl glass-card-ultra px-3 sm:px-4 py-2.5 sm:py-3 md:px-6 border-neon/15 shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
          <a
            href="#"
            className="group flex items-center shrink-0 min-w-0 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            aria-label={`${SITE.name} home`}
          >
            <Logo variant="navbar" />
          </a>

          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm text-foreground/50 hover:text-neon transition-colors duration-200 group font-medium"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon shadow-[0_0_6px_rgba(0,255,136,0.4)] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2.5">
            <Button href={SITE.links.telegram} variant="secondary" external>
              Telegram
            </Button>
            <Button href={SITE.links.buy} external className="btn-pulse-ring">
              Buy Token
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 shrink-0"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-neon shadow-[0_0_6px_rgba(0,255,136,0.4)]"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-0.5 bg-neon"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-neon shadow-[0_0_6px_rgba(0,255,136,0.4)]"
            />
          </button>
        </div>

        <motion.div
          initial={false}
          animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden overflow-hidden"
        >
          <div className="mt-2 rounded-xl glass-card-ultra p-3 sm:p-4 flex flex-col gap-1 border-neon/15">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-foreground/65 hover:text-neon py-2.5 px-3 rounded-lg hover:bg-neon/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 mt-1 border-t border-white/5">
              <Button href={SITE.links.telegram} variant="secondary" external>
                Telegram
              </Button>
              <Button href={SITE.links.buy} external className="btn-pulse-ring">
                Buy Token
              </Button>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
