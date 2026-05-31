import Image from "next/image";
import React from "react";
export default function Navbar({ otherSection = true }: { otherSection?: boolean }) {
  return (
    <nav className="sticky top-0 bg-cnd-light/90 dark:bg-cnd-indigo/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Image
            src="/CND_logo.png"
            alt="CND Logo"
            width={160}
            height={42}
            className="h-10 w-auto object-contain object-left shrink-0"
            priority
          />
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-1" />
          <div className="flex items-center py-1.5 px-3 rounded-lg dark:bg-cnd-indigo">
            <Image
              src="/vultr-logo-rec-white.png"
              alt="Vultr Light"
              width={70}
              height={20}
              className="h-4 w-auto object-contain dark:hidden"
            />
            <Image
              src="/vultr-logo-rec-dark.png"
              alt="Vultr Dark"
              width={70}
              height={20}
              className="h-4 w-auto object-contain hidden dark:block"
            />
          </div>
        </div>

        {!otherSection && <div className="hidden md:flex items-center gap-8 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
          <a href="#about" className="hover:text-cnd-blue transition-colors">./about</a>
          <a href="#sessions" className="hover:text-cnd-blue transition-colors">./sessions</a>
          <a href="#speakers" className="hover:text-cnd-blue transition-colors">./speakers</a>
          <a href="#vultr-cloud" className="hover:text-cnd-blue transition-colors">./vultr_cloud</a>
        </div>}
      </div>
    </nav>
  );
}
