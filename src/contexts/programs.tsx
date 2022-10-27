import React, { Component, createContext, useEffect, useState } from "react";
import nanoid from "nanoid";
import * as icons from "../icons";
import * as Applications from "../components/Applications";
import defaultStartMenuData from "../data/start";
import defaultDesktopData from "../data/desktop";
import { ProgramContext, ProgramState } from ".";

const transformLinks = option => ({
  ...option,
  onClick:
    option.href && !option.onClick
      ? e => {
          e.preventDefault();
          if (
            window.confirm(
              `This will open a new tab to ${option.href}, is that okay?`
            )
          ) {
            window.open(option.href);
          }
        }
      : option.onClick
});

const settings = (injectedData = []) => [
  [
    ...injectedData,
    {
      title: "Printers",
      icon: icons.settingsPrinters16.src,
      component: "ExplorerWindow",
      isDisabled: true
    },
    {
      title: "Folder Options",
      icon: icons.folderOptions16.src,
      isDisabled: true
    },
    {
      title: "Active Desktop",
      icon: icons.activeDesktop16.src,
      isDisabled: true
    }
  ],
  {
    title: "Windows Update...",
    icon: icons.windowsUpdate16.src,
    isDisabled: true
  }
];

const startMenu = (injectedData = [], set, shutDown) => [
  {
    title: "Windows Update",
    icon: icons.windowsUpdate24.src,
    isDisabled: true
  },
  [
    ...injectedData,
    {
      title: "Settings",
      icon: icons.settings24.src,
      options: settings(set)
    },
    {
      className: "hideMobileY",
      title: "Help",
      icon: icons.help24.src,
      options: [
        {
          title: "Support Me?",
          icon: icons.htmlFile16.src,
          onClick: () => window.open("https://www.buymeacoffee.com/padraig")
        }
      ]
    },
    {
      className: "hideMobileY",
      title: "Run...",
      icon: icons.run24.src,
      options: []
    }
  ],
  {
    title: "Log Off",
    icon: icons.logOff24.src,
    isDisabled: true
  },
  {
    title: "Shut Down...",
    icon: icons.shutDown24.src,
    onClick: shutDown
  }
];

export const addIdsToData = data =>
  Array.isArray(data)
    ? data.map(d => {
        if (Array.isArray(d)) {
          return addIdsToData(d);
        }
        return {
          ...transformLinks(d),
          id: d.id || nanoid(),
          options: addIdsToData(d.options)
        };
      })
    : undefined;

const desktopWithIds = (desktopData = []) =>
  addIdsToData(desktopData).map(entry => {
    const { onClick, ...data } = entry;
    return {
      ...data,
      onDoubleClick: onClick
    };
  });

const mapActions = (open, doubleClick?: boolean) => entry => {
  if (Array.isArray(entry)) {
    return initialize(open, entry);
  }
  const { onClick, ...nestedData } = entry;
  const onClickAction = !entry.options
    ? (...params) => {
        if (Applications[entry.component]) {
          open(entry);
        }
        if (entry.onClick) {
          entry.onClick(...params);
        }
        if (entry.onDoubleClick) {
          entry.onDoubleClick(...params);
        }
      }
    : undefined;
  return {
    ...nestedData,
    onClick: !doubleClick ? onClickAction : undefined,
    onDoubleClick: doubleClick ? onClick : undefined,
    options: initialize(open, entry.options)
  };
};

export const initialize = (open, data, doubleClick?: boolean) => {
  const mapFunc = mapActions(open, doubleClick);
  return Array.isArray(data) ? data.map(mapFunc) : undefined;
};

const buildDesktop = (desktopData, open) => [
  ...initialize(p => open()(p), desktopWithIds(desktopData)).map(entry => {
    const { onClick, ...data } = entry;
    return {
      ...data,
      onDoubleClick: onClick
    };
  })
];

interface ProgramProviderProps {
  desktopData: any,
  startMenuData: any,
  children: React.ReactNode,
}

const ProgramProvider = ({
  startMenuData = defaultStartMenuData,
  desktopData = defaultDesktopData,
  ...props
}: ProgramProviderProps) => {
  const [state, setState] = useState<ProgramState>({
    activeId: null,
    programs: Object.keys(Applications).reduce(
      (acc, p) => ({
        ...acc,
        [p]: { ...Applications[p], programId: nanoid() }
      }),
      {}
    ),
    startMenu: initialize(
      p => open(p),
      addIdsToData(
        startMenu(
          startMenuData,
          [
            { title: "Ctrl+Alt+Del", onClick: () => toggleTaskManager() },
            {
              title: "Control Panel",
              onClick: () => toggleSettings(),
              icon: icons.controlPanel16.src
            },
            {
              title: 'Wallet Manager',
              onClick: () => toggleWalletManager(true),
              icon: icons.metamask16.src,
            },
          ],
          () => toggleShutDownMenu()
        )
      )
    ),
    desktop: buildDesktop(desktopData, () => open),
    quickLaunch: [
      {
        onClick: () => minimizeAll(),
        icon: icons.activeDesktop16.src,
        title: "Display Desktop"
      }
    ],
    activePrograms: {},
    openOrder: [],
    zIndexes: [],
    settingsDisplay: false,
    shutDownMenu: false,
    taskManager: false,
    walletManager: false,
  })

  useEffect(() => {
    const desktopSaved = JSON.parse(window.localStorage.getItem("desktop"));
    if (desktopSaved) {
      setState((currentState) => ({
        ...currentState,
        desktop: buildDesktop(desktopSaved, () => open)
      }));
    }
  }, []);

  const toggleShutDownMenu = () =>
    setState(currentState => ({ ...currentState, shutDownMenu: !state.shutDownMenu }));
  const toggleTaskManager = () =>
    setState(currentState => ({ ...currentState, taskManager: !state.taskManager }));
  const toggleSettings = (val?: boolean) =>
    setState(currentState => ({ ...currentState,
      settingsDisplay: val || !state.settingsDisplay
    }));
  const toggleWalletManager = (val?: boolean) =>
    setState(currentState => ({
      ...currentState,
      walletManager: val || !state.walletManager
    }));


  const shutDown = () => {
    const desktop = document.querySelector(".desktop");
    if (desktop) {
      desktop.innerHTML = "";
      desktop.classList.add("windowsShuttingDown");
      setTimeout(() => {
        desktop.classList.replace(
          "windowsShuttingDown",
          "itIsNowSafeToTurnOffYourComputer"
        );
        window.localStorage.removeItem("loggedIn");
      }, 3000);
    }
  };

  const isProgramActive = programId =>
    state.activePrograms[programId];

  const moveToTop = windowId => {
    setState(currentState => ({
      ...currentState,
      activePrograms: {
        ...currentState.activePrograms,
        [windowId]: {
          ...currentState.activePrograms[windowId],
          minimized: false,
        },
      },
      activeId: windowId,
      zIndexes: [
        ...currentState.zIndexes.filter(v => v !== windowId),
        windowId,
      ],
    }));
  };

  const open = (program, options: any = {}) => {
    // @todo use id instead to avoid weird open handling
    // @todo rename launch to handle multi-window programs
    if (!Applications[program.component]) {
      return;
    }
    if (isProgramActive(program.id) && !program.multiInstance) {
      moveToTop(program.id);
      return;
    }
    const newProgram = {
      ...program,
      id: nanoid(),
      data: options.new ? {} : program.data,
      title: options.new ? program.component : program.title
    };
    setState(currentState => ({
      ...currentState,
      activePrograms: {
        ...currentState.activePrograms,
        [newProgram.id]: newProgram,
      },
      openOrder: [...currentState.openOrder, newProgram.id],
      zIndexes: [ ...currentState.zIndexes, newProgram.id],
      activeId: newProgram.id
    }));
  };

  const close = (program, shouldExit) => {
    if (!isProgramActive(program.id)) {
      return;
    }
    const taskBar = state.openOrder.filter(p => p !== program.id);
    setState(currentState => ({
      ...currentState,
      openOrder: taskBar,
      zIndexes: currentState.zIndexes.filter(p => p !== program.id),
    }));

    if (!program.background || shouldExit) {
      exit(program.id);
    }
  };

  const exit = programId =>
    setState(currentState => ({
      ...currentState,
      activePrograms: Object.keys(state.activePrograms).reduce((acc, val) => {
        if (programId !== val) {
          return {
            ...acc,
            [val]: currentState.activePrograms[val],
          }
        }
        return acc;
      }, {}),
      activeId: null,
    }));

  const minimize = programId => {
    if (!state.activePrograms[programId]) {
      return;
    } else {
      setState(currentState => ({
        ...currentState,
        activePrograms: {
          ...state.activePrograms,
          [programId]: {
            ...state.activePrograms[programId],
            minimized: true,
          },
        },
        activeId: null
      }));
    }
  };
  const minimizeAll = () =>
    setState(currentState => ({
      ...currentState,
      activePrograms: Object.keys(currentState.activePrograms).reduce((acc, val) => ({
        ...currentState.activePrograms,
        [val]: {
          ...currentState.activePrograms[val],
          minimized: true,
        }
      }), {}),
      activeId: null
    }));

  const save = (prog, data, title, location: 'desktop' | 'startMenu' = "desktop") => {
    const mapFunc = mapActions(open, location === "desktop");
    const existing = state[location].find(
      p => p.title === title || p.id === prog.id
    );
    if (existing) {
      return setState(
        // @ts-ignore
        state => {
          const filtered = state[location].filter(
            p => p.title !== existing.title
          );
          const updated = {
            ...existing,
            data,
            updated: true
          };
          return {
            [location]: [
              ...filtered,
              mapFunc({
                ...updated,
                onClick: () => open(updated)
              })
            ]
          };
        },
        // () => this.saveLocally(location)
      );
    } else {
      const newProg = {
        ...prog,
        data: {
          ...data,
          readOnly: false
        },
        title,
        newFile: true,
        id: nanoid(),
        readOnly: false
      };
      return setState(
        // @ts-ignore
        currentState => ({
          ...currentState,
          [location]: [
            ...currentState[location],
            {
              ...mapFunc({
                ...newProg,
                onClick: () => open(newProg)
              })
            }
          ]
        }),
        // () => saveLocally(location)
      );
    }
  };

  const saveLocally = loc =>
    window.localStorage.setItem(loc, JSON.stringify(state[loc]));

  return (
    <ProgramContext.Provider
      value={{
        ...state,
        onOpen: open,
        onClose: close,
        moveToTop: moveToTop,
        toggleTaskManager: toggleTaskManager,
        toggleSettings: toggleSettings,
        toggleShutDownMenu: toggleShutDownMenu,
        toggleWalletManager: toggleWalletManager,
        shutDown: shutDown,
        onMinimize: minimize,
        save: save
      }}
    >
      {props.children}
    </ProgramContext.Provider>
  );
}

export default ProgramProvider;
