import WindowShell from "./WindowShell";

type ResumeWindowProps = {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  isMaximized: boolean;
  isMinimized: boolean;
  isActive: boolean;
  minimizedOffset: number;
};

export default function ResumeWindow({
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMaximized,
  isMinimized,
  isActive,
  minimizedOffset,
}: ResumeWindowProps) {
  return (
    <WindowShell
      title="Resume"
      icon="📄"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onFocus={onFocus}
      isMaximized={isMaximized}
      isMinimized={isMinimized}
      isActive={isActive}
      minimizedOffset={minimizedOffset}
    >
      <div className="flex h-full flex-col bg-zinc-800">
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-700 bg-zinc-900 px-3 py-2">
          <span className="font-mono text-xs text-zinc-500">
            resume.pdf
          </span>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-zinc-700 bg-zinc-800 px-3 py-1 font-mono text-xs text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
          >
            Open ↗
          </a>
        </div>

        <div className="min-h-0 flex-1 p-2">
          <iframe
            src="/resume.pdf"
            title="Resume"
            className="h-full w-full border-0 bg-white"
          />
        </div>
      </div>
    </WindowShell>
  );
}