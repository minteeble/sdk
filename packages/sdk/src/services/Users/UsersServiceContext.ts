import { createContext } from "react";
import { UserClientModel } from "@minteeble/utils";

export interface UsersServiceContext {
  createProfile: (userName: string) => Promise<string>;
  getProfile: () => Promise<UserClientModel | null>;
  updateProfile: (userName: string) => Promise<void>;
  deleteProfile: () => Promise<void>;
}

export const UsersServiceContext = createContext<UsersServiceContext>({
  createProfile: () => new Promise(() => {}),
  getProfile: () => new Promise(() => {}),
  updateProfile: () => new Promise(() => {}),
  deleteProfile: () => new Promise(() => {}),
});
