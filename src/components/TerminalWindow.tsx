import { useState } from "react";

import WindowShell from "./WindowShell";

type AppName =
  | "projects"
  | "terminal"
  | "resume"
  | "about"
  | "skills"
  | "contact";

type TerminalWindowProps = {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  isMaximized: boolean;
  isMinimized: boolean;
  isActive: boolean;
  minimizedOffset: number;

  onProjects?: () => void;
  onAbout?: () => void;
  onSkills?: () => void;
  onResume?: () => void;
  onContact?: () => void;

  onOpenApp?: (app: AppName) => void;
  onCloseApp?: (app: AppName) => void;
  onMinimizeApp?: (app: AppName) => void;
};

const fileSystem: Record<string, string[]> = {
  "/": [
    "about/",
    "projects/",
    "skills/",
    "experience/",
    "contact/",
    "resume.pdf",
  ],

  "/projects": [
    "netsage/",
    "attendiq/",
    "payment-system/",
  ],

  "/projects/netsage": [
    "README.md",
    "architecture/",
    "results/",
  ],

  "/projects/attendiq": [
    "README.md",
  ],

  "/projects/payment-system": [
    "README.md",
  ],
};

const readmeFiles: Record<string, string[]> = {
  "/projects/netsage": [
    "NetSage",
    "",
    "AI-assisted network troubleshooting project.",
    "",
    "Focus:",
    "- Network diagnostics",
    "- AI-assisted analysis",
    "- Packet Tracer",
    "- Python",
  ],

  "/projects/attendiq": [
    "AttendIQ",
    "",
    "Attendance intelligence and analytics project.",
    "",
    "Focus:",
    "- Attendance analysis",
    "- Data analytics",
    "- Machine learning",
  ],

  "/projects/payment-system": [
    "Payment System",
    "",
    "Backend payment processing project.",
    "",
    "Focus:",
    "- Payment flows",
    "- APIs",
    "- Backend architecture",
    "- Transaction processing",
  ],
};

const projectDetails: Record<string, string[]> = {
  netsage: [
    "NetSage",
    "",
    "Type: AI Network Troubleshooting",
    "Stack: Python, AI / LLM, Networking",
    "",
    "Highlights:",
    "- 30 structured troubleshooting cases",
    "- Deterministic Python validation",
    "- Evidence-bound AI diagnosis",
    "- Human review workflow",
    "- Cisco Packet Tracer scenarios",
  ],

  attendiq: [
    "AttendIQ",
    "",
    "Type: Attendance Intelligence",
    "Stack: Python, Data Analytics, Machine Learning",
    "",
    "Focus:",
    "- Attendance analysis",
    "- Pattern analysis",
    "- Analytical insights",
  ],

  "payment-system": [
    "Payment System",
    "",
    "Type: Payment Processing",
    "Stack: Node.js, API, Database",
    "",
    "Focus:",
    "- Payment flows",
    "- Backend architecture",
    "- Transaction processing",
  ],
};

export default function TerminalWindow({
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMaximized,
  isMinimized,
  isActive,
  minimizedOffset,
  onProjects,
  onAbout,
  onSkills,
  onResume,
  onContact,
  onOpenApp,
  onCloseApp,
  onMinimizeApp,
}: TerminalWindowProps) {
  const [command, setCommand] = useState("");

  const [output, setOutput] = useState<string[]>([
    "BOSS.OS Terminal",
    "Type 'help' to see available commands.",
    "",
  ]);

  const [currentDirectory, setCurrentDirectory] =
    useState("/");

  const addOutput = (lines: string[]) => {
    setOutput((previous) => [...previous, ...lines]);
  };

  const getPrompt = () => {
    return `boss@boss-os:${currentDirectory}$ `;
  };

  const handleCd = (directory: string): string[] => {
    if (!directory) {
      return ["Usage: cd <directory>"];
    }

    if (directory === "..") {
      if (currentDirectory === "/") {
        return ["Already at root directory."];
      }

      const parent =
        currentDirectory.substring(
          0,
          currentDirectory.lastIndexOf("/")
        ) || "/";

      setCurrentDirectory(parent);

      return [];
    }

    let targetDirectory = directory;

    if (!targetDirectory.startsWith("/")) {
      if (currentDirectory === "/") {
        targetDirectory = `/${targetDirectory}`;
      } else {
        targetDirectory = `${currentDirectory}/${targetDirectory}`;
      }
    }

    targetDirectory = targetDirectory.replace(/\/+/g, "/");

    if (targetDirectory.endsWith("/")) {
      targetDirectory = targetDirectory.slice(0, -1);
    }

    if (fileSystem[targetDirectory]) {
      setCurrentDirectory(targetDirectory);
      return [];
    }

    return [
      `cd: ${directory}: No such directory`,
    ];
  };

  const handleCat = (fileName: string): string[] => {
    if (fileName.toLowerCase() !== "readme.md") {
      return [
        `cat: ${fileName}: No such file`,
      ];
    }

    if (!readmeFiles[currentDirectory]) {
      return [
        "cat: readme.md: No such file",
      ];
    }

    return readmeFiles[currentDirectory];
  };

  const handleProjectCommand = (
    argument: string
  ): string[] => {
    const projectName = argument.toLowerCase();

    if (!projectName) {
      return [
        "Usage: projects <name>",
        "",
        "Available:",
        "- netsage",
        "- attendiq",
        "- payment-system",
      ];
    }

    if (!projectDetails[projectName]) {
      return [
        `projects: ${argument}: Project not found`,
        "Use 'projects' to see available projects.",
      ];
    }

    return projectDetails[projectName];
  };

  const handleTree = (): string[] => {
    return [
      ".",
      "├── about/",
      "├── projects/",
      "│   ├── netsage/",
      "│   │   ├── README.md",
      "│   │   ├── architecture/",
      "│   │   └── results/",
      "│   ├── attendiq/",
      "│   │   └── README.md",
      "│   └── payment-system/",
      "│       └── README.md",
      "├── skills/",
      "├── experience/",
      "├── contact/",
      "└── resume.pdf",
    ];
  };

  const handleStatus = (): string[] => {
    return [
      "BOSS.OS SYSTEM STATUS",
      "",
      "System:     ONLINE",
      "Kernel:     BOSS.OS",
      "Session:    ACTIVE",
      "Terminal:   RUNNING",
      "Projects:   3",
      "Mode:       PORTFOLIO",
    ];
  };

  const handleNeofetch = (): string[] => {
    return [
      "██████╗  ██████╗ ███████╗███████╗",
      "██╔══██╗██╔═══██╗██╔════╝██╔════╝",
      "██████╔╝██║   ██║███████╗███████╗",
      "██╔══██╗██║   ██║╚════██║╚════██║",
      "██████╔╝╚██████╔╝███████║███████║",
      "╚═════╝  ╚═════╝ ╚══════╝╚══════╝",
      "",
      "BOSS.OS",
      "────────",
      "User:       Boss",
      "Role:       Engineering Student",
      "Projects:   3",
      "Focus:      Software / AI / Data / Systems",
      "Terminal:   BOSS Terminal",
    ];
  };

  const handleOpenApp = (
    app: string
  ): string[] => {
    const target = app.toLowerCase() as AppName;

    const validApps: AppName[] = [
      "projects",
      "terminal",
      "resume",
      "about",
      "skills",
      "contact",
    ];

    if (!validApps.includes(target)) {
      return [
        `open: ${app}: Application not found`,
        "Available: projects, terminal, resume, about, skills, contact",
      ];
    }

    onOpenApp?.(target);

    return [`Opening ${target}...`];
  };

  const handleCloseApp = (
    app: string
  ): string[] => {
    const target = app.toLowerCase() as AppName;

    const validApps: AppName[] = [
      "projects",
      "terminal",
      "resume",
      "about",
      "skills",
      "contact",
    ];

    if (!validApps.includes(target)) {
      return [
        `close: ${app}: Application not found`,
      ];
    }

    if (target === "terminal") {
      onClose();
      return ["Closing terminal..."];
    }

    onCloseApp?.(target);

    return [`Closing ${target}...`];
  };

  const handleMinimizeApp = (
    app: string
  ): string[] => {
    const target = app.toLowerCase() as AppName;

    const validApps: AppName[] = [
      "projects",
      "terminal",
      "resume",
      "about",
      "skills",
      "contact",
    ];

    if (!validApps.includes(target)) {
      return [
        `minimize: ${app}: Application not found`,
      ];
    }

    if (target === "terminal") {
      onMinimize();
      return ["Minimizing terminal..."];
    }

    onMinimizeApp?.(target);

    return [`Minimizing ${target}...`];
  };

  const executeCommand = (
    baseCommand: string,
    argument: string
  ): string[] => {
    switch (baseCommand) {
      case "help":
        return [
          "Available commands:",
          "",
          "help                 Show available commands",
          "whoami               Show user information",
          "about                Open About",
          "skills               Open Skills",
          "projects             Open Projects",
          "projects <name>     Show project details",
          "experience           Show experience",
          "contact              Open Contact",
          "resume               Open Resume",
          "open <app>           Open an application",
          "close <app>          Close an application",
          "minimize <app>       Minimize an application",
          "status               Show system status",
          "neofetch             Show system information",
          "tree                 Show portfolio tree",
          "pwd                  Show current directory",
          "ls                   List directory contents",
          "cd <directory>       Change directory",
          "cat readme.md        Read project README",
          "clear                Clear terminal",
        ];

      case "whoami":
        return [
          "Boss",
          "Engineering Student",
        ];

      case "about":
        onAbout?.();
        return ["Opening About..."];

      case "skills":
        onSkills?.();
        return ["Opening Skills..."];

      case "projects":
        if (argument) {
          return handleProjectCommand(argument);
        }

        onProjects?.();

        return [
          "Opening Projects...",
          "",
          "Available projects:",
          "1. NetSage",
          "2. AttendIQ",
          "3. Payment System",
        ];

      case "experience":
        return [
          "EXPERIENCE",
          "",
          "Engineering projects",
          "AI & network troubleshooting",
          "Data analytics",
          "Backend systems",
          "",
          "More details available through",
          "the portfolio windows.",
        ];

      case "contact":
        onContact?.();
        return ["Opening Contact..."];

      case "resume":
        onResume?.();
        return ["Opening Resume..."];

      case "open":
        return handleOpenApp(argument);

      case "close":
        return handleCloseApp(argument);

      case "minimize":
        return handleMinimizeApp(argument);

      case "status":
        return handleStatus();

      case "neofetch":
        return handleNeofetch();

      case "tree":
        return handleTree();

      case "pwd":
        return [currentDirectory];

      case "ls":
        return fileSystem[currentDirectory] ?? [
          "Directory not found.",
        ];

      case "cd":
        return handleCd(argument);

      case "cat":
        return handleCat(argument);

      case "clear":
        setOutput([]);
        return [];

      default:
        return [
          `Command not found: ${baseCommand}`,
          "Type 'help' for available commands.",
        ];
    }
  };

  const handleCommand = (input: string) => {
    const trimmedCommand = input.trim();

    if (!trimmedCommand) {
      addOutput([getPrompt()]);
      return;
    }

    const parts = trimmedCommand.split(/\s+/);
    const baseCommand = parts[0].toLowerCase();
    const argument = parts.slice(1).join(" ");

    addOutput([
      `${getPrompt()}${trimmedCommand}`,
      ...executeCommand(baseCommand, argument),
      "",
    ]);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    handleCommand(command);
    setCommand("");
  };

  return (
    <WindowShell
      title="Terminal"
      icon="💻"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onFocus={onFocus}
      isMaximized={isMaximized}
      isMinimized={isMinimized}
      isActive={isActive}
      minimizedOffset={minimizedOffset}
    >
      <div className="flex h-full flex-col bg-black font-mono text-xs text-zinc-300">
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {output.map((line, index) => (
            <div
              key={`${line}-${index}`}
              className="whitespace-pre-wrap leading-5"
            >
              {line}
            </div>
          ))}

          <div className="mt-1">
            {getPrompt()}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex shrink-0 border-t border-zinc-800 bg-black px-4 py-2"
        >
          <span className="mr-2 text-zinc-500">
            $
          </span>

          <input
            value={command}
            onChange={(event) =>
              setCommand(event.target.value)
            }
            autoFocus
            className="min-w-0 flex-1 bg-transparent text-zinc-200 outline-none"
            placeholder="type a command..."
          />
        </form>
      </div>
    </WindowShell>
  );
}