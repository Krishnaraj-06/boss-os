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
      <div className="h-full overflow-y-auto bg-zinc-950 p-5 font-mono">
        {!selected ? (
          <>
            <p className="mb-4 text-sm text-zinc-400">
              PROJECTS
            </p>

            <div className="space-y-3">
              {projects.map((project) => (
                <button
                  key={project.name}
                  onClick={() => onSelectProject(project.name)}
                  className="w-full border border-zinc-800 bg-zinc-900 p-4 text-left transition hover:border-zinc-600 hover:bg-zinc-800"
                >
                  <p className="text-sm text-zinc-200">
                    {project.name}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    {project.type}
                  </p>

                  <p className="mt-3 text-xs leading-5 text-zinc-500">
                    {project.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((technology) => (
                      <span
                        key={technology}
                        className="border border-zinc-800 px-2 py-1 text-[10px] text-zinc-500"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={onBack}
              className="mb-5 text-xs text-zinc-500 transition hover:text-white"
            >
              ← Back
            </button>

            <p className="text-lg text-zinc-200">
              {selected.name}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              {selected.type}
            </p>

            <section className="mt-6">
              <p className="text-xs text-zinc-500">
                OVERVIEW
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {selected.description}
              </p>
            </section>

            <section className="mt-6">
              <p className="text-xs text-zinc-500">
                PROBLEM
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {selected.problem}
              </p>
            </section>

            <section className="mt-6">
              <p className="text-xs text-zinc-500">
                SOLUTION
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {selected.solution}
              </p>
            </section>

            <section className="mt-6">
              <p className="text-xs text-zinc-500">
                ARCHITECTURE
              </p>

              <div className="mt-3 space-y-2">
                {selected.architecture.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-3 border border-zinc-800 bg-zinc-900 px-3 py-2"
                  >
                    <span className="text-xs text-zinc-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-xs text-zinc-300">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <p className="text-xs text-zinc-500">
                HIGHLIGHTS
              </p>

              <div className="mt-3 space-y-2">
                {selected.highlights.map((highlight) => (
                  <p
                    key={highlight}
                    className="text-xs leading-5 text-zinc-300"
                  >
                    <span className="mr-2 text-zinc-600">
                      ▸
                    </span>
                    {highlight}
                  </p>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <p className="text-xs text-zinc-500">
                TECH STACK
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {selected.tech.map((technology) => (
                  <span
                    key={technology}
                    className="border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-zinc-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </section>

            {selected.github && (
              <section className="mt-6 pb-2">
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
                >
                  View GitHub ↗
                </a>
              </section>
            )}
          </>
        )}
      </div>
    </WindowShell>
  );
}