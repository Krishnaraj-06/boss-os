import WindowShell from "./WindowShell";

type Project = {
  name: string;
  type: string;
  description: string;
  tech: string[];
  problem: string;
  solution: string;
  architecture: string[];
  highlights: string[];
  github: string;
};

type ProjectsWindowProps = {
  projects: Project[];
  selectedProject: string | null;
  onSelectProject: (name: string) => void;
  onBack: () => void;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
  isMaximized?: boolean;
  isMinimized?: boolean;
  isActive?: boolean;
  minimizedOffset?: number;
};

export default function ProjectsWindow({
  projects,
  selectedProject,
  onSelectProject,
  onBack,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMaximized = false,
  isMinimized = false,
  isActive = true,
  minimizedOffset = 0,
}: ProjectsWindowProps) {
  const selected = projects.find(
    (project) => project.name === selectedProject
  );

  return (
    <WindowShell
      title={selected ? selected.name : "Projects"}
      icon="📁"
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
        {!selected ? (
          <div className="mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
            <div className="mb-6 border-b border-zinc-800 pb-5 sm:mb-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />

                    <p className="text-lg tracking-[0.18em] text-zinc-100 sm:text-xl">
                      PROJECTS
                    </p>
                  </div>

                  <p className="mt-2 text-[10px] tracking-[0.24em] text-zinc-600">
                    ENGINEERING WORK / SELECTED BUILDS
                  </p>
                </div>

                <div className="shrink-0 border border-zinc-800 bg-zinc-900/80 px-2.5 py-1.5 text-[9px] tracking-[0.18em] text-zinc-500">
                  {String(projects.length).padStart(2, "0")} PROJECTS
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {projects.map((project, index) => (
                <button
                  key={project.name}
                  onClick={() => onSelectProject(project.name)}
                  className="group relative w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-900 hover:shadow-[0_18px_40px_rgba(2,6,23,0.35)] sm:p-5"
                >
                  <div className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-transparent via-emerald-300/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="pt-0.5 text-[10px] text-zinc-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-zinc-200 transition group-hover:text-white sm:text-base">
                            {project.name}
                          </p>

                          <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-zinc-600 sm:text-[10px]">
                            {project.type}
                          </p>
                        </div>

                        <span className="shrink-0 text-zinc-700 transition-all duration-200 group-hover:translate-x-1 group-hover:text-zinc-300">
                          →
                        </span>
                      </div>

                      <p className="mt-4 max-w-2xl text-xs leading-5 text-zinc-500 sm:text-[13px]">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tech.map((technology) => (
                          <span
                            key={technology}
                            className="rounded border border-zinc-800 bg-zinc-950/80 px-2 py-1 text-[9px] text-zinc-500 transition group-hover:border-zinc-700 group-hover:text-zinc-400 sm:text-[10px]"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-zinc-900 pt-4 text-[8px] tracking-[0.22em] text-zinc-700">
              <span>BUILD / TEST / DEBUG / IMPROVE</span>
              <span>STATUS: ACTIVE</span>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
            {/* Back */}
            <button
              onClick={onBack}
              className="group mb-6 inline-flex items-center gap-2 text-[10px] text-zinc-600 transition hover:text-zinc-200"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              <span>BACK TO PROJECTS</span>
            </button>

            {/* Project Header */}
            <header className="border-b border-zinc-800 pb-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                    <p className="text-xl tracking-wide text-zinc-100 sm:text-2xl">
                      {selected.name}
                    </p>
                  </div>

                  <p className="mt-2 text-[10px] uppercase tracking-wider text-zinc-500">
                    {selected.type}
                  </p>
                </div>

                <span className="shrink-0 border border-zinc-800 bg-zinc-900 px-2 py-1 text-[8px] tracking-widest text-zinc-600">
                  PROJECT
                </span>
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-6 text-zinc-400">
                {selected.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {selected.tech.map((technology) => (
                  <span
                    key={technology}
                    className="rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 text-[9px] text-zinc-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </header>

            {/* Problem */}
            <section className="mt-7">
              <p className="text-[9px] tracking-[0.2em] text-zinc-600">
                01 / PROBLEM
              </p>

              <div className="mt-3 rounded-r border-l border-zinc-700 bg-zinc-900/40 px-4 py-4">
                <p className="text-xs leading-6 text-zinc-300 sm:text-sm">
                  {selected.problem}
                </p>
              </div>
            </section>

            {/* Solution */}
            <section className="mt-7">
              <p className="text-[9px] tracking-[0.2em] text-zinc-600">
                02 / SOLUTION
              </p>

              <div className="mt-3 rounded-r border-l border-zinc-700 bg-zinc-900/40 px-4 py-4">
                <p className="text-xs leading-6 text-zinc-300 sm:text-sm">
                  {selected.solution}
                </p>
              </div>
            </section>

            {/* Architecture */}
            <section className="mt-8">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[9px] tracking-[0.2em] text-zinc-600">
                    03 / ARCHITECTURE
                  </p>

                  <p className="mt-1 text-[9px] text-zinc-700">
                    SYSTEM FLOW
                  </p>
                </div>

                <span className="text-[8px] text-zinc-700">
                  {selected.architecture.length} STAGES
                </span>
              </div>

              <div className="mt-4 space-y-1.5">
                {selected.architecture.map((step, index) => (
                  <div
                    key={step}
                    className="group flex items-center gap-3 rounded border border-zinc-800 bg-zinc-900/70 px-3 py-3 transition hover:border-zinc-700 hover:bg-zinc-900 sm:px-4"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-zinc-800 bg-zinc-950 text-[8px] text-zinc-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 text-[10px] text-zinc-300 sm:text-xs">
                      {step}
                    </span>

                    {index <
                      selected.architecture.length - 1 && (
                      <span className="ml-auto shrink-0 text-zinc-700">
                        ↓
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section className="mt-8">
              <p className="text-[9px] tracking-[0.2em] text-zinc-600">
                04 / HIGHLIGHTS
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {selected.highlights.map((highlight, index) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 rounded border border-zinc-800 bg-zinc-900/50 px-3 py-3 transition hover:border-zinc-700 hover:bg-zinc-900"
                  >
                    <span className="shrink-0 text-[8px] text-zinc-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-[10px] leading-5 text-zinc-300 sm:text-xs">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* GitHub */}
            {selected.github && (
              <section className="mt-8 border-t border-zinc-800 pt-6">
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 rounded border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-[10px] text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                >
                  <span>VIEW SOURCE ON GITHUB</span>

                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </section>
            )}

            {/* Project Footer */}
            <div className="mt-8 flex items-center justify-between border-t border-zinc-900 pt-4 text-[8px] tracking-widest text-zinc-700">
              <span>{selected.name.toUpperCase()}</span>
              <span>STATUS: BUILT</span>
            </div>
          </div>
        )}
      </div>
    </WindowShell>
  );
}