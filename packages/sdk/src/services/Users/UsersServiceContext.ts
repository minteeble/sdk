import { createContext } from "react";
import { UserClientModel } from "@minteeble/utils";

export interface UsersServiceContext {
  /**
   * Creates a new User's Profile
   *
   * @param userName User's username
   * @returns Username of the created Profile
   */
  createProfile: (userName: string) => Promise<string>;

  /**
   * Gets username and wallet address of a User profile
   *
   * @returns User Client model if found, null otherwise
   */
  getProfile: () => Promise<UserClientModel | null>;

  /**
   * Updates a User profile's username
   *
   * @param userName new username
   */
  updateProfile: (userName: string) => Promise<void>;

  /**
   * Deletes a User profile
   */
  deleteProfile: () => Promise<void>;
}

export const UsersServiceContext = createContext<UsersServiceContext>({
  createProfile: () => new Promise(() => {}),
  getProfile: () => new Promise(() => {}),
  updateProfile: () => new Promise(() => {}),
  deleteProfile: () => new Promise(() => {}),
});
