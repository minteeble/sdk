import React from "react";
import { UsersService } from "./UsersService";
import { UsersServiceContext } from "./UsersServiceContext";
import { UsersServiceProviderProps } from "./UsersService.types";
import { UserClientModel } from "@minteeble/utils";

export const UsersServiceProvider = (props: UsersServiceProviderProps) => {
  const createProfile = async (userName: string): Promise<string> => {
    return UsersService.instance.createProfile(userName);
  };

  const getProfile = async (): Promise<UserClientModel | null> => {
    return UsersService.instance.getProfile();
  };

  const getProfiles = async (): Promise<object> => {
    return UsersService.instance.getProfiles();
  };

  const getProfileImageUrl = async (): Promise<string> => {
    return UsersService.instance.getProfileImageUrl();
  };

  const updateProfile = async (userName: string): Promise<void> => {
    return UsersService.instance.updateProfile(userName);
  };

  const deleteProfile = async (): Promise<void> => {
    return UsersService.instance.deleteProfile();
  };

  return (
    <UsersServiceContext.Provider
      value={{
        createProfile,
        getProfile,
        getProfiles,
        getProfileImageUrl,
        updateProfile,
        deleteProfile,
      }}
    >
      {props.children}
    </UsersServiceContext.Provider>
  );
};
