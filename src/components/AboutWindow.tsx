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
      <div className="h-full overflow-y-auto bg-zinc-950 p-5 font-mono">
        {/* Profile */}
        <section>
          <p className="text-xs text-zinc-500">
            PROFILE
          </p>

          <div className="mt-3 border border-zinc-800 bg-zinc-900 p-4">
            <p className="text-lg text-zinc-200">
              Boss
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Engineering Student
            </p>
          </div>
        </section>

        {/* About Me */}
        <section className="mt-6">
          <p className="text-xs text-zinc-500">
            ABOUT_ME
          </p>

          <p className="mt-3 text-sm leading-6 text-zinc-300">
            I&apos;m an engineering student who enjoys building things,
            understanding how systems work, and turning ideas into practical
            projects. I&apos;m particularly interested in software engineering,
            AI, data, and systems — with a focus on learning by building,
            breaking, debugging, and improving.
          </p>
        </section>

        {/* Current Focus */}
        <section className="mt-6">
          <p className="text-xs text-zinc-500">
            CURRENT_FOCUS
          </p>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              "Software Engineering",
              "Artificial Intelligence",
              "Data & Analytics",
              "Systems & Networking",
            ].map((focus) => (
              <div
                key={focus}
                className="border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-300"
              >
                <span className="mr-2 text-zinc-600">▸</span>
                {focus}
              </div>
            ))}
          </div>
        </section>

        {/* Currently Building */}
        <section className="mt-6">
          <p className="text-xs text-zinc-500">
            CURRENTLY_BUILDING
          </p>

          <div className="mt-3 space-y-2">
            {["BOSS.OS", "NetSage", "AttendIQ", "Payment System"].map(
              (project) => (
                <div
                  key={project}
                  className="flex items-center gap-3 border border-zinc-800 bg-zinc-900 px-3 py-2"
                >
                  <span className="text-xs text-zinc-600">
                    ▸
                  </span>

                  <span className="text-xs text-zinc-300">
                    {project}
                  </span>
                </div>
              )
            )}
          </div>
        </section>

        {/* Mindset */}
        <section className="mt-6">
          <p className="text-xs text-zinc-500">
            MINDSET
          </p>

          <div className="mt-3 border border-zinc-800 bg-zinc-900 p-4 text-center">
            <p className="text-sm tracking-wide text-zinc-300">
              Build
              <span className="mx-2 text-zinc-600">→</span>
              Break
              <span className="mx-2 text-zinc-600">→</span>
              Understand
              <span className="mx-2 text-zinc-600">→</span>
              Improve
            </p>
          </div>
        </section>

        {/* Status */}
        <section className="mt-6 pb-2">
          <p className="text-xs text-zinc-500">
            STATUS
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-zinc-300">
              Building BOSS.OS
            </span>
          </div>
        </section>
      </div>
    </WindowShell>
  );
}