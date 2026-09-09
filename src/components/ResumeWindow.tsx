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
      <div className="flex h-full flex-col bg-zinc-900 font-mono">
        {/* Document Toolbar */}
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-3 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />

            <span className="truncate text-[10px] text-zinc-400 sm:text-xs">
              resume.pdf
            </span>

            <span className="hidden text-[8px] text-zinc-700 sm:inline">
              ·
            </span>

            <span className="hidden text-[8px] tracking-wider text-zinc-700 sm:inline">
              DOCUMENT
            </span>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 flex shrink-0 items-center gap-2 rounded border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-[9px] text-zinc-300 transition-all duration-150 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
          >
            <span>OPEN</span>
            <span className="text-zinc-500">↗</span>
          </a>
        </div>

        {/* Document Viewer */}
        <div className="relative min-h-0 flex-1 bg-zinc-800 p-1.5 sm:p-2">
          <div className="absolute left-3 top-3 z-10 hidden border border-zinc-700/70 bg-zinc-950/80 px-2 py-1 text-[8px] text-zinc-600 backdrop-blur-sm sm:block">
            PREVIEW
          </div>

          <iframe
            src="/resume.pdf"
            title="Krishnaraj Singh Resume"
            className="h-full w-full rounded-sm border-0 bg-white shadow-2xl"
          />
        </div>

        {/* Viewer Status */}
        <div className="flex h-6 shrink-0 items-center justify-between border-t border-zinc-800 bg-zinc-950 px-3 text-[7px] tracking-wider text-zinc-700">
          <span>RESUME / PDF</span>

          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-green-500" />
            READY
          </span>
        </div>
      </div>
    </WindowShell>
  );
}