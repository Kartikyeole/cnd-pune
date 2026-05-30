import React from "react";
import { Cpu, Layers, ShieldAlert, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AboutSection() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 py-24 relative z-10">
      
      <SectionHeader 
        subtitle="Core Objective" 
        title="Why Attend Cloud Native Day?" 
        lineColor="bg-cnd-blue" 
      />

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Card 1 */}
        <div className="p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-cnd-blue/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300 group flex flex-col justify-between shadow-sm dark:shadow-none">
          <div>
            <div className="w-12 h-12 rounded-xl bg-cnd-light dark:bg-cnd-indigo/50 border border-cnd-blue/20 flex items-center justify-center text-cnd-blue mb-6 group-hover:bg-cnd-blue group-hover:text-white transition-colors duration-300">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Enterprise Scale Kubernetes</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Learn directly from engineers operating clusters at massive scale. Dive deep into network service meshes (Linkerd, Istio), persistent storage adapters, and custom resource definitions.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs font-mono text-cnd-blue group-hover:text-cnd-blue/80 flex items-center gap-1.5 cursor-pointer">
            <span>EXPLORE SESSIONS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-cnd-sky/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300 group flex flex-col justify-between shadow-sm dark:shadow-none">
          <div>
            <div className="w-12 h-12 rounded-xl bg-cnd-light dark:bg-cnd-indigo/50 border border-cnd-sky/20 flex items-center justify-center text-cnd-sky mb-6 group-hover:bg-cnd-sky group-hover:text-white transition-colors duration-300">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Platform Engineering & GitOps</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Unify developer experience. Find out how companies design internal developer portals (IDPs) and leverage declarative infrastructure platforms to reduce onboarding times from weeks to minutes.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs font-mono text-cnd-sky group-hover:text-cnd-sky/80 flex items-center gap-1.5 cursor-pointer">
            <span>LEARN THE PARADIGM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-cnd-blue/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300 group flex flex-col justify-between shadow-sm dark:shadow-none">
          <div>
            <div className="w-12 h-12 rounded-xl bg-cnd-light dark:bg-cnd-indigo/50 border border-cnd-blue/20 flex items-center justify-center text-cnd-blue mb-6 group-hover:bg-cnd-blue group-hover:text-white transition-colors duration-300">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">DevSecOps & eBPF Security</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Protect pipelines and runtimes. Standardize security bounds with Cilium runtime monitors, enforce container signing policies, and build zero-trust networks in highly volatile clouds.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-700 text-xs font-mono text-cnd-blue group-hover:text-cnd-blue/80 flex items-center gap-1.5 cursor-pointer">
            <span>AUDIT SECURITY METRICS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

    </section>
  );
}
