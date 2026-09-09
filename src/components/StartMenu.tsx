type StartMenuProps = {
  onProjects: () => void;
  onTerminal: () => void;
  onResume: () => void;
  onAbout: () => void;
  onSkills: () => void;
  onContact: () => void;
  onShutdown: () => void;
};

const apps = [
  {
    label: "Projects",
    icon: "📁",
    action: "onProjects",
  },
  {
    label: "Terminal",
    icon: "💻",
    action: "onTerminal",
  },
  {
    label: "Resume",
    icon: "📄",
    action: "onResume",
  },
  {
    label: "About",
    icon: "👤",
    action: "onAbout",
  },
  {
    label: "Skills",
    icon: "🛠️",
    action: "onSkills",
  },
  {
    label: "Contact",
    icon: "📇",
    action: "onContact",
  },
] as const;

export default function StartMenu({
  onProjects,
  onTerminal,
  onResume,
  onAbout,
  onSkills,
  onContact,
  onShutdown,
}: StartMenuProps) {
  const actions = {
    onProjects,
    onTerminal,
    onResume,
    onAbout,
    onSkills,
    onContact,
  };

  return (
    <div
      className="absolute bottom-9 left-2 z-50 w-[calc(100%-1rem)] max-w-72 overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-950/95 font-mono shadow-[0_28px_80px_rgba(2,6,23,0.8)] backdrop-blur-md sm:w-72"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="border-b border-zinc-800/80 bg-[radial-gradient(circle_at_top,rgba(94,234,212,0.12),transparent_50%)] px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold tracking-[0.28em] text-zinc-100">
              BOSS.OS
            </p>

            <p className="mt-1 text-[9px] tracking-[0.22em] text-zinc-500">
              SYSTEM MENU
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.75)]" />
            <span className="text-[9px] tracking-[0.18em] text-emerald-300">
              v1.0
            </span>
          </div>
        </div>
      </div>

      <div className="p-2">
        <p className="px-3 pb-2 pt-1 text-[9px] tracking-[0.22em] text-zinc-600">
          APPLICATIONS
        </p>

        <div className="space-y-1">
          {apps.map((app) => (
            <button
              key={app.label}
              onClick={actions[app.action]}
              className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left text-xs text-zinc-300 transition-all duration-150 hover:border-zinc-700 hover:bg-zinc-800/80 hover:text-white active:bg-zinc-700"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-sm shadow-inner transition group-hover:border-zinc-700 group-hover:bg-zinc-950">
                {app.icon}
              </span>

              <span className="flex-1 tracking-[0.08em]">
                {app.label}
              </span>

              <span className="translate-x-[-4px] text-zinc-700 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:text-zinc-400 group-hover:opacity-100">
                ›
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-800/80 p-2">
        <p className="px-3 pb-2 pt-1 text-[9px] tracking-[0.22em] text-zinc-600">
          SYSTEM
        </p>

        <button
          onClick={onShutdown}
          className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left text-xs text-zinc-400 transition-all duration-150 hover:border-zinc-700 hover:bg-zinc-800/80 hover:text-white active:bg-zinc-700"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-sm transition group-hover:border-zinc-700 group-hover:bg-zinc-950">
            ⚡
          </span>

          <span className="flex-1 tracking-[0.08em]">
            Shut Down
          </span>

          <span className="text-zinc-700 transition group-hover:text-zinc-400">
            ›
          </span>
        </button>
      </div>

      <div className="border-t border-zinc-900/80 px-4 py-2">
        <div className="flex items-center justify-between text-[8px] tracking-[0.18em] text-zinc-700">
          <span>BOSS.OS</span>
          <span>READY</span>
        </div>
      </div>
    </div>
  );
}