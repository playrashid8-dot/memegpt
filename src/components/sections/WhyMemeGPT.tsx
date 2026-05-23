"use client";

import { motion } from "framer-motion";
import { WHY_CARDS } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";

export default function WhyMemeGPT() {
  return (
    <SectionWrapper id="why">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why MEMEGPT"
          title="Built Different"
          subtitle="Six reasons degens are switching to AI-powered meme intelligence."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {WHY_CARDS.map((card, i) => (
            <GlassCard key={card.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl mb-5 inline-block drop-shadow-[0_0_20px_rgba(0,255,136,0.3)]"
              >
                {card.icon}
              </motion.div>
              <h3 className="font-display text-lg sm:text-xl font-bold mb-3 group-hover:text-neon transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-sm text-foreground/55 leading-relaxed">
                {card.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
