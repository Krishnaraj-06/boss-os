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

type SkillLevel = "Experienced" | "Intermediate";

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
  const totalSkills = skillGroups.reduce(
    (total, group) => total + group.skills.length,
    0
  );

  const experiencedSkills = skillGroups.reduce(
    (total, group) =>
      total +
      group.skills.filter(
        (skill) => skill.level === "Experienced"
      ).length,
    0
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
      <div className="h-full overflow-y-auto bg-zinc-950 font-mono">
        <div className="mx-auto max-w-3xl p-4 sm:p-6 md:p-8">
          {/* Header */}
          <header className="border-b border-zinc-800 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                  <p className="text-xl tracking-wide text-zinc-100 sm:text-2xl">
                    SKILLS
                  </p>
                </div>

                <p className="mt-2 text-[9px] uppercase tracking-widest text-zinc-500 sm:text-[10px]">
                  Technical capabilities & areas of focus
                </p>
              </div>

              <div className="shrink-0 rounded border border-zinc-800 bg-zinc-900 px-3 py-2">
                <p className="text-[8px] tracking-widest text-zinc-600">
                  PROFILE
                </p>

                <p className="mt-1 text-[9px] text-zinc-300">
                  ENGINEERING
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <div className="rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2.5">
                <p className="text-[8px] tracking-widest text-zinc-600">
                  SKILLS
                </p>
                <p className="mt-1 text-sm text-zinc-200">
                  {totalSkills}
                </p>
              </div>

              <div className="rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2.5">
                <p className="text-[8px] tracking-widest text-zinc-600">
                  EXPERIENCED
                </p>
                <p className="mt-1 text-sm text-zinc-200">
                  {experiencedSkills}
                </p>
              </div>

              <div className="hidden rounded border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 sm:block">
                <p className="text-[8px] tracking-widest text-zinc-600">
                  DOMAINS
                </p>
                <p className="mt-1 text-sm text-zinc-200">
                  {skillGroups.length}
                </p>
              </div>
            </div>
          </header>

          {/* Skill Groups */}
          <div className="mt-7 space-y-8">
            {skillGroups.map((group) => (
              <section key={group.title}>
                <div className="flex items-center gap-3">
                  <p className="text-[9px] tracking-[0.2em] text-zinc-600">
                    {group.title}
                  </p>

                  <div className="h-px flex-1 bg-zinc-900" />
                </div>

                <div className="mt-4 space-y-2">
                  {group.skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="group rounded border border-zinc-800 bg-zinc-900/60 px-4 py-3 transition-all duration-150 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="text-[8px] text-zinc-700">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="truncate text-[11px] text-zinc-300 sm:text-xs">
                            {skill.name}
                          </span>
                        </div>

                        <span
                          className={`shrink-0 text-[8px] tracking-wider ${
                            skill.level === "Experienced"
                              ? "text-zinc-300"
                              : "text-zinc-600"
                          }`}
                        >
                          {skill.level.toUpperCase()}
                        </span>
                      </div>

                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-800">
                        <div
                          className={`h-full rounded-full bg-zinc-500 transition-all duration-500 group-hover:bg-zinc-300 ${levelWidth[skill.level]}`}
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
            <p className="text-[9px] tracking-[0.2em] text-zinc-600">
              LEARNING_MODE
            </p>

            <div className="mt-4 rounded border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                <p className="text-xs text-zinc-300">
                  ACTIVE
                </p>
              </div>

              <p className="mt-3 text-[10px] leading-5 text-zinc-600 sm:text-xs sm:leading-6">
                Skills represent current working experience,
                not permanent limits. The stack keeps evolving
                through projects and experimentation.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-zinc-900 pt-4 text-[7px] tracking-[0.2em] text-zinc-700">
            <span>BOSS.OS / SKILLSET</span>
            <span>LEARNING: ACTIVE</span>
          </div>
        </div>
      </div>
    </WindowShell>
  );
} 