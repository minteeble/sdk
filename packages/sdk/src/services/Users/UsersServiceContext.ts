import { createContext } from "react";
import { UserClientModel, UserPreviewClientModel } from "@minteeble/utils";

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
   * Gets Users profiles
   *
   * @param paginationToken token string paginating all users
   * @returns object containing a list of Users wallet addresses and a pagination token serving as a paginator
   */
  getProfiles: (
    paginationToken?: string
  ) => Promise<Array<UserPreviewClientModel>>;

  /**
   * Gets User's profile's image URL
   *
   * @returns a URL string
   */
  getProfileImageUrl: () => Promise<string | null>;

  /**
   * Gets User's profile's image
   *
   * @returns Image as string or null if an error is encountered
   */
  getProfileImage: () => Promise<string | null>;

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
  getProfiles: () => new Promise(() => {}),
  getProfileImageUrl: () => new Promise(() => {}),
  getProfileImage: () => new Promise(() => {}),
  updateProfile: () => new Promise(() => {}),
  deleteProfile: () => new Promise(() => {}),
});
