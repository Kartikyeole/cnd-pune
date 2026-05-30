import React from "react";

export function MetricsSection() {
  return (
    <section className="border-t border-b border-slate-200 bg-slate-100/50 dark:bg-slate-800/50 relative z-10 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          <div className="space-y-1">
            <span className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight bg-gradient-to-r from-cnd-blue to-cnd-sky bg-clip-text text-transparent">
              500+
            </span>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500">Attendees Expected</p>
          </div>

          <div className="space-y-1 border-l border-slate-200/80">
            <span className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight bg-gradient-to-r from-cnd-sky to-cnd-blue bg-clip-text text-transparent">
              15+
            </span>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500">Deep-Tech Sessions</p>
          </div>

          <div className="space-y-1 border-l border-slate-200/80">
            <span className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight bg-gradient-to-r from-cnd-blue to-cnd-sky bg-clip-text text-transparent">
              20+
            </span>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500">Expert Speakers</p>
          </div>

          <div className="space-y-1 border-l border-slate-200/80">
            <span className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight bg-gradient-to-r from-cnd-blue to-cnd-sky bg-clip-text text-transparent">
              $10K+
            </span>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500">Cloud Credits & Swag</p>
          </div>

        </div>
      </div>
    </section>
  );
}
