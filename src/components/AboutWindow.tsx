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
    type: "Attendance Intelligence",
  },
  {
    name: "Payment System",
    type: "Backend / Payments",
  },
];

export default function AboutWindow({
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMaximized = false,
  isMinimized = false,
  isActive = true,
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
                  Engineering Student
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
                building things, understanding how systems work,
                and turning ideas into practical projects.
              </p>

              <p className="mt-4 text-sm leading-7 text-zinc-400">
                I&apos;m particularly interested in software
                engineering, AI, data, and systems — with a focus
                on learning by building, breaking, debugging,
                and improving.
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

          {/* Projects */}
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

          {/* Mindset */}
          <section className="mt-7">
            <p className="text-[10px] tracking-widest text-zinc-600">
              04 / MINDSET
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
              05 / STATUS
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