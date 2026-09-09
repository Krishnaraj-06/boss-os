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

const contacts = [
  {
    label: "EMAIL",
    value: "singhkrishnaraj027@gmail.com",
    href: "mailto:singhkrishnaraj027@gmail.com",
    icon: "✉",
  },
  {
    label: "GITHUB",
    value: "github.com/Krishnaraj-06",
    href: "https://github.com/Krishnaraj-06",
    icon: "⌘",
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/krishnarajsingh06",
    href: "https://www.linkedin.com/in/krishnarajsingh06/",
    icon: "in",
  },
];

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
      <div className="h-full overflow-y-auto bg-zinc-950 font-mono">
        <div className="mx-auto max-w-2xl p-4 sm:p-6 md:p-8">
          {/* Header */}
          <header className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

              <p className="text-xl tracking-wide text-zinc-100 sm:text-2xl">
                CONTACT
              </p>
            </div>

            <p className="mt-2 text-[10px] uppercase tracking-widest text-zinc-500">
              Let&apos;s connect and build something useful.
            </p>
          </header>

          {/* Contact Channels */}
          <section className="mt-7">
            <p className="text-[9px] tracking-[0.2em] text-zinc-600">
              01 / CONNECT
            </p>

            <div className="mt-4 space-y-2">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={
                    contact.label === "EMAIL" ? undefined : "_blank"
                  }
                  rel={
                    contact.label === "EMAIL"
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="group flex items-center gap-3 rounded border border-zinc-800 bg-zinc-900/60 p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-900"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-zinc-800 bg-zinc-950 text-[10px] text-zinc-500 transition group-hover:border-zinc-700 group-hover:text-zinc-300">
                    {contact.icon}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-[8px] tracking-[0.2em] text-zinc-600">
                      {contact.label}
                    </p>

                    <p className="mt-1 break-all text-[11px] text-zinc-300 transition group-hover:text-white sm:text-xs">
                      {contact.value}
                    </p>
                  </div>

                  <span className="shrink-0 text-zinc-700 transition-all duration-150 group-hover:translate-x-1 group-hover:text-zinc-300">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* Availability */}
          <section className="mt-8">
            <p className="text-[9px] tracking-[0.2em] text-zinc-600">
              02 / AVAILABILITY
            </p>

            <div className="mt-4 rounded border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.35)]" />

                <div>
                  <p className="text-xs text-zinc-200 sm:text-sm">
                    Available for opportunities
                  </p>

                  <p className="mt-2 text-[10px] leading-5 text-zinc-600 sm:text-xs sm:leading-6">
                    Open to internships, projects, and meaningful
                    collaborations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Collaboration */}
          <section className="mt-8">
            <p className="text-[9px] tracking-[0.2em] text-zinc-600">
              03 / COLLABORATION
            </p>

            <div className="mt-4 rounded border border-zinc-800 bg-zinc-900/40 p-4 sm:p-5">
              <p className="text-xs leading-6 text-zinc-400">
                Interested in building practical systems, exploring
                new ideas, and learning through real engineering
                problems.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-7 flex items-center justify-between border-t border-zinc-900 pt-4 text-[7px] tracking-[0.2em] text-zinc-700">
            <span>BOSS.OS / CONTACT</span>

            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-green-500" />
              OPEN
            </span>
          </div>
        </div>
      </div>
    </WindowShell>
  );
}