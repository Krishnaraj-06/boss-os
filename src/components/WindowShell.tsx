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

  /*
   * Sync local state with the central window manager.
   */
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

  /*
   * Minimized window
   *
   * Instead of completely disappearing, it becomes
   * a small title bar above the taskbar.
   */
  if (localMinimized) {
    return (
      <div
        onClick={(event) => {
          event.stopPropagation();
          handleRestore();
        }}
        style={{
          left: `${8 + minimizedOffset * 164}px`,
        }}
        className="absolute bottom-9 z-50 flex h-8 w-40 cursor-pointer items-center justify-between rounded border border-zinc-700 bg-zinc-900 px-2 font-mono text-xs shadow-lg transition hover:bg-zinc-800"
      >
        <div className="flex min-w-0 items-center gap-2">
          <span>{icon}</span>

          <span className="truncate text-zinc-300">
            {title}
          </span>
        </div>

        <span className="text-zinc-500">
          ↑
        </span>
      </div>
    );
  }

  const maximized = localMaximized;

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        onFocus?.();
      }}
      className={
        maximized
          ? `absolute left-0 right-0 top-0 bottom-8 flex flex-col bg-zinc-950 ${
              isActive ? "z-50" : "z-30"
            }`
          : `absolute left-5 right-5 top-5 bottom-10 flex flex-col overflow-hidden rounded-lg border bg-zinc-950 shadow-2xl ${
              isActive
                ? "z-50 border-zinc-500"
                : "z-30 border-zinc-700"
            }`
      }
    >
      {/* Window Header */}
      <div
        className={`flex h-9 shrink-0 items-center justify-between border-b px-3 ${
          isActive
            ? "border-zinc-700 bg-zinc-900"
            : "border-zinc-800 bg-zinc-950"
        }`}
      >
        {/* Title */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span>{icon}</span>

          <span
            className={
              isActive
                ? "text-zinc-200"
                : "text-zinc-500"
            }
          >
            {title}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          {/* Minimize */}
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleMinimize();
            }}
            className="flex h-6 w-7 items-center justify-center text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            title="Minimize"
          >
            −
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleMaximize();
            }}
            className="flex h-6 w-7 items-center justify-center text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            title={maximized ? "Restore" : "Maximize"}
          >
            {maximized ? "❐" : "□"}
          </button>

          {/* Close */}
          <button
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="flex h-6 w-7 items-center justify-center text-zinc-400 transition hover:bg-red-900 hover:text-white"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1">
        {children}
      </div>
    </div>
  );
}