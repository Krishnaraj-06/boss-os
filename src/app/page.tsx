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
    useState<Record<AppName, WindowState>>(initialWindows);

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
        <div className="absolute left-5 top-5 z-10 sm:left-8 sm:top-8">
          <div className="border border-zinc-700/80 bg-zinc-950/80 px-4 py-3 shadow-[0_0_30px_rgba(94,234,212,0.08)] backdrop-blur-sm sm:px-5">
            <p className="font-mono text-lg font-semibold tracking-[0.18em] text-zinc-100 sm:text-xl">
              KRISHNARAJ SINGH
            </p>

            <div className="mt-1 h-px w-full bg-zinc-800" />

            <p className="mt-2 font-mono text-[10px] tracking-[0.26em] text-zinc-400 sm:text-xs">
              ENGINEERING STUDENT · BUILDER
            </p>

            <p className="mt-2 font-mono text-[8px] tracking-[0.28em] text-zinc-600">
              BOSS.OS // PERSONAL SYSTEM
            </p>
          </div>
        </div>
      )}

      {/* Computer */}
      <div className="flex min-h-screen w-full items-center justify-center px-3 sm:px-5">
        <div className="relative w-[600px] max-w-[92vw]">
          {/* Monitor */}
          <div
            onClick={() => {
              if (!isBooting) {
                setIsBooting(true);
              }
            }}
            className="group block h-[300px] w-full cursor-pointer rounded-2xl border-4 border-zinc-700 bg-zinc-800 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.68)] transition duration-300 hover:scale-[1.01] hover:border-zinc-600 hover:shadow-[0_35px_120px_rgba(0,0,0,0.8)] sm:h-[350px] sm:border-[6px] sm:p-4 md:h-[400px] md:border-8 md:p-5"
          >
            <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#020812] shadow-[inset_0_0_60px_rgba(94,234,212,0.04)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.08),transparent_58%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.35)_3px)]" />

              {!isBooting && (
                <div className="relative z-10 max-w-md px-5 text-center font-mono">
                  <p className="text-[11px] tracking-[0.42em] text-zinc-500">
                    KRISHNARAJ SINGH
                  </p>

                  <p className="mt-5 text-[11px] tracking-[0.32em] text-emerald-300/80">
                    ENGINEERING STUDENT · BUILDER
                  </p>

                  <div className="mt-6 h-px w-20 bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />

                  <p className="mt-6 text-2xl font-semibold tracking-[0.28em] text-zinc-100 sm:text-3xl">
                    BOSS.OS
                  </p>

                  <p className="mt-5 text-[10px] leading-6 tracking-[0.16em] text-zinc-500 sm:text-[11px]">
                    BUILDING PRACTICAL SOFTWARE, AI SYSTEMS,
                    <br /> DATA-DRIVEN TOOLS, AND ENGINEERING PROJECTS.
                  </p>

                  <button
                    type="button"
                    className="mt-7 inline-flex items-center gap-3 border border-zinc-600/80 bg-zinc-950/80 px-5 py-2.5 text-[9px] tracking-[0.34em] text-zinc-200 transition hover:border-emerald-400/70 hover:text-emerald-200"
                  >
                    ENTER SYSTEM
                    <span className="text-base text-emerald-300">→</span>
                  </button>
                </div>
              )}

              {isBooting && !isDesktop && (
                <div className="relative z-10 w-[82%] max-w-xs font-mono">
                  <p className="mb-4 text-center text-[11px] tracking-[0.36em] text-zinc-400">
                    KRISHNARAJ SINGH
                  </p>

                  <p className="mb-7 text-center text-2xl tracking-[0.28em] text-zinc-100">
                    BOSS.OS
                  </p>

                  <div className="space-y-2 text-[10px] text-zinc-500">
                    <p>[ OK ] Initializing personal system</p>
                    <p>[ OK ] Loading engineering profile</p>
                    <p>[ OK ] Mounting project stack</p>
                    <p>[ OK ] Starting user session</p>
                  </div>

                  <div className="mt-6 h-1.5 overflow-hidden border border-zinc-800 bg-zinc-950">
                    <div className="h-full w-1/2 animate-pulse bg-gradient-to-r from-emerald-400 via-zinc-200 to-emerald-400" />
                  </div>

                  <p className="mt-4 text-center text-[9px] tracking-[0.28em] text-zinc-500">
                    BOOTING...
                  </p>
                </div>
              )}

              {isDesktop && (
                <div
                  key={desktopRefreshKey}
                  ref={desktopRef}
                  className="relative h-full w-full overflow-hidden bg-[#040b13] pb-10 text-left"
                  onClick={() => {
                    setShowStartMenu(false);
                    closeContextMenu();
                    setSelectedDesktopApp(null);
                  }}
                  onContextMenu={showDesktopContextMenu}
                >
                  {/* Retro Desktop Background */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.045),transparent_55%)]" />
                  <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:repeating-linear-gradient(0deg,transparent,transparent_2px,white_3px)]" />

                  {/* Desktop Header */}
                  <div className="relative z-10 flex h-12 items-center justify-between border-b border-zinc-800/90 bg-zinc-950/85 px-3 backdrop-blur-sm sm:px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded border border-zinc-700 bg-zinc-900 text-xs shadow-inner">
                        ◈
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-mono text-xs font-semibold tracking-[0.18em] text-zinc-200">
                            BOSS.OS
                          </p>
                          <span className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-[7px] tracking-wider text-zinc-600">
                            v1.0
                          </span>
                        </div>

                        <p className="mt-0.5 font-mono text-[8px] tracking-widest text-zinc-600">
                          PERSONAL ENGINEERING SYSTEM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded border border-zinc-800 bg-zinc-900/70 px-2 py-1 font-mono text-[8px] tracking-wider text-zinc-500">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                      ONLINE
                    </div>
                  </div>

                  {/* Desktop Workspace */}
                  <div className="relative z-10 grid grid-cols-3 gap-x-2 gap-y-3 p-3 sm:gap-x-5 sm:gap-y-4 sm:p-4 md:gap-x-7 md:gap-y-5 md:p-5">
                    {desktopApps.map((app) => {
                      const isSelected = selectedDesktopApp === app.name;
                      const isOpen = windows[app.name].open;

                      return (
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
                            showAppContextMenu(event, app.name);
                          }}
                          className={`group flex h-[122px] w-full max-w-24 flex-col items-center justify-start rounded-lg border px-2 py-2.5 text-center transition-all duration-150 ${
                            isSelected
                              ? "border-zinc-600 bg-zinc-800/75 shadow-[0_0_24px_rgba(255,255,255,0.04)]"
                              : "border-transparent hover:border-zinc-800 hover:bg-zinc-900/70"
                          }`}
                        >
                          <div
                            className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-zinc-950 text-2xl shadow-lg transition-all duration-150 sm:h-13 sm:w-13 ${
                              isSelected
                                ? "border-zinc-500 shadow-[0_0_18px_rgba(255,255,255,0.06)]"
                                : "border-zinc-800 group-hover:-translate-y-0.5 group-hover:border-zinc-600"
                            }`}
                          >
                            {app.icon}

                            {isOpen && (
                              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full border border-zinc-950 bg-green-500" />
                            )}
                          </div>

                          <p
                            className={`mt-2 text-[11px] font-medium ${
                              isSelected
                                ? "text-white"
                                : "text-zinc-300 group-hover:text-zinc-100"
                            }`}
                          >
                            {app.label}
                          </p>

                          <p className="mt-1 max-w-20 truncate text-[7px] tracking-wide text-zinc-600">
                            {app.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Desktop Status */}
                  <div className="pointer-events-none absolute bottom-10 left-3 right-3 z-10 flex items-center justify-between border-t border-zinc-800/60 pt-2 font-mono text-[7px] tracking-widest text-zinc-700 sm:left-4 sm:right-4">
                    <span>USER: KRISHNARAJ</span>

                    <span className="hidden sm:inline">
                      DOUBLE-CLICK TO OPEN
                    </span>

                    <span>SYS: READY</span>
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
                            BOSS.OS v1.0
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
                              v1.0
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
          <div className="mx-auto h-16 w-24 bg-zinc-700 sm:h-20 sm:w-32" />

          {/* Base */}
          <div className="mx-auto h-4 w-44 rounded bg-zinc-600 sm:h-5 sm:w-56" />
        </div>
      </div>
    </main>
  );
}