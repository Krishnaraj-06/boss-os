import { useState } from "react";
import WindowShell from "./WindowShell";

type TerminalWindowProps = {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  isMaximized: boolean;
  isMinimized: boolean;
  isActive: boolean;
  minimizedOffset: number;
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

export default function TerminalWindow({
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMaximized,
  isMinimized,
  isActive,
  minimizedOffset,
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

  const executeCommand = (
    baseCommand: string,
    argument: string
  ): string[] => {
    switch (baseCommand) {
      case "help":
        return [
          "Available commands:",
          "",
          "help              Show available commands",
          "whoami            Show user information",
          "pwd               Show current directory",
          "ls                List directory contents",
          "cd <directory>    Change directory",
          "cat readme.md     Read project README",
          "projects          List projects",
          "clear             Clear terminal",
        ];

      case "whoami":
        return [
          "Boss",
          "Engineering Student",
        ];

      case "pwd":
        return [currentDirectory];

      case "ls":
        return fileSystem[currentDirectory] ?? [
          "Directory not found.",
        ];

      case "projects":
        return [
          "Available projects:",
          "",
          "1. NetSage",
          "2. AttendIQ",
          "3. Payment System",
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

    const parts = trimmedCommand.split(" ");
    const baseCommand = parts[0].toLowerCase();
    const argument = parts.slice(1).join(" ");

    addOutput([
      `${getPrompt()}${trimmedCommand}`,
      ...executeCommand(baseCommand, argument),
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