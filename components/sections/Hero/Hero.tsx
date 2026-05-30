"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, MapPin, Clock, Terminal, ExternalLink } from "lucide-react";
import {
  SketchCloud,
  SketchGlobe,
  SketchKubernetes,
  SketchLoop,
  SketchStar,
  SketchCross,
  SketchBracketLeft,
  SketchBracketRight,
  SketchPeople
} from "@/components/DoodleSvgs";

interface HeroSectionProps {
  sandboxDrawings: boolean;
}

export function HeroSection({ sandboxDrawings }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pt-16 pb-24 md:pt-20 md:pb-32 relative z-10" onMouseMove={handleMouseMove}>
      {/* Interactive Mouse light effect */}
      {mounted && (
        <div
          className="absolute -inset-px rounded-3xl opacity-10 pointer-events-none transition-all duration-300 bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),#0ea5e9,transparent_80%)]"
          style={{
            ["--mouse-x" as any]: `${mousePosition.x}px`,
            ["--mouse-y" as any]: `${mousePosition.y}px`,
          }}
        />
      )}

      {/* Technical Doodles as low-opacity, precise architectural layout accents */}
      {sandboxDrawings && (
        <>
          <div className="absolute top-10 left-[8%] animate-float pointer-events-none hidden lg:block opacity-25">
            <SketchKubernetes className="w-12 h-12 text-cnd-sky" />
            <span className="text-[9px] font-mono text-cnd-sky block text-center mt-1">k8s_wheel.io</span>
          </div>
          <div className="absolute top-36 right-[6%] animate-float-delayed pointer-events-none hidden lg:block opacity-25">
            <SketchGlobe className="w-14 h-14 text-cnd-blue" />
            <span className="text-[9px] font-mono text-cnd-blue block text-center mt-1">network_mesh</span>
          </div>
          <div className="absolute bottom-10 left-[4%] animate-float pointer-events-none hidden lg:block opacity-25">
            <SketchPeople className="w-16 h-10 text-slate-500" />
            <span className="text-[9px] font-mono text-slate-600 dark:text-slate-400 block text-center mt-1">nodes_cluster</span>
          </div>
          <div className="absolute bottom-20 right-[8%] animate-float-delayed pointer-events-none hidden lg:block opacity-25">
            <SketchCloud className="w-14 h-8 text-cnd-blue" />
            <span className="text-[9px] font-mono text-cnd-blue block text-center mt-1">infra_cloud</span>
          </div>
        </>
      )}

      <div className="max-w-4xl mx-auto text-center space-y-8">

        {/* Centered Brand Badge enclosing the branding elements in a technical layout */}
        <div className="inline-flex items-center justify-center gap-3 md:gap-4 relative animate-float mx-auto max-w-full pb-4">
          {sandboxDrawings && <SketchBracketLeft className="w-4 h-12 text-slate-400 opacity-60" />}

          <div className="flex items-center shadow-md rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <Image
              src="/CND_logo.png"
              alt="CND Logo"
              width={160}
              height={42}
              className="h-12 w-auto object-contain"
              priority
            />
          </div>

          {sandboxDrawings && <SketchCross className="w-4 h-4 text-slate-400" />}

          <div className="py-2.5 px-5 rounded-xl bg-cnd-blue dark:bg-cnd-indigo border border-cnd-blue flex items-center shadow-md">
            <Image
              src="/vultr-logo-rec-white.png"
              alt="Vultr"
              width={80}
              height={22}
              className="h-5 w-auto object-contain"
            />
          </div>

          {sandboxDrawings && <SketchBracketRight className="w-4 h-12 text-slate-400 opacity-60" />}

          {sandboxDrawings && <SketchLoop className="absolute -bottom-4 right-1/4 w-6 h-6 text-cnd-sky/20" />}
          {sandboxDrawings && <SketchStar className="absolute -top-3 left-1/4 w-5 h-5 text-cnd-blue/20" />}
        </div>

        {/* Huge Main Header */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
          Build, Orchestrate & Scale at{" "}
          <span className="bg-gradient-to-r from-cnd-blue to-cnd-sky bg-clip-text text-transparent text-glow-blue">
            Cloud Native Day
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The ultimate gathering for Kubernetes operators, platform engineers, and DevOps professionals in Pune. Hosted in collaboration with <span className="text-slate-900 dark:text-slate-100 font-semibold">Vultr</span>.
        </p>

        {/* Event Quick Details Board */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-6">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none flex items-center gap-3">
            <Calendar className="w-5 h-5 text-cnd-sky shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-mono">Date</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">May 31, 2026</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none flex items-center gap-3">
            <MapPin className="w-5 h-5 text-cnd-sky shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-mono">Venue</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">JW Marriott Hotel, Pune</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none flex items-center gap-3">
            <Clock className="w-5 h-5 text-cnd-sky shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-mono">Timing</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">09:00 AM IST onwards</p>
            </div>
          </div>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
          <a
            href="#register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cnd-blue hover:bg-cnd-light dark:bg-cnd-indigo text-white font-semibold text-base transition-all duration-200 shadow-md shadow-cnd-blue/10 border border-cnd-blue flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Get Free Entry Pass</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:bg-slate-800/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Submit CFP Talk</span>
            <Terminal className="w-4 h-4 text-cnd-sky" />
          </a>
        </div>

      </div>

    </section>
  );
}
