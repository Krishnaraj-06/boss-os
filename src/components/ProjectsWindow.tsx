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
    >
      <div className="h-full overflow-y-auto bg-zinc-950 font-mono">
        {!selected ? (
          <div className="mx-auto max-w-3xl p-6">
            {/* Header */}
            <div className="mb-7 border-b border-zinc-800 pb-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-lg tracking-wide text-zinc-200">
                    PROJECTS
                  </p>

                  <p className="mt-2 text-xs text-zinc-500">
                    Selected engineering work
                  </p>
                </div>

                <span className="text-[10px] text-zinc-600">
                  {projects.length} PROJECTS
                </span>
              </div>
            </div>

            {/* Project List */}
            <div className="space-y-3">
              {projects.map((project, index) => (
                <button
                  key={project.name}
                  onClick={() => onSelectProject(project.name)}
                  className="group w-full border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:border-zinc-600 hover:bg-zinc-800"
                >
                  <div className="flex items-start gap-4">
                    <span className="pt-0.5 text-[10px] text-zinc-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm text-zinc-200 group-hover:text-white">
                          {project.name}
                        </p>

                        <span className="text-zinc-600 transition group-hover:text-zinc-400">
                          →
                        </span>
                      </div>

                      <p className="mt-1 text-[10px] text-zinc-500">
                        {project.type}
                      </p>

                      <p className="mt-4 text-xs leading-5 text-zinc-500">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.map((technology) => (
                          <span
                            key={technology}
                            className="border border-zinc-800 bg-zinc-950 px-2 py-1 text-[10px] text-zinc-500"
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
          </div>
        ) : (
          <div className="mx-auto max-w-3xl p-6">
            {/* Back */}
            <button
              onClick={onBack}
              className="mb-6 text-xs text-zinc-500 transition hover:text-white"
            >
              ← Back to projects
            </button>

            {/* Project Header */}
            <header className="border-b border-zinc-800 pb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xl tracking-wide text-zinc-100">
                    {selected.name}
                  </p>

                  <p className="mt-2 text-xs text-zinc-500">
                    {selected.type}
                  </p>
                </div>

                <span className="border border-zinc-800 bg-zinc-900 px-2 py-1 text-[9px] text-zinc-600">
                  PROJECT
                </span>
              </div>

              <p className="mt-5 text-sm leading-6 text-zinc-400">
                {selected.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {selected.tech.map((technology) => (
                  <span
                    key={technology}
                    className="border border-zinc-700 bg-zinc-900 px-2 py-1 text-[10px] text-zinc-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </header>

            {/* Problem */}
            <section className="mt-7">
              <p className="text-[10px] tracking-widest text-zinc-600">
                01 / PROBLEM
              </p>

              <div className="mt-3 border-l border-zinc-700 pl-4">
                <p className="text-sm leading-6 text-zinc-300">
                  {selected.problem}
                </p>
              </div>
            </section>

            {/* Solution */}
            <section className="mt-7">
              <p className="text-[10px] tracking-widest text-zinc-600">
                02 / SOLUTION
              </p>

              <div className="mt-3 border-l border-zinc-700 pl-4">
                <p className="text-sm leading-6 text-zinc-300">
                  {selected.solution}
                </p>
              </div>
            </section>

            {/* Architecture */}
            <section className="mt-7">
              <p className="text-[10px] tracking-widest text-zinc-600">
                03 / ARCHITECTURE
              </p>

              <div className="mt-4 space-y-2">
                {selected.architecture.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-4 border border-zinc-800 bg-zinc-900 px-4 py-3"
                  >
                    <span className="shrink-0 text-[10px] text-zinc-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-xs text-zinc-300">
                      {step}
                    </span>

                    {index <
                      selected.architecture.length - 1 && (
                      <span className="ml-auto text-zinc-700">
                        ↓
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section className="mt-7">
              <p className="text-[10px] tracking-widest text-zinc-600">
                04 / HIGHLIGHTS
              </p>

              <div className="mt-4 space-y-2">
                {selected.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 text-xs leading-5 text-zinc-300"
                  >
                    <span className="mt-0.5 text-zinc-600">
                      ▸
                    </span>

                    <span>{highlight}</span>
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
                  className="inline-flex items-center gap-2 border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                >
                  View source on GitHub
                  <span>↗</span>
                </a>
              </section>
            )}
          </div>
        )}
      </div>
    </WindowShell>
  );
}