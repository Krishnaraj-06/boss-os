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
        <div className="mx-auto max-w-2xl p-6">
          {/* Header */}
          <header className="border-b border-zinc-800 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xl tracking-wide text-zinc-100">
                  BOSS
                </p>

                <p className="mt-2 text-xs text-zinc-500">
                  Engineering Student · Builder
                </p>
              </div>

              <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-900 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-[10px] text-zinc-400">
                  BUILDING
                </span>
              </div>
            </div>
          </header>

          {/* About */}
          <section className="mt-7">
            <p className="text-[10px] tracking-widest text-zinc-600">
              01 / ABOUT_ME
            </p>

            <div className="mt-3 border-l border-zinc-700 pl-4">
              <p className="text-sm leading-7 text-zinc-300">
                I&apos;m an engineering student who enjoys
                understanding how things work and turning ideas
                into working systems.
              </p>

              <p className="mt-4 text-sm leading-7 text-zinc-400">
                My interests sit across software engineering,
                artificial intelligence, data, systems, and
                networking. I learn best by building real
                projects, testing ideas, breaking things, and
                figuring out why they broke.
              </p>
            </div>
          </section>

          {/* Focus */}
          <section className="mt-7">
            <p className="text-[10px] tracking-widest text-zinc-600">
              02 / CURRENT_FOCUS
            </p>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {focusAreas.map((focus, index) => (
                <div
                  key={focus}
                  className="flex items-center gap-3 border border-zinc-800 bg-zinc-900 px-4 py-3 transition hover:border-zinc-700 hover:bg-zinc-800"
                >
                  <span className="text-[10px] text-zinc-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-xs text-zinc-300">
                    {focus}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Building */}
          <section className="mt-7">
            <p className="text-[10px] tracking-widest text-zinc-600">
              03 / CURRENTLY_BUILDING
            </p>

            <div className="mt-4 space-y-2">
              {currentProjects.map((project) => (
                <div
                  key={project.name}
                  className="flex items-center justify-between gap-4 border border-zinc-800 bg-zinc-900 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-600">
                      ▸
                    </span>

                    <span className="text-xs text-zinc-200">
                      {project.name}
                    </span>
                  </div>

                  <span className="text-[9px] text-zinc-600">
                    {project.type}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Engineering Philosophy */}
          <section className="mt-7">
            <p className="text-[10px] tracking-widest text-zinc-600">
              04 / ENGINEERING_MODE
            </p>

            <div className="mt-4 border border-zinc-800 bg-zinc-900 p-5">
              <div className="space-y-3">
                {engineeringPrinciples.map(
                  (principle, index) => (
                    <div
                      key={principle}
                      className="flex items-center gap-3"
                    >
                      <span className="w-5 text-[10px] text-zinc-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-xs text-zinc-300">
                        {principle}
                      </span>

                      {index <
                        engineeringPrinciples.length - 1 && (
                        <span className="text-zinc-700">
                          →
                        </span>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Mindset */}
          <section className="mt-7">
            <p className="text-[10px] tracking-widest text-zinc-600">
              05 / MINDSET
            </p>

            <div className="mt-4 border border-zinc-800 bg-zinc-900 p-5">
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-300">
                <span>Build</span>
                <span className="text-zinc-700">→</span>
                <span>Break</span>
                <span className="text-zinc-700">→</span>
                <span>Understand</span>
                <span className="text-zinc-700">→</span>
                <span>Improve</span>
              </div>

              <p className="mt-4 text-center text-[10px] text-zinc-600">
                Learning by building and iterating.
              </p>
            </div>
          </section>

          {/* Status */}
          <section className="mt-7 pb-2">
            <p className="text-[10px] tracking-widest text-zinc-600">
              06 / STATUS
            </p>

            <div className="mt-4 flex items-center justify-between border border-zinc-800 bg-zinc-900 px-4 py-3">
              <span className="text-xs text-zinc-400">
                System status
              </span>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-xs text-zinc-300">
                  ACTIVE
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </WindowShell>
  );
}