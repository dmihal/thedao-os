import { createContext } from "react";

interface ProgramCtx {
  programs: { [key: string]: any },
  startMenu: any,
  desktop: any,
  quickLaunch: { onClick: () => void, icon: string, title: string}[],
  activePrograms: { [key: string]: any },
  openOrder: any[],
  zIndexes: any[],
  settingsDisplay: boolean,
  shutDownMenu: boolean,
  activeId: string | null,

  onOpen: () => void,
  onClose: () => void,
  moveToTop: (window: string) => void,
  toggleTaskManager: () => void,
  toggleSettings: () => void,
  toggleShutDownMenu: () => void,
  shutDown: () => void,
  onMinimize: (window: string) => void,
  save: () => void

}

export const ProgramContext = createContext<ProgramCtx>({} as any);
export const SettingsContext = createContext<any>({});
