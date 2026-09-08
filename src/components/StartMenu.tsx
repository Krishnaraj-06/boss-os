type StartMenuProps = {
  onProjects: () => void;
  onTerminal: () => void;
  onResume: () => void;
  onAbout: () => void;
  onSkills: () => void;
  onContact: () => void;
  onShutdown: () => void;
};

export default function StartMenu({
  onProjects,
  onTerminal,
  onResume,
  onAbout,
  onSkills,
  onContact,
  onShutdown,
}: StartMenuProps) {
  return (
    <div
      className="absolute bottom-8 left-2 z-50 w-52 border border-zinc-700 bg-zinc-950 font-mono shadow-2xl"
      onClick={(event) => event.stopPropagation()}
    >
      {/* Header */}
      <div className="border-b border-zinc-700 bg-zinc-900 px-4 py-3">
        <p className="text-sm font-bold text-zinc-200">
          BOSS.OS
        </p>

        <p className="mt-1 text-[10px] text-zinc-500">
          SYSTEM MENU
        </p>
      </div>

      {/* Apps */}
      <div className="p-2">
        <button
          onClick={onProjects}
          className="flex w-full items-center gap-3 px-3 py-2 text-left text-xs transition hover:bg-zinc-800"
        >
          <span>📁</span>
          <span>Projects</span>
        </button>

        <button
          onClick={onTerminal}
          className="flex w-full items-center gap-3 px-3 py-2 text-left text-xs transition hover:bg-zinc-800"
        >
          <span>💻</span>
          <span>Terminal</span>
        </button>

        <button
          onClick={onResume}
          className="flex w-full items-center gap-3 px-3 py-2 text-left text-xs transition hover:bg-zinc-800"
        >
          <span>📄</span>
          <span>Resume</span>
        </button>

        <button
          onClick={onAbout}
          className="flex w-full items-center gap-3 px-3 py-2 text-left text-xs transition hover:bg-zinc-800"
        >
          <span>👤</span>
          <span>About</span>
        </button>

        <button
          onClick={onSkills}
          className="flex w-full items-center gap-3 px-3 py-2 text-left text-xs transition hover:bg-zinc-800"
        >
          <span>🛠️</span>
          <span>Skills</span>
        </button>

        <button
          onClick={onContact}
          className="flex w-full items-center gap-3 px-3 py-2 text-left text-xs transition hover:bg-zinc-800"
        >
          <span>📇</span>
          <span>Contact</span>
        </button>
      </div>

      {/* Shutdown */}
      <div className="border-t border-zinc-700 p-2">
        <button
          onClick={onShutdown}
          className="flex w-full items-center gap-3 px-3 py-2 text-left text-xs text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <span>⚡</span>
          <span>Shut Down</span>
        </button>
      </div>
    </div>
  );
}