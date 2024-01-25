import { createContext } from "react";

import {
  AppInfoClientModel,
  AppRole,
  ICreateAppResponseDto,
  IGetAppResponseDto,
  UserPreviewClientModel,
} from "@minteeble/utils";

export interface AppsServiceContent {
  createApp: (
    urlName: string,
    displayName: string
  ) => Promise<ICreateAppResponseDto | null>;

  getApp: (urlName: string) => Promise<IGetAppResponseDto | null>;

  deleteApp: (urlName: string) => Promise<void>;

  updateApp: (urlName: string, displayName: string) => Promise<void>;

  getAppAdmins: (urlName: string) => Promise<Array<UserPreviewClientModel>>;

  getAppUsers: (urlName: string) => Promise<Array<UserPreviewClientModel>>;

  getUserApps: () => Promise<AppInfoClientModel[]>;

  addAppAdmin: (urlName: string, adminUserWallet: string) => Promise<void>;

  removeAppAdmin: (urlName: string, adminUserWallet: string) => Promise<void>;

  removeAppUser: (urlName: string, userWallet: string) => Promise<void>;

  joinApp: (urlName: string) => Promise<{ urlName: string } | null>;

  leaveApp: (urlName: string) => Promise<void>;

  getUserRole(): Promise<AppRole>;
}

export const appServiceContext = createContext<AppsServiceContent>({
  createApp: () => new Promise(() => {}),

  getApp: () => new Promise(() => {}),

  deleteApp: () => new Promise(() => {}),

  updateApp: () => new Promise(() => {}),

  getAppAdmins: () => new Promise(() => {}),

  getAppUsers: () => new Promise(() => {}),

  getUserApps: () => new Promise(() => {}),

  addAppAdmin: () => new Promise(() => {}),

  removeAppAdmin: () => new Promise(() => {}),

  removeAppUser: () => new Promise(() => {}),

  joinApp: () => new Promise(() => {}),

  leaveApp: () => new Promise(() => {}),

  getUserRole: () => new Promise(() => {}),
});
