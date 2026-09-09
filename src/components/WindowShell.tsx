import { useEffect, useState, type ReactNode } from "react";

type WindowShellProps = {
  title: string;
  icon?: string;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
  isMaximized?: boolean;
  isMinimized?: boolean;
  isActive?: boolean;
  minimizedOffset?: number;
  children: ReactNode;
};

export default function WindowShell({
  title,
  icon = "🗔",
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMaximized = false,
  isMinimized = false,
  isActive = true,
  minimizedOffset = 0,
  children,
}: WindowShellProps) {
  const [localMaximized, setLocalMaximized] =
    useState(isMaximized);
  const [localMinimized, setLocalMinimized] =
    useState(isMinimized);

  useEffect(() => {
    setLocalMaximized(isMaximized);
  }, [isMaximized]);

  useEffect(() => {
    setLocalMinimized(isMinimized);
  }, [isMinimized]);

  const handleMinimize = () => {
    setLocalMinimized(true);
    onMinimize?.();
  };

  const handleRestore = () => {
    setLocalMinimized(false);
    onFocus?.();
  };

  const handleMaximize = () => {
    const nextState = !localMaximized;

    setLocalMaximized(nextState);
    setLocalMinimized(false);

    onMaximize?.();
    onFocus?.();
  };

  if (localMinimized) {
    return (
      <div
        onClick={(event) => {
          event.stopPropagation();
          handleRestore();
        }}
        style={{
          left: `${8 + (minimizedOffset % 3) * 164}px`,
          bottom: `${9 + Math.floor(minimizedOffset / 3) * 36}px`,
        }}
        className="absolute z-50 flex h-8 w-40 cursor-pointer items-center justify-between overflow-hidden rounded-md border border-zinc-700 bg-zinc-900 px-2.5 font-mono text-[10px] shadow-xl transition-all duration-150 hover:-translate-y-0.5 hover:border-zinc-500 hover:bg-zinc-800"
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-sm">{icon}</span>

          <span className="truncate text-zinc-300">
            {title}
          </span>
        </div>

        <span className="ml-2 shrink-0 text-zinc-600 transition group-hover:text-zinc-300">
          ↑
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        onFocus?.();
      }}
      className={
        localMaximized
          ? `absolute inset-x-0 bottom-8 top-0 flex flex-col bg-zinc-950 ${
              isActive ? "z-50" : "z-30"
            }`
          : `absolute bottom-10 left-5 right-5 top-5 flex flex-col overflow-hidden rounded-lg border bg-zinc-950 shadow-2xl transition-all duration-150 ${
              isActive
                ? "z-50 border-zinc-600 shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
                : "z-30 border-zinc-800 shadow-xl"
            }`
      }
    >
      {/* Window Title Bar */}
      <div
        className={`relative flex h-10 shrink-0 items-center justify-between border-b px-3 ${
          isActive
            ? "border-zinc-700 bg-zinc-900"
            : "border-zinc-800 bg-zinc-950"
        }`}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute bottom-0 left-0 top-0 w-px bg-zinc-500" />
        )}

        <div className="flex min-w-0 items-center gap-2 font-mono text-xs">
          <span className="shrink-0 text-sm">{icon}</span>

          <span
            className={`truncate ${
              isActive ? "text-zinc-200" : "text-zinc-500"
            }`}
          >
            {title}
          </span>

          {isActive && (
            <span className="hidden text-[8px] tracking-widest text-zinc-600 sm:inline">
              ACTIVE
            </span>
          )}
        </div>

        {/* Window Controls */}
        <div className="ml-3 flex shrink-0 items-center gap-0.5">
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleMinimize();
            }}
            className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
            title="Minimize"
            aria-label="Minimize window"
          >
            <span className="mb-1 text-sm">−</span>
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              handleMaximize();
            }}
            className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
            title={localMaximized ? "Restore" : "Maximize"}
            aria-label={
              localMaximized
                ? "Restore window"
                : "Maximize window"
            }
          >
            <span className="text-xs">
              {localMaximized ? "❐" : "□"}
            </span>
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition hover:bg-red-950 hover:text-red-300"
            title="Close"
            aria-label="Close window"
          >
            <span className="text-xs">✕</span>
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="min-h-0 flex-1 bg-zinc-950">
        {children}
      </div>
    </div>
  );
}