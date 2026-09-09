import WindowShell from "./WindowShell";

type ContactWindowProps = {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  isMaximized: boolean;
  isMinimized: boolean;
  isActive: boolean;
  minimizedOffset: number;
};

export default function ContactWindow({
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMaximized,
  isMinimized,
  isActive,
  minimizedOffset,
}: ContactWindowProps) {
  return (
    <WindowShell
      title="Contact"
      icon="📇"
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
            <p className="text-lg text-zinc-200">CONTACT</p>
            <p className="mt-2 text-xs text-zinc-500">
              Let&apos;s connect and build something useful.
            </p>
          </div>

          <section className="space-y-3">
            <div className="border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-xs text-zinc-500">EMAIL</p>
              <a
                href="mailto:singhkrishnaraj027@gmail.com"
                className="mt-2 block break-all text-sm text-zinc-300 transition hover:text-white"
              >
                singhkrishnaraj027@gmail.com
              </a>
            </div>

            <div className="border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-xs text-zinc-500">GITHUB</p>
              <a
                href="https://github.com/Krishnaraj-06"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm text-zinc-300 transition hover:text-white"
              >
                github.com/Krishnaraj-06 ↗
              </a>
            </div>

            <div className="border border-zinc-800 bg-zinc-900 p-4">
              <p className="text-xs text-zinc-500">LINKEDIN</p>
              <a
                href="https://www.linkedin.com/in/krishnarajsingh06/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm text-zinc-300 transition hover:text-white"
              >
                linkedin.com/in/krishnarajsingh06 ↗
              </a>
            </div>
          </section>

          <section className="mt-7">
            <p className="text-xs text-zinc-500">AVAILABILITY</p>

            <div className="mt-3 flex items-center gap-3 border border-zinc-800 bg-zinc-900 p-4">
              <span className="h-2 w-2 rounded-full bg-green-500" />

              <div>
                <p className="text-sm text-zinc-300">
                  Available for opportunities
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Open to internships, projects, and meaningful collaborations.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </WindowShell>
  );
}