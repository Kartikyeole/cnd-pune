"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgendaTimeline from "@/components/AgendaTimeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HeroSection } from "@/components/sections/Hero/Hero";
import { MetricsSection } from "@/components/sections/Metrics/Metrics";
import { AboutSection } from "@/components/sections/About/About";
import { SpeakersSection } from "@/components/sections/Speakers/Speakers";
import { SponsorSection } from "@/components/sections/Sponsor/Sponsor";
import { SandboxSection } from "@/components/sections/Sandbox/Sandbox";
import { BadgeGenerator } from "@/components/sections/Badge/BadgeGenerator";
import { FAQSection } from "@/components/sections/FAQ/FAQ";

export default function Home() {
  const [sandboxDrawings, setSandboxDrawings] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans selection:bg-cnd-blue selection:text-white overflow-x-hidden relative">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 bg-grid-cyber pointer-events-none opacity-40 z-0" />
      <div className="absolute inset-0 bg-grid-cyber-fine pointer-events-none opacity-20 z-0" />

      {/* Soft Blue Ambient light glows */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] bg-cnd-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-cnd-sky/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[20%] w-[500px] h-[500px] bg-cnd-blue/5 rounded-full blur-[140px] pointer-events-none" />



      <HeroSection sandboxDrawings={sandboxDrawings} />
      <MetricsSection />
      <AboutSection />
      <SpeakersSection />

      <section id="sessions" className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        <SectionHeader
          subtitle="Program Schedule"
          title="Event Agenda"
          lineColor="bg-cnd-light dark:bg-cnd-indigo/50"
        />
        <AgendaTimeline />
      </section>

      <SponsorSection />
      <BadgeGenerator />

    </div>
  );
}
