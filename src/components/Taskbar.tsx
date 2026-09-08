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
    <div className="absolute bottom-0 left-0 right-0 z-40 flex h-8 items-center justify-between border-t border-zinc-700 bg-zinc-950 px-2 font-mono text-xs">
      {/* Left Side */}
      <div className="flex min-w-0 items-center gap-2">
        <button
          onClick={(event) => {
            event.stopPropagation();
            onStart();
          }}
          className="border border-zinc-700 bg-zinc-900 px-3 py-1 text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
        >
          BOSS
        </button>

        <div className="h-4 w-px shrink-0 bg-zinc-700" />

        {/* Open Windows */}
        <div className="flex min-w-0 items-center gap-1">
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
                className={`flex h-6 max-w-32 items-center gap-1.5 border px-2 transition ${
                  isActive
                    ? "border-zinc-500 bg-zinc-800 text-white"
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

        <span className="hidden text-zinc-600 sm:inline">
          BOSS.OS
        </span>
      </div>

      {/* Right Side */}
      <div className="ml-2 flex shrink-0 items-center gap-3 text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
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