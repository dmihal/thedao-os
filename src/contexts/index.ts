import { createContext } from "react";

export const SettingsContext = createContext<any>({});

export interface ProgramState {
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
  taskManager: boolean,
  walletManager: boolean,
}

export interface ProgramMethods {
  onOpen: (program: any, options?: any) => void,
  onClose: (program: any, exit: any) => void,
  moveToTop: (window: string) => void,
  toggleTaskManager: () => void,
  toggleSettings: (show: boolean) => void,
  toggleShutDownMenu: () => void,
  toggleWalletManager: () => void,
  shutDown: () => void,
  onMinimize: (window: string) => void,
  save: (prog: any, data: any, title: string, location?: any) => void
}

export const ProgramContext = createContext<ProgramState & ProgramMethods>({} as any);
