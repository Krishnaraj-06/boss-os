import WindowShell from "./WindowShell";

type SkillsWindowProps = {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  isMaximized: boolean;
  isMinimized: boolean;
  isActive: boolean;
  minimizedOffset: number;
};

export default function SkillsWindow({
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMaximized,
  isMinimized,
  isActive,
  minimizedOffset,
}: SkillsWindowProps) {
  const renderSkills = (skills: string[]) => (
    <div className="mt-3 flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-300"
        >
          {skill}
        </span>
      ))}
    </div>
  );

  return (
    <WindowShell
      title="Skills"
      icon="🛠️"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onFocus={onFocus}
      isMaximized={isMaximized}
      isMinimized={isMinimized}
      isActive={isActive}
      minimizedOffset={minimizedOffset}
    >
      <div className="h-full overflow-y-auto bg-zinc-950 p-6 font-mono">
        <div className="mx-auto max-w-xl">
          <div className="mb-8">
            <p className="text-lg text-zinc-200">
              SKILLS
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              Technical capabilities & areas of focus
            </p>
          </div>

          <section className="mb-7">
            <p className="text-xs text-zinc-500">
              LANGUAGES
            </p>

            {renderSkills([
              "Python",
              "JavaScript",
              "TypeScript",
              "C++",
            ])}
          </section>

          <section className="mb-7">
            <p className="text-xs text-zinc-500">
              WEB & BACKEND
            </p>

            {renderSkills([
              "Next.js",
              "React",
              "Node.js",
              "APIs",
            ])}
          </section>

          <section className="mb-7">
            <p className="text-xs text-zinc-500">
              DATA & AI
            </p>

            {renderSkills([
              "Data Analytics",
              "Machine Learning",
              "AI",
            ])}
          </section>

          <section className="mb-7">
            <p className="text-xs text-zinc-500">
              TOOLS & SYSTEMS
            </p>

            {renderSkills([
              "Git",
              "GitHub",
              "Networking",
              "Packet Tracer",
            ])}
          </section>

          <section>
            <p className="text-xs text-zinc-500">
              LEARNING_MODE
            </p>

            <div className="mt-3 border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-sm text-zinc-300">
                ACTIVE
              </p>

              <p className="mt-2 text-xs text-zinc-600">
                Always learning. Always building.
              </p>
            </div>
          </section>
        </div>
      </div>
    </WindowShell>
  );
}