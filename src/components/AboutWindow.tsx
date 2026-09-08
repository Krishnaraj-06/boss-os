import WindowShell from "./WindowShell";

type AboutWindowProps = {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  isMaximized: boolean;
  isMinimized: boolean;
  isActive: boolean;
  minimizedOffset: number;
};

export default function AboutWindow({
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMaximized,
  isMinimized,
  isActive,
  minimizedOffset,
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
      <div className="h-full overflow-y-auto bg-zinc-950 p-6 font-mono">
        <div className="mx-auto max-w-xl">
          <section className="mb-8">
            <p className="text-xs text-zinc-500">
              PROFILE
            </p>

            <p className="mt-2 text-lg text-zinc-200">
              Boss
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Engineering Student
            </p>
          </section>

          <section className="mb-8">
            <p className="text-xs text-zinc-500">
              ABOUT_ME
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-300">
              I'm an engineering student interested in
              building technology, solving problems and
              exploring software, systems and data.
            </p>
          </section>

          <section className="mb-8">
            <p className="text-xs text-zinc-500">
              CURRENT_FOCUS
            </p>

            <div className="mt-3 space-y-2 text-sm text-zinc-300">
              <p>→ Software Engineering</p>
              <p>→ Artificial Intelligence</p>
              <p>→ Data & Analytics</p>
              <p>→ Systems & Networking</p>
            </div>
          </section>

          <section className="mb-8">
            <p className="text-xs text-zinc-500">
              CURRENTLY_BUILDING
            </p>

            <div className="mt-3 space-y-2 text-sm text-zinc-300">
              <p>→ BOSS.OS</p>
              <p>→ NetSage</p>
              <p>→ AttendIQ</p>
              <p>→ Payment System</p>
            </div>
          </section>

          <section className="mb-8">
            <p className="text-xs text-zinc-500">
              MINDSET
            </p>

            <div className="mt-3 border border-zinc-800 bg-zinc-900 p-4 text-center text-sm text-zinc-300">
              Build → Break → Understand → Improve
            </div>
          </section>

          <section>
            <p className="text-xs text-zinc-500">
              STATUS
            </p>

            <p className="mt-3 text-sm text-zinc-400">
              Building BOSS.OS
            </p>
          </section>
        </div>
      </div>
    </WindowShell>
  );
}