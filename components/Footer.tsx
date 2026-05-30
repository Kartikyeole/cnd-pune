import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:bg-slate-800/50 py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">

        <div className="space-y-4">
          <div className="flex justify-center md:justify-start items-center">
            <Image
              src="/CND_logo.png"
              alt="CND Logo"
              width={140}
              height={36}
              className="h-8 w-auto object-contain object-left"
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            An independent, community-driven event in partnership with cloud native enthusiasts and Vultr.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
          <a href="https://github.com" className="hover:text-cnd-blue transition-colors">./github</a>
          <a href="https://twitter.com" className="hover:text-cnd-blue transition-colors">./twitter_x</a>
          <a href="https://cncf.io" className="hover:text-cnd-blue transition-colors">./cncf_community</a>
          <a href="https://www.vultr.com" className="hover:text-cnd-blue transition-colors">./vultr_hosting</a>
        </div>

        <div className="space-y-1 text-xs text-slate-500">
          <p>&copy; 2026 Cloud Native Day Pune.</p>
          <p className="font-mono text-[10px] text-slate-400">release: cnd-pune-2026-v1.0.0</p>
        </div>

      </div>
    </footer>
  );
}
