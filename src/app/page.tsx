'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ScrollSequence } from '@/components/ScrollSequence';
import { TransitionSection } from '@/components/TransitionSection';
import { FeatureSection } from '@/components/FeatureSection';
import { TechnologySection } from '@/components/TechnologySection';
import { FinalSection } from '@/components/FinalSection';
import { Footer } from '@/components/FooterSections';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="relative bg-[#0E0E11] min-h-screen">
      <Navbar />
      <Hero />
      <ScrollSequence />
      <TransitionSection />

      <FeatureSection
        id="precision"
        title="I control the pixel."
        align="left"
        description={
          <>
            Your speed needs accuracy. I provide the stop.<br />
            When you align the grid or take the shot, I am there.
          </>
        }
      />

      <FeatureSection
        id="comfort"
        title="I disappear in your hand."
        align="right"
        description={
          <>
            Through the marathon. Through the sprint.<br />
            I support your grip so you can focus on the screen.
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center bg-[#0E0E11]/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors"
          >
            <div className="w-12 h-12 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.2)]">
              <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f3ff]" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">My Form</h4>
            <p className="text-white/40 text-sm">I follow your natural curve.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center text-center bg-[#0E0E11]/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors"
          >
            <div className="w-12 h-12 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.2)]">
              <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f3ff]" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">My Surface</h4>
            <p className="text-white/40 text-sm">I resist wear. I stay consistent.</p>
          </motion.div>
        </div>
      </FeatureSection>

      <TechnologySection />
      <FinalSection />
      <Footer />

    </main>
  );
}
