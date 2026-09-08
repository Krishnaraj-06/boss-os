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
      className="absolute bottom-8 left-2 z-50 w-60 overflow-hidden rounded border border-zinc-700 bg-zinc-950 font-mono shadow-2xl"
      onClick={(event) => event.stopPropagation()}
    >
      {/* Header */}
      <div className="border-b border-zinc-700 bg-zinc-900 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold tracking-wide text-zinc-200">
              BOSS.OS
            </p>

            <p className="mt-1 text-[10px] text-zinc-500">
              SYSTEM MENU
            </p>
          </div>

          <span className="text-xs text-zinc-600">
            v0.3
          </span>
        </div>
      </div>

      {/* Applications */}
      <div className="p-2">
        <p className="px-3 pb-2 pt-1 text-[9px] tracking-widest text-zinc-600">
          APPLICATIONS
        </p>

        <div className="space-y-0.5">
          {apps.map((app) => (
            <button
              key={app.label}
              onClick={actions[app.action]}
              className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-left text-xs text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              <span className="w-5 text-center">
                {app.icon}
              </span>

              <span>{app.label}</span>

              <span className="ml-auto text-zinc-700 transition group-hover:text-zinc-500">
                ›
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* System */}
      <div className="border-t border-zinc-800 p-2">
        <p className="px-3 pb-2 pt-1 text-[9px] tracking-widest text-zinc-600">
          SYSTEM
        </p>

        <button
          onClick={onShutdown}
          className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-left text-xs text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <span className="w-5 text-center">
            ⚡
          </span>

          <span>Shut Down</span>
        </button>
      </div>
    </div>
  );
}