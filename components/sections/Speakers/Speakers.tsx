import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GithubIcon, TwitterIcon } from "@/components/icons/SocialIcons";

export function SpeakersSection() {
  return (
    <section id="speakers" className="bg-slate-100/30 dark:bg-slate-800/30 border-t border-b border-slate-200 py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4">

        <SectionHeader 
          subtitle="Subject Matter Experts" 
          title="Meet the Speakers" 
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Speaker 1 */}
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 text-center hover:border-cnd-sky transition-all duration-300 group relative shadow-sm dark:shadow-none">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 rounded-2xl relative overflow-hidden h-32">
                <div className="absolute inset-0 bg-grid-cyber opacity-20" />
                <span className="text-2xl font-mono font-bold text-cnd-blue relative z-10">AS</span>
              </div>
            </div>
            <h4 className="text-lg font-bold text-slate-950 dark:text-slate-100">Dr. Ananya Sen</h4>
            <p className="text-xs font-mono text-cnd-sky mt-1">VP of Developer Ecosystem, Vultr</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
              20+ years of distributed systems engineering. Formerly at AWS and CNCF steering committee.
            </p>

            <div className="flex justify-center gap-4 mt-6 text-slate-400">
              <a href="https://github.com" className="hover:text-slate-800 dark:text-slate-200 transition-colors"><GithubIcon className="w-4 h-4" /></a>
              <a href="https://twitter.com" className="hover:text-slate-800 dark:text-slate-200 transition-colors"><TwitterIcon className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Speaker 2 */}
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 text-center hover:border-cnd-sky transition-all duration-300 group relative shadow-sm dark:shadow-none">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 rounded-2xl relative overflow-hidden h-32">
                <div className="absolute inset-0 bg-grid-cyber opacity-20" />
                <span className="text-2xl font-mono font-bold text-cnd-sky relative z-10">RD</span>
              </div>
            </div>
            <h4 className="text-lg font-bold text-slate-950 dark:text-slate-100">Rohan Deshmukh</h4>
            <p className="text-xs font-mono text-cnd-sky mt-1">Principal Solutions Architect</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
              Expert in deploying cluster grids for high-performance GPUs and private neural network pipelines.
            </p>

            <div className="flex justify-center gap-4 mt-6 text-slate-400">
              <a href="https://github.com" className="hover:text-slate-800 dark:text-slate-200 transition-colors"><GithubIcon className="w-4 h-4" /></a>
              <a href="https://twitter.com" className="hover:text-slate-800 dark:text-slate-200 transition-colors"><TwitterIcon className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Speaker 3 */}
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 text-center hover:border-cnd-sky transition-all duration-300 group relative shadow-sm dark:shadow-none">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 rounded-2xl relative overflow-hidden h-32">
                <div className="absolute inset-0 bg-grid-cyber opacity-20" />
                <span className="text-2xl font-mono font-bold text-cnd-blue relative z-10">SN</span>
              </div>
            </div>
            <h4 className="text-lg font-bold text-slate-950 dark:text-slate-100">Sneha Nair</h4>
            <p className="text-xs font-mono text-cnd-sky mt-1">Lead Platform Engineer, TechLabs</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
              Active Crossplane and ArgoCD committer. Focuses on developer portals and self-service infra tools.
            </p>

            <div className="flex justify-center gap-4 mt-6 text-slate-400">
              <a href="https://github.com" className="hover:text-slate-800 dark:text-slate-200 transition-colors"><GithubIcon className="w-4 h-4" /></a>
              <a href="https://twitter.com" className="hover:text-slate-800 dark:text-slate-200 transition-colors"><TwitterIcon className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Speaker 4 */}
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 text-center hover:border-cnd-sky transition-all duration-300 group relative shadow-sm dark:shadow-none">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 rounded-2xl relative overflow-hidden h-32">
                <div className="absolute inset-0 bg-grid-cyber opacity-20" />
                <span className="text-2xl font-mono font-bold text-slate-700 dark:text-slate-300 relative z-10">VM</span>
              </div>
            </div>
            <h4 className="text-lg font-bold text-slate-950 dark:text-slate-100">Vikram Malhotra</h4>
            <p className="text-xs font-mono text-cnd-sky mt-1">DevSecOps Director, Securitas</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
              Specialist in eBPF runtime trace diagnostics. Audits container platforms for financial companies.
            </p>

            <div className="flex justify-center gap-4 mt-6 text-slate-400">
              <a href="https://github.com" className="hover:text-slate-800 dark:text-slate-200 transition-colors"><GithubIcon className="w-4 h-4" /></a>
              <a href="https://twitter.com" className="hover:text-slate-800 dark:text-slate-200 transition-colors"><TwitterIcon className="w-4 h-4" /></a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
