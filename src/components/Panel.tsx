import React from "react";

export function Panel({
  label,
  right,
  className = "",
  bodyClassName = "",
  children
}: {
  label: string;
  right?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`flex min-h-0 flex-col border border-grid bg-panel ${className}`}
    >
      <header className="flex h-8 shrink-0 items-center justify-between border-b border-grid bg-panel-2 px-3">
        <span className="eyebrow">{label}</span>
        <span className="font-mono text-[10px] text-ink-faint">{right}</span>
      </header>
      <div className={`min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
