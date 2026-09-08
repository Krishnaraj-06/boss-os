"use client";

import { useEffect, useState } from "react";
import Terminal from "../components/TerminalWindow";
import ProjectsWindow from "../components/ProjectsWindow";
import AboutWindow from "../components/AboutWindow";
import SkillsWindow from "../components/SkillsWindow";
import ResumeWindow from "../components/ResumeWindow";
import ContactWindow from "../components/ContactWindow";
import Taskbar from "../components/Taskbar";
import StartMenu from "../components/StartMenu";
import { projects } from "../data/projects";


type AppName =
  | "projects"
  | "terminal"
  | "resume"
  | "about"
  | "skills"
  | "contact";

type WindowState = {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
};

const initialWindows: Record<AppName, WindowState> = {
  projects: {
    open: false,
    minimized: false,
    maximized: false,
  },
  terminal: {
    open: false,
    minimized: false,
    maximized: false,
  },
  resume: {
    open: false,
    minimized: false,
    maximized: false,
  },
  about: {
    open: false,
    minimized: false,
    maximized: false,
  },
  skills: {
    open: false,
    minimized: false,
    maximized: false,
  },
  contact: {
    open: false,
    minimized: false,
    maximized: false,
  },
};

const minimizedOffsets: Record<AppName, number> = {
  projects: 0,
  terminal: 1,
  resume: 2,
  about: 3,
  skills: 4,
  contact: 5,
};

export default function Home() {
  const [isBooting, setIsBooting] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const [showStartMenu, setShowStartMenu] =
    useState(false);

  const [windows, setWindows] =
    useState<Record<AppName, WindowState>>(
      initialWindows
    );

  const [activeWindow, setActiveWindow] =
    useState<AppName | null>(null);

  const [selectedProject, setSelectedProject] =
    useState<string | null>(null);

  useEffect(() => {
    if (!isBooting) return;

    const timer = setTimeout(() => {
      setIsDesktop(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isBooting]);

  const openApp = (app: AppName) => {
    setShowStartMenu(false);

    setWindows((current) => ({
      ...current,
      [app]: {
        ...current[app],
        open: true,
        minimized: false,
      },
    }));

    setActiveWindow(app);
  };

  const closeApp = (app: AppName) => {
    setWindows((current) => ({
      ...current,
      [app]: {
        open: false,
        minimized: false,
        maximized: false,
      },
    }));

    if (activeWindow === app) {
      setActiveWindow(null);
    }

    if (app === "projects") {
      setSelectedProject(null);
    }
  };

  const minimizeApp = (app: AppName) => {
    setWindows((current) => ({
      ...current,
      [app]: {
        ...current[app],
        minimized: true,
      },
    }));

    if (activeWindow === app) {
      setActiveWindow(null);
    }
  };

  const toggleMaximize = (app: AppName) => {
    setWindows((current) => ({
      ...current,
      [app]: {
        ...current[app],
        maximized: !current[app].maximized,
        minimized: false,
      },
    }));

    setActiveWindow(app);
  };

  const focusWindow = (app: AppName) => {
    setActiveWindow(app);

    setWindows((current) => ({
      ...current,
      [app]: {
        ...current[app],
        open: true,
        minimized: false,
      },
    }));
  };

  const closeAllWindows = () => {
    setWindows(initialWindows);
    setActiveWindow(null);
    setSelectedProject(null);
    setShowStartMenu(false);
  };

  const shutdown = () => {
    closeAllWindows();
    setIsDesktop(false);
    setIsBooting(false);
  };

  return (
    <main className="relative min-h-screen w-full bg-zinc-900 text-white">
      {/* Identity */}
      <div className="absolute left-6 top-6 z-10">
        <div className="bg-black px-5 py-2 text-xl font-bold">
          Boss
        </div>

        <div className="mt-1 bg-black px-5 py-2 text-sm">
          Engineering Student
        </div>
      </div>

      {/* Computer */}
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="relative w-[600px]">
          {/* Monitor */}
          <div
            onClick={() => {
              if (!isBooting) {
                setIsBooting(true);
              }
            }}
            className="block h-[400px] w-full cursor-pointer rounded-lg border-8 border-zinc-600 bg-zinc-700 p-6 shadow-2xl transition hover:scale-[1.01]"
          >
            <div className="relative flex h-full items-center justify-center bg-black">
              {/* Initial */}
              {!isBooting && (
                <span className="font-mono text-2xl text-zinc-400">
                  BOSS.OS
                </span>
              )}

              {/* Boot */}
              {isBooting && !isDesktop && (
                <div className="text-center font-mono">
                  <p className="mb-4 text-xl">
                    BOSS.OS
                  </p>

                  <p className="text-sm text-zinc-400">
                    SYSTEM BOOTING...
                  </p>
                </div>
              )}

              {/* Desktop */}
              {isDesktop && (
                <div
                  className="relative h-full w-full overflow-hidden bg-zinc-800 p-6 pb-10 text-left"
                  onClick={() => {
                    setShowStartMenu(false);
                  }}
                >
                  <p className="font-mono text-sm text-zinc-400">
                    BOSS.OS
                  </p>

                  {/* Desktop Icons */}
                  <div className="mt-8 grid grid-cols-4 gap-6">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        openApp("projects");
                      }}
                      className="text-center transition hover:scale-110"
                    >
                      <div className="text-3xl">📁</div>
                      <p className="mt-2 text-xs">
                        Projects
                      </p>
                    </button>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        openApp("terminal");
                      }}
                      className="text-center transition hover:scale-110"
                    >
                      <div className="text-3xl">💻</div>
                      <p className="mt-2 text-xs">
                        Terminal
                      </p>
                    </button>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        openApp("resume");
                      }}
                      className="text-center transition hover:scale-110"
                    >
                      <div className="text-3xl">📄</div>
                      <p className="mt-2 text-xs">
                        Resume
                      </p>
                    </button>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        openApp("about");
                      }}
                      className="text-center transition hover:scale-110"
                    >
                      <div className="text-3xl">👤</div>
                      <p className="mt-2 text-xs">
                        About
                      </p>
                    </button>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        openApp("skills");
                      }}
                      className="text-center transition hover:scale-110"
                    >
                      <div className="text-3xl">🛠️</div>
                      <p className="mt-2 text-xs">
                        Skills
                      </p>
                    </button>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        openApp("contact");
                      }}
                      className="text-center transition hover:scale-110"
                    >
                      <div className="text-3xl">📇</div>
                      <p className="mt-2 text-xs">
                        Contact
                      </p>
                    </button>
                  </div>

                  {/* PROJECTS */}
                  {windows.projects.open && (
                    <ProjectsWindow
                      projects={projects}
                      selectedProject={selectedProject}
                      onSelectProject={(name) => {
                        setSelectedProject(name);
                        focusWindow("projects");
                      }}
                      onBack={() => {
                        setSelectedProject(null);
                      }}
                      onClose={() => {
                        closeApp("projects");
                      }}
                      onMinimize={() => {
                        minimizeApp("projects");
                      }}
                      onMaximize={() => {
                        toggleMaximize("projects");
                      }}
                      onFocus={() => {
                        focusWindow("projects");
                      }}
                      isMaximized={
                        windows.projects.maximized
                      }
                      isMinimized={
                        windows.projects.minimized
                      }
                      isActive={
                        activeWindow === "projects"
                      }
                      minimizedOffset={
                        minimizedOffsets.projects
                      }
                    />
                  )}

                  {/* TERMINAL */}
                  {windows.terminal.open && (
                    <Terminal
                      onClose={() => {
                        closeApp("terminal");
                      }}
                      onMinimize={() => {
                        minimizeApp("terminal");
                      }}
                      onMaximize={() => {
                        toggleMaximize("terminal");
                      }}
                      onFocus={() => {
                        focusWindow("terminal");
                      }}
                      isMaximized={
                        windows.terminal.maximized
                      }
                      isMinimized={
                        windows.terminal.minimized
                      }
                      isActive={
                        activeWindow === "terminal"
                      }
                      minimizedOffset={
                        minimizedOffsets.terminal
                      }
                    />
                  )}

                  {/* ABOUT */}
                  {windows.about.open && (
                    <AboutWindow
                      onClose={() => {
                        closeApp("about");
                      }}
                      onMinimize={() => {
                        minimizeApp("about");
                      }}
                      onMaximize={() => {
                        toggleMaximize("about");
                      }}
                      onFocus={() => {
                        focusWindow("about");
                      }}
                      isMaximized={
                        windows.about.maximized
                      }
                      isMinimized={
                        windows.about.minimized
                      }
                      isActive={
                        activeWindow === "about"
                      }
                      minimizedOffset={
                        minimizedOffsets.about
                      }
                    />
                  )}

                  {/* SKILLS */}
                  {windows.skills.open && (
                    <SkillsWindow
                      onClose={() => {
                        closeApp("skills");
                      }}
                      onMinimize={() => {
                        minimizeApp("skills");
                      }}
                      onMaximize={() => {
                        toggleMaximize("skills");
                      }}
                      onFocus={() => {
                        focusWindow("skills");
                      }}
                      isMaximized={
                        windows.skills.maximized
                      }
                      isMinimized={
                        windows.skills.minimized
                      }
                      isActive={
                        activeWindow === "skills"
                      }
                      minimizedOffset={
                        minimizedOffsets.skills
                      }
                    />
                  )}

                  {/* RESUME */}
                  {windows.resume.open && (
                    <ResumeWindow
                      onClose={() => {
                        closeApp("resume");
                      }}
                      onMinimize={() => {
                        minimizeApp("resume");
                      }}
                      onMaximize={() => {
                        toggleMaximize("resume");
                      }}
                      onFocus={() => {
                        focusWindow("resume");
                      }}
                      isMaximized={
                        windows.resume.maximized
                      }
                      isMinimized={
                        windows.resume.minimized
                      }
                      isActive={
                        activeWindow === "resume"
                      }
                      minimizedOffset={
                        minimizedOffsets.resume
                      }
                    />
                  )}

                  {/* CONTACT */}
                  {windows.contact.open && (
                    <ContactWindow
                      onClose={() => {
                        closeApp("contact");
                      }}
                      onMinimize={() => {
                        minimizeApp("contact");
                      }}
                      onMaximize={() => {
                        toggleMaximize("contact");
                      }}
                      onFocus={() => {
                        focusWindow("contact");
                      }}
                      isMaximized={
                        windows.contact.maximized
                      }
                      isMinimized={
                        windows.contact.minimized
                      }
                      isActive={
                        activeWindow === "contact"
                      }
                      minimizedOffset={
                        minimizedOffsets.contact
                      }
                    />
                  )}

                  {/* Start Menu */}
                  {showStartMenu && (
                    <StartMenu
                      onProjects={() => {
                        openApp("projects");
                      }}
                      onTerminal={() => {
                        openApp("terminal");
                      }}
                      onResume={() => {
                        openApp("resume");
                      }}
                      onAbout={() => {
                        openApp("about");
                      }}
                      onSkills={() => {
                        openApp("skills");
                      }}
                      onContact={() => {
                        openApp("contact");
                      }}
                      onShutdown={shutdown}
                    />
                  )}

                  {/* Taskbar */}
                  <Taskbar
                    onStart={() => {
                      setShowStartMenu((current) => !current);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Stand */}
          <div className="mx-auto h-20 w-32 bg-zinc-600" />

          {/* Base */}
          <div className="mx-auto h-5 w-56 rounded bg-zinc-500" />
        </div>
      </div>
    </main>
  );
}