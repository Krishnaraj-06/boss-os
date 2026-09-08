type TaskbarProps = {
  onStart: () => void;
};

export default function Taskbar({
  onStart,
}: TaskbarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 flex h-8 items-center justify-between border-t border-zinc-600 bg-zinc-950 px-2 font-mono text-xs">
      {/* Left Side */}
      <div className="flex items-center gap-2">
        <button
          onClick={(event) => {
            event.stopPropagation();
            onStart();
          }}
          className="border border-zinc-700 bg-zinc-900 px-3 py-1 transition hover:bg-zinc-800"
        >
          BOSS
        </button>

        <div className="h-4 w-px bg-zinc-700" />

        <span className="text-zinc-500">
          BOSS.OS
        </span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 text-zinc-400">
        <span>ONLINE</span>

        <span className="text-zinc-600">|</span>

        <span>SYS</span>

        <span className="text-zinc-600">|</span>

        <span>12:00</span>
      </div>
    </div>
  );
}