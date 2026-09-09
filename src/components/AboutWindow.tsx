import WindowShell from "./WindowShell";

type AboutWindowProps = {
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
  isMaximized?: boolean;
  isMinimized?: boolean;
  isActive?: boolean;
  minimizedOffset?: number;
};

const focusAreas = [
  "Software Engineering",
  "Artificial Intelligence",
  "Data & Analytics",
  "Systems & Networking",
];

const currentProjects = [
  {
    name: "BOSS.OS",
    type: "Interactive Portfolio OS",
  },
  {
    name: "NetSage",
    type: "AI Network Troubleshooting",
  },
  {
    name: "AttendIQ",
    type: "Smart Attendance System",
  },
];

const engineeringPrinciples = [
  "Understand the problem",
  "Build the system",
  "Test the assumptions",
  "Debug what breaks",
  "Improve what works",
];

export default function AboutWindow({
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMaximized = false,
  isMinimized = false,
  isActive = true,
  minimizedOffset = 0,
}: AboutWindowProps) {
  return (
    <WindowShell
      title="About"
      icon="👤"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onFocus={onFocus}
      isMaximized={isMaximized}
      isMinimized={isMinimized}
      isActive={isActive}
      minimizedOffset={minimizedOffset}
    >
      <div className="h-full overflow-y-auto bg-zinc-950 font-mono">
        <div className="mx-auto max-w-3xl p-4 sm:p-6 md:p-8">
          {/* Header */}
          <header className="border-b border-zinc-800 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                  <p className="text-xl tracking-wide text-zinc-100 sm:text-2xl">
                    BOSS
                  </p>
                </div>

                <p className="mt-2 text-[10px] uppercase tracking-widest text-zinc-500">
                  Engineering Student · Builder
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 rounded border border-zinc-800 bg-zinc-900 px-3 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                <span className="text-[9px] tracking-wider text-zinc-400">
                  BUILDING
                </span>
              </div>
            </div>
          </header>

          {/* About */}
          <section className="mt-7">
            <p className="text-[9px] tracking-[0.2em] text-zinc-600">
              01 / ABOUT_ME
            </p>

            <div className="mt-3 rounded-r border-l border-zinc-700 bg-zinc-900/30 px-4 py-4 sm:px-5">
              <p className="text-xs leading-6 text-zinc-300 sm:text-sm sm:leading-7">
                I&apos;m an engineering student who enjoys
                understanding how things work and turning ideas
                into working systems.
              </p>

              <p className="mt-4 text-xs leading-6 text-zinc-400 sm:text-sm sm:leading-7">
                My interests sit across software engineering,
                artificial intelligence, data, systems, and
                networking. I learn best by building real
                projects, testing ideas, breaking things, and
                figuring out why they broke.
              </p>
            </div>
          </section>

          {/* Focus */}
          <section className="mt-8">
            <p className="text-[9px] tracking-[0.2em] text-zinc-600">
              02 / CURRENT_FOCUS
            </p>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {focusAreas.map((focus, index) => (
                <div
                  key={focus}
                  className="group flex items-center gap-3 rounded border border-zinc-800 bg-zinc-900/60 px-4 py-3 transition-all duration-150 hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-900"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-zinc-800 bg-zinc-950 text-[8px] text-zinc-600 transition group-hover:border-zinc-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-[10px] text-zinc-300 sm:text-xs">
                    {focus}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Building */}
          <section className="mt-8">
            <div className="flex items-end justify-between gap-3">
              <p className="text-[9px] tracking-[0.2em] text-zinc-600">
                03 / CURRENTLY_BUILDING
              </p>

              <span className="text-[8px] text-zinc-700">
                {currentProjects.length} ACTIVE
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {currentProjects.map((project, index) => (
                <div
                  key={project.name}
                  className="group flex items-center justify-between gap-4 rounded border border-zinc-800 bg-zinc-900/60 px-4 py-3 transition hover:border-zinc-700 hover:bg-zinc-900"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="text-[9px] text-zinc-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="truncate text-xs text-zinc-200">
                      {project.name}
                    </span>
                  </div>

                  <span className="shrink-0 text-[8px] text-zinc-600 sm:text-[9px]">
                    {project.type}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Engineering Philosophy */}
          <section className="mt-8">
            <p className="text-[9px] tracking-[0.2em] text-zinc-600">
              04 / ENGINEERING_MODE
            </p>

            <div className="mt-4 rounded border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5">
              <div className="space-y-1">
                {engineeringPrinciples.map((principle, index) => (
                  <div
                    key={principle}
                    className="group flex items-center gap-3 rounded px-2 py-2 transition hover:bg-zinc-800/60"
                  >
                    <span className="w-5 shrink-0 text-[9px] text-zinc-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 text-[10px] text-zinc-300 sm:text-xs">
                      {principle}
                    </span>

                    {index <
                      engineeringPrinciples.length - 1 && (
                      <span className="ml-auto text-zinc-700 transition group-hover:text-zinc-500">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mindset */}
          <section className="mt-8">
            <p className="text-[9px] tracking-[0.2em] text-zinc-600">
              05 / MINDSET
            </p>

            <div className="mt-4 rounded border border-zinc-800 bg-zinc-900/60 p-5">
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-zinc-300 sm:text-xs">
                <span>Build</span>
                <span className="text-zinc-700">→</span>
                <span>Break</span>
                <span className="text-zinc-700">→</span>
                <span>Understand</span>
                <span className="text-zinc-700">→</span>
                <span>Improve</span>
              </div>

              <p className="mt-4 text-center text-[9px] text-zinc-600">
                Learning by building and iterating.
              </p>
            </div>
          </section>

          {/* Status */}
          <section className="mt-8 pb-2">
            <p className="text-[9px] tracking-[0.2em] text-zinc-600">
              06 / STATUS
            </p>

            <div className="mt-4 flex items-center justify-between rounded border border-zinc-800 bg-zinc-900/60 px-4 py-3">
              <span className="text-[10px] text-zinc-500 sm:text-xs">
                System status
              </span>

              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                <span className="text-[10px] text-zinc-300 sm:text-xs">
                  ACTIVE
                </span>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-zinc-900 pt-4 text-[7px] tracking-[0.2em] text-zinc-700">
            <span>BOSS.OS / PROFILE</span>
            <span>BUILDING</span>
          </div>
        </div>
      </div>
    </WindowShell>
  );
}