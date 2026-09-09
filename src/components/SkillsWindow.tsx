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

type SkillLevel =
  | "Experienced"
  | "Intermediate";

type Skill = {
  name: string;
  level: SkillLevel;
};

const skillGroups: {
  title: string;
  skills: Skill[];
}[] = [
  {
    title: "LANGUAGES",
    skills: [
      { name: "Python", level: "Intermediate" },
      { name: "JavaScript", level: "Experienced" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "C++", level: "Experienced" },
    ],
  },
  {
    title: "WEB & BACKEND",
    skills: [
      { name: "React", level: "Experienced" },
      { name: "Next.js", level: "Experienced" },
      { name: "Node.js", level: "Experienced" },
      { name: "SQL", level: "Experienced" },
    ],
  },
  {
    title: "DATA & AI",
    skills: [
      { name: "Data Analytics", level: "Intermediate" },
      { name: "Machine Learning", level: "Experienced" },
      { name: "AI / LLMs", level: "Experienced" },
    ],
  },
  {
    title: "SYSTEMS & TOOLS",
    skills: [
      { name: "Git / GitHub", level: "Experienced" },
      { name: "Networking", level: "Intermediate" },
      { name: "Cisco Packet Tracer", level: "Intermediate" },
    ],
  },
];

const levelWidth: Record<SkillLevel, string> = {
  Experienced: "w-full",
  Intermediate: "w-2/3",
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
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 border-b border-zinc-800 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg text-zinc-200">
                  SKILLS
                </p>

                <p className="mt-2 text-xs text-zinc-500">
                  Technical capabilities & areas of focus
                </p>
              </div>

              <div className="border border-zinc-800 bg-zinc-900 px-3 py-2">
                <p className="text-[9px] text-zinc-600">
                  PROFILE
                </p>
                <p className="mt-1 text-[10px] text-zinc-300">
                  ENGINEERING
                </p>
              </div>
            </div>
          </div>

          {/* Skill Groups */}
          <div className="space-y-8">
            {skillGroups.map((group) => (
              <section key={group.title}>
                <div className="flex items-center gap-3">
                  <p className="text-[10px] tracking-widest text-zinc-600">
                    {group.title}
                  </p>

                  <div className="h-px flex-1 bg-zinc-900" />
                </div>

                <div className="mt-4 space-y-3">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="border border-zinc-800 bg-zinc-900 px-4 py-3 transition hover:border-zinc-700 hover:bg-zinc-800"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-zinc-300">
                          {skill.name}
                        </span>

                        <span
                          className={`text-[9px] ${
                            skill.level === "Experienced"
                              ? "text-zinc-300"
                              : "text-zinc-500"
                          }`}
                        >
                          {skill.level.toUpperCase()}
                        </span>
                      </div>

                      <div className="mt-2 h-1 overflow-hidden bg-zinc-800">
                        <div
                          className={`h-full bg-zinc-500 transition-all ${levelWidth[skill.level]}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Learning Mode */}
          <section className="mt-8">
            <p className="text-[10px] tracking-widest text-zinc-600">
              LEARNING_MODE
            </p>

            <div className="mt-4 border border-zinc-800 bg-zinc-900 p-5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <p className="text-sm text-zinc-300">
                  ACTIVE
                </p>
              </div>

              <p className="mt-3 text-xs leading-6 text-zinc-600">
                Skills represent current working experience,
                not permanent limits. The stack keeps evolving
                through projects and experimentation.
              </p>
            </div>
          </section>
        </div>
      </div>
    </WindowShell>
  );
}