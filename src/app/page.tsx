import Hero from "@/components/sections/Hero";
import TokenStats from "@/components/sections/TokenStats";
import DexScreener from "@/components/sections/DexScreener";
import AIScanner from "@/components/sections/AIScanner";
import LiveTerminal from "@/components/sections/LiveTerminal";
import Tokenomics from "@/components/sections/Tokenomics";
import Roadmap from "@/components/sections/Roadmap";
import WhyMemeGPT from "@/components/sections/WhyMemeGPT";
import TelegramCTA from "@/components/sections/TelegramCTA";
import CinematicBackground from "@/components/effects/CinematicBackground";

export default function Home() {
  return (
    <>
      <CinematicBackground />
      <div className="relative z-10">
        <Hero />
        <TokenStats />
        <DexScreener />
        <AIScanner />
        <LiveTerminal />
        <Tokenomics />
        <Roadmap />
        <WhyMemeGPT />
        <TelegramCTA />
      </div>
    </>
  );
}
