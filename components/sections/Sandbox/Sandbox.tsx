import React from "react";

interface SandboxSectionProps {
  sandboxDrawings: boolean;
  setSandboxDrawings: (val: boolean) => void;
}

export function SandboxSection({ sandboxDrawings, setSandboxDrawings }: SandboxSectionProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 pb-24 relative z-10 text-center">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-none">
        <div className="text-left space-y-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">./toggle_doodles</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">Click to reveal or hide the hand-drawn chalk sketches overlaying the interface grid.</p>
        </div>
        <button
          onClick={() => setSandboxDrawings(!sandboxDrawings)}
          className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase border transition-all duration-200 cursor-pointer ${sandboxDrawings
            ? "bg-cnd-sky text-cnd-indigo border-cnd-sky shadow-md shadow-cnd-sky/10"
            : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
            }`}
        >
          {sandboxDrawings ? "Doodles: Active" : "Doodles: Hidden"}
        </button>
      </div>
    </section>
  );
}
