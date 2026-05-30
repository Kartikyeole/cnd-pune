import React from "react";

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  lineColor?: string;
}

export function SectionHeader({ subtitle, title, lineColor = "bg-cnd-sky" }: SectionHeaderProps) {
  return (
    <div className="text-center space-y-4 mb-20">
      <h2 className="text-xs font-mono uppercase tracking-widest text-cnd-sky font-bold">
        // {subtitle}
      </h2>
      <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-slate-100">
        {title}
      </h3>
      <div className={`w-16 h-1 mx-auto rounded-full mt-4 ${lineColor}`} />
    </div>
  );
}
