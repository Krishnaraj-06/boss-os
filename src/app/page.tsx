"use client";

import { useEffect, useRef, useState } from "react";
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

type ContextMenuState = {
  visible: boolean;
  x: number;
  y: number;
  app: AppName | null;
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

const desktopApps: {
  name: AppName;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    name: "projects",
    label: "Projects",
    icon: "📁",
    description: "Project archive",
  },
  {
    name: "terminal",
    label: "Terminal",
    icon: "💻",
    description: "Command shell",
  },
  {
    name: "resume",
    label: "Resume",
    icon: "📄",
    description: "Resume.pdf",
  },
  {
    name: "about",
    label: "About",
    icon: "👤",
    description: "Profile",
  },
  {
    name: "skills",
    label: "Skills",
    icon: "🛠️",
    description: "Tech stack",
  },
  {
    name: "contact",
    label: "Contact",
    icon: "📇",
    description: "Connect",
  },
];

export default function Home() {
  const [isBooting, setIsBooting] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const [showStartMenu, setShowStartMenu] = useState(false);

  const [windows, setWindows] =
    useState<Record<AppName, WindowState>>(
      initialWindows
    );

  const [activeWindow, setActiveWindow] =
    useState<AppName | null>(null);

  const [selectedProject, setSelectedProject] =
    useState<string | null>(null);

  const [selectedDesktopApp, setSelectedDesktopApp] =
    useState<AppName | null>(null);

  const [contextMenu, setContextMenu] =
    useState<ContextMenuState>({
      visible: false,
      x: 0,
      y: 0,
      app: null,
    });

  const [desktopRefreshKey, setDesktopRefreshKey] =
    useState(0);

  const [showSystemInfo, setShowSystemInfo] =
    useState(false);

  const desktopRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isBooting) return;

    const timer = setTimeout(() => {
      setIsDesktop(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isBooting]);

  const closeContextMenu = () => {
    setContextMenu((current) => ({
      ...current,
      visible: false,
    }));
  };

  const openApp = (app: AppName) => {
    setShowStartMenu(false);
    closeContextMenu();

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

    closeContextMenu();
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

    closeContextMenu();
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
    closeContextMenu();
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
  const handleTaskbarWindowClick = (app: AppName) => {
  if (activeWindow === app && !windows[app].minimized) {
    minimizeApp(app);
    return;
  }

  focusWindow(app);
};

  const closeAllWindows = () => {
    setWindows(initialWindows);
    setActiveWindow(null);
    setSelectedProject(null);
    setShowStartMenu(false);
    closeContextMenu();
    setShowSystemInfo(false);
  };

  const shutdown = () => {
    closeAllWindows();
    setIsDesktop(false);
    setIsBooting(false);
  };

  const showDesktopContextMenu = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    const rect =
      desktopRef.current?.getBoundingClientRect();

    if (!rect) return;

    setShowStartMenu(false);

    setContextMenu({
      visible: true,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      app: null,
    });
  };

  const showAppContextMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    app: AppName
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const rect =
      desktopRef.current?.getBoundingClientRect();

    if (!rect) return;

    setShowStartMenu(false);

    setContextMenu({
      visible: true,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      app,
    });
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white">
      {/* Identity */}
      {!isDesktop && (
        <div className="absolute left-6 top-6 z-10">
          <div className="border border-zinc-800 bg-black px-5 py-2 text-xl font-bold tracking-wide">
            Boss
          </div>

          <div className="mt-1 border border-zinc-900 bg-black px-5 py-2 text-sm text-zinc-400">
            Engineering Student
          </div>
        </div>
      )}

      {/* Computer */}
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="relative w-[600px] max-w-[92vw]">
          {/* Monitor */}
          <div
            onClick={() => {
              if (!isBooting) {
                setIsBooting(true);
              }
            }}
            className="block h-[400px] w-full cursor-pointer rounded-lg border-8 border-zinc-700 bg-zinc-800 p-5 shadow-2xl transition hover:scale-[1.01]"
          >
            <div className="relative flex h-full items-center justify-center overflow-hidden bg-black">
              {/* Initial */}
              {!isBooting && (
                <div className="text-center font-mono">
                  <p className="text-2xl tracking-widest text-zinc-300">
                    BOSS.OS
                  </p>

                  <p className="mt-3 text-[10px] tracking-[0.3em] text-zinc-700">
                    CLICK TO BOOT
                  </p>
                </div>
              )}

              {/* Boot */}
              {isBooting && !isDesktop && (
                <div className="w-64 font-mono">
                  <p className="mb-5 text-center text-xl tracking-widest">
                    BOSS.OS
                  </p>

                  <div className="space-y-2 text-xs text-zinc-500">
                    <p>[ OK ] Initializing system</p>
                    <p>[ OK ] Loading kernel</p>
                    <p>[ OK ] Mounting filesystem</p>
                    <p>[ OK ] Starting user session</p>
                  </div>

                  <p className="mt-5 text-center text-xs text-zinc-400">
                    SYSTEM BOOTING...
                  </p>
                </div>
              )}

              {/* Desktop */}
              {isDesktop && (
                <div
                  key={desktopRefreshKey}
                  ref={desktopRef}
                  className="relative h-full w-full overflow-hidden bg-zinc-900 pb-10 text-left"
                  onClick={() => {
                    setShowStartMenu(false);
                    closeContextMenu();
                    setSelectedDesktopApp(null);
                  }}
                  onContextMenu={showDesktopContextMenu}
                >
                  {/* Desktop Header */}
                  <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/70 px-4 py-2">
                    <div>
                      <p className="font-mono text-xs tracking-widest text-zinc-300">
                        BOSS.OS
                      </p>

                      <p className="mt-0.5 font-mono text-[9px] text-zinc-600">
                        PERSONAL SYSTEM
                      </p>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      ONLINE
                    </div>
                  </div>

                  {/* Desktop Icons */}
                  <div className="grid grid-cols-3 gap-x-5 gap-y-6 p-5">
                    {desktopApps.map((app) => (
                      <button
                        key={app.name}
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedDesktopApp(app.name);
                        }}
                        onDoubleClick={(event) => {
                          event.stopPropagation();
                          openApp(app.name);
                        }}
                        onContextMenu={(event) => {
                          showAppContextMenu(
                            event,
                            app.name
                          );
                        }}
                        className={`group flex w-20 flex-col items-center gap-2 rounded-md px-2 py-3 text-center transition ${
                          selectedDesktopApp === app.name
                            ? "bg-zinc-800/80 ring-1 ring-zinc-600"
                            : "hover:bg-zinc-800/50"
                        }`}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded border border-zinc-800 bg-zinc-950 text-2xl shadow-lg transition group-hover:border-zinc-600">
                          {app.icon}
                        </div>

                        <p className="mt-2 text-xs text-zinc-300 group-hover:text-white">
                          {app.label}
                        </p>

                        <p className="mt-1 text-[8px] text-zinc-600">
                          {app.description}
                        </p>
                      </button>
                    ))}
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
                      onOpenApp={openApp}
                      onCloseApp={closeApp}
                      onMinimizeApp={minimizeApp}
                      onProjects={() => {
                        openApp("projects");
                      }}
                      onAbout={() => {
                        openApp("about");
                      }}
                      onSkills={() => {
                        openApp("skills");
                      }}
                      onResume={() => {
                        openApp("resume");
                      }}
                      onContact={() => {
                        openApp("contact");
                      }}
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

                  {/* Context Menu */}
                  {contextMenu.visible && (
                    <div
                      className="absolute z-[60] w-48 overflow-hidden rounded border border-zinc-700 bg-zinc-950 py-1 font-mono text-xs shadow-2xl"
                      style={{
                        left: `${contextMenu.x}px`,
                        top: `${contextMenu.y}px`,
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      onContextMenu={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                    >
                      {contextMenu.app === null ? (
                        <>
                          <button
                            onClick={() => {
                              setDesktopRefreshKey(
                                (current) => current + 1
                              );
                              closeContextMenu();
                            }}
                            className="w-full px-3 py-2 text-left text-zinc-300 hover:bg-zinc-800 hover:text-white"
                          >
                            ↻ Refresh
                          </button>

                          <button
                            onClick={() => {
                              openApp("terminal");
                            }}
                            className="w-full px-3 py-2 text-left text-zinc-300 hover:bg-zinc-800 hover:text-white"
                          >
                            💻 Open Terminal
                          </button>

                          <button
                            onClick={() => {
                              setShowSystemInfo(true);
                              closeContextMenu();
                            }}
                            className="w-full px-3 py-2 text-left text-zinc-300 hover:bg-zinc-800 hover:text-white"
                          >
                            ℹ System Info
                          </button>

                          <div className="mt-1 border-t border-zinc-800 px-3 py-2 text-[9px] text-zinc-600">
                            BOSS.OS v0.3
                          </div>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              openApp(contextMenu.app!);
                            }}
                            className="w-full px-3 py-2 text-left text-zinc-300 hover:bg-zinc-800 hover:text-white"
                          >
                            ▶ Open{" "}
                            {
                              desktopApps.find(
                                (item) =>
                                  item.name ===
                                  contextMenu.app
                              )?.label
                            }
                          </button>

                          {windows[
                            contextMenu.app
                          ].open && (
                            <>
                              <button
                                onClick={() => {
                                  minimizeApp(
                                    contextMenu.app!
                                  );
                                }}
                                className="w-full px-3 py-2 text-left text-zinc-300 hover:bg-zinc-800 hover:text-white"
                              >
                                ↓ Minimize
                              </button>

                              <button
                                onClick={() => {
                                  closeApp(
                                    contextMenu.app!
                                  );
                                }}
                                className="w-full px-3 py-2 text-left text-zinc-300 hover:bg-zinc-800 hover:text-white"
                              >
                                ✕ Close
                              </button>
                            </>
                          )}

                          <div className="mt-1 border-t border-zinc-800 px-3 py-2 text-[9px] text-zinc-600">
                            BOSS.OS APPLICATION
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* System Info */}
                  {showSystemInfo && (
                    <div
                      className="absolute left-1/2 top-1/2 z-[70] w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded border border-zinc-700 bg-zinc-950 font-mono shadow-2xl"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      onContextMenu={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                    >
                      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span>ℹ️</span>

                          <span className="text-xs text-zinc-200">
                            System Information
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setShowSystemInfo(false);
                          }}
                          className="flex h-6 w-7 items-center justify-center text-zinc-400 hover:bg-red-900 hover:text-white"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="space-y-4 p-5">
                        <div>
                          <p className="text-lg text-zinc-200">
                            BOSS.OS
                          </p>

                          <p className="mt-1 text-[10px] text-zinc-600">
                            Personal Engineering System
                          </p>
                        </div>

                        <div className="space-y-2 border-y border-zinc-800 py-4 text-xs">
                          <div className="flex justify-between">
                            <span className="text-zinc-600">
                              VERSION
                            </span>

                            <span className="text-zinc-300">
                              v0.3
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-zinc-600">
                              STATUS
                            </span>

                            <span className="flex items-center gap-2 text-zinc-300">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              ONLINE
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-zinc-600">
                              APPLICATIONS
                            </span>

                            <span className="text-zinc-300">
                              {desktopApps.length}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-zinc-600">
                              PROJECTS
                            </span>

                            <span className="text-zinc-300">
                              {projects.length}
                            </span>
                          </div>
                        </div>

                        <p className="text-[10px] leading-5 text-zinc-600">
                          BOSS.OS is an interactive
                          engineering portfolio built as a
                          retro operating system.
                        </p>
                      </div>
                    </div>
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
    closeContextMenu();
    setShowStartMenu((current) => !current);
  }}
  windows={windows}
  activeWindow={activeWindow}
  onWindowClick={handleTaskbarWindowClick}
/>
                </div>
              )}
            </div>
          </div>

          {/* Stand */}
          <div className="mx-auto h-20 w-32 bg-zinc-700" />

          {/* Base */}
          <div className="mx-auto h-5 w-56 rounded bg-zinc-600" />
        </div>
      </div>
    </main>
  );
}