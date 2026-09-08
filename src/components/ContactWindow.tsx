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
            <p className="text-lg text-zinc-200">
              CONTACT
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              Let's build something interesting.
            </p>
          </div>

          <div className="mb-4 border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-600">
            <p className="text-xs text-zinc-500">
              EMAIL
            </p>

            <a
              href="mailto:your-email@example.com"
              className="mt-2 block text-sm text-zinc-200 transition hover:text-white"
            >
              your-email@example.com
            </a>
          </div>

          <div className="mb-4 border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-600">
            <p className="text-xs text-zinc-500">
              GITHUB
            </p>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-zinc-200 transition hover:text-white"
            >
              github.com/
            </a>
          </div>

          <div className="mb-4 border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-600">
            <p className="text-xs text-zinc-500">
              LINKEDIN
            </p>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-zinc-200 transition hover:text-white"
            >
              linkedin.com/
            </a>
          </div>

          <div className="mt-8 border-t border-zinc-800 pt-4">
            <p className="text-xs text-zinc-500">
              STATUS
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              Available for opportunities.
            </p>
          </div>
        </div>
      </div>
    </WindowShell>
  );
}