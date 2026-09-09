"use client";

import { useEffect, useState } from "react";

type AppName =
  | "projects"
  | "terminal"
  | "resume"
  | "about"
  | "skills"
  | "contact";

type WindowState = {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
};

type TaskbarProps = {
  onStart: () => void;
  windows: Record<AppName, WindowState>;
  activeWindow: AppName | null;
  onWindowClick: (app: AppName) => void;
};

const apps: {
  name: AppName;
  label: string;
  icon: string;
}[] = [
  { name: "projects", label: "Projects", icon: "📁" },
  { name: "terminal", label: "Terminal", icon: "💻" },
  { name: "resume", label: "Resume", icon: "📄" },
  { name: "about", label: "About", icon: "👤" },
  { name: "skills", label: "Skills", icon: "🛠️" },
  { name: "contact", label: "Contact", icon: "📇" },
];

export default function Taskbar({
  onStart,
  windows,
  activeWindow,
  onWindowClick,
}: TaskbarProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const openApps = apps.filter((app) => windows[app.name].open);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 flex h-9 items-center justify-between border-t border-zinc-700/80 bg-zinc-950/90 px-2 font-mono text-xs backdrop-blur-sm">
      <div className="flex min-w-0 items-center gap-2">
        <button
          onClick={(event) => {
            event.stopPropagation();
            onStart();
          }}
          className="rounded-lg border border-zinc-700/80 bg-zinc-900/80 px-3 py-1.5 text-[10px] tracking-[0.2em] text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
        >
          BOSS
        </button>

        <div className="h-4 w-px shrink-0 bg-zinc-700" />

        <div className="flex min-w-0 items-center gap-1.5">
          {openApps.map((app) => {
            const isActive = activeWindow === app.name;
            const isMinimized = windows[app.name].minimized;

            return (
              <button
                key={app.name}
                onClick={(event) => {
                  event.stopPropagation();
                  onWindowClick(app.name);
                }}
                title={
                  isMinimized
                    ? `Restore ${app.label}`
                    : isActive
                      ? `Minimize ${app.label}`
                      : `Focus ${app.label}`
                }
                className={`flex h-6 max-w-32 items-center gap-1.5 rounded-md border px-2 text-[10px] tracking-[0.06em] transition ${
                  isActive
                    ? "border-emerald-400/50 bg-zinc-800 text-white shadow-[inset_0_0_0_1px_rgba(52,211,153,0.12)]"
                    : isMinimized
                      ? "border-zinc-800 bg-zinc-950 text-zinc-600 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300"
                      : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-200"
                }`}
              >
                <span>{app.icon}</span>
                <span className="truncate">{app.label}</span>
              </button>
            );
          })}
        </div>

        {openApps.length > 0 && (
          <div className="h-4 w-px shrink-0 bg-zinc-800" />
        )}

        <span className="hidden text-[9px] tracking-[0.18em] text-zinc-600 sm:inline">
          BOSS.OS
        </span>
      </div>

      <div className="ml-2 flex shrink-0 items-center gap-3 text-[9px] tracking-[0.14em] text-zinc-400">
        <span className="flex items-center gap-1.5 text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          ONLINE
        </span>

        <span className="text-zinc-700">|</span>

        <span>SYS</span>

        <span className="text-zinc-700">|</span>

        <span>{time || "--:--"}</span>
      </div>
    </div>
  );
}