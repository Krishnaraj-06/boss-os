import WindowShell from "./WindowShell";

type Project = {
  name: string;
  type: string;
  description: string;
  tech: string[];
};

type ProjectsWindowProps = {
  projects: Project[];
  selectedProject: string | null;
  onSelectProject: (name: string) => void;
  onBack: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  isMaximized: boolean;
  isMinimized: boolean;
  isActive: boolean;
  minimizedOffset: number;
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
  isMaximized,
  isMinimized,
  isActive,
  minimizedOffset,
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
      <div className="h-full overflow-y-auto bg-zinc-950 p-5 font-mono">
        {!selected ? (
          <>
            {/* Header */}
            <div className="mb-6">
              <p className="text-lg text-zinc-200">
                PROJECTS
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Things I've built, broken and learned from.
              </p>
            </div>

            {/* Project List */}
            <div className="space-y-3">
              {projects.map((project, index) => (
                <button
                  key={project.name}
                  onClick={() => onSelectProject(project.name)}
                  className="group w-full border border-zinc-800 bg-zinc-900 p-4 text-left transition hover:border-zinc-600 hover:bg-zinc-800"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-zinc-200 transition group-hover:text-white">
                        {project.name}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        {project.type}
                      </p>
                    </div>

                    <span className="text-xs text-zinc-700 transition group-hover:text-zinc-400">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="mt-4 text-xs leading-5 text-zinc-500">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
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

            {/* Footer */}
            <div className="mt-6 border-t border-zinc-800 pt-4">
              <p className="text-[10px] text-zinc-600">
                SELECT A PROJECT TO INSPECT
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Back */}
            <button
              onClick={onBack}
              className="mb-6 text-xs text-zinc-500 transition hover:text-white"
            >
              ← BACK TO PROJECTS
            </button>

            {/* Project Identity */}
            <div className="border-b border-zinc-800 pb-5">
              <p className="text-xl text-zinc-100">
                {selected.name}
              </p>

              <p className="mt-2 text-xs uppercase tracking-wide text-zinc-500">
                {selected.type}
              </p>
            </div>

            {/* Description */}
            <section className="mt-6">
              <p className="text-[10px] tracking-widest text-zinc-600">
                DESCRIPTION
              </p>

              <p className="mt-3 text-sm leading-6 text-zinc-300">
                {selected.description}
              </p>
            </section>

            {/* Technology */}
            <section className="mt-7">
              <p className="text-[10px] tracking-widest text-zinc-600">
                TECHNOLOGY
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {selected.tech.map((technology) => (
                  <span
                    key={technology}
                    className="border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-zinc-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </section>

            {/* Status */}
            <section className="mt-7">
              <p className="text-[10px] tracking-widest text-zinc-600">
                PROJECT_STATUS
              </p>

              <div className="mt-3 border border-zinc-800 bg-zinc-900 p-4">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-zinc-400" />

                  <span className="text-xs text-zinc-300">
                    BUILDING
                  </span>
                </div>

                <p className="mt-2 text-[10px] text-zinc-600">
                  Project details and implementation are
                  continuously evolving.
                </p>
              </div>
            </section>

            {/* Future Links Area */}
            <section className="mt-7">
              <p className="text-[10px] tracking-widest text-zinc-600">
                RESOURCES
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  disabled
                  className="border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-700"
                >
                  GitHub ↗
                </button>

                <button
                  disabled
                  className="border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-700"
                >
                  Demo ↗
                </button>
              </div>

              <p className="mt-2 text-[9px] text-zinc-700">
                LINKS WILL BE ADDED
              </p>
            </section>
          </>
        )}
      </div>
    </WindowShell>
  );
}