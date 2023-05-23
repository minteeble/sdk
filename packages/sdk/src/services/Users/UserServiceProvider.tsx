import React from "react";
import { UsersService } from "./UsersService";
import { UsersServiceContext } from "./UsersServiceContext";
import { UsersServiceProviderProps } from "./UsersService.types";

export const UsersServiceProvider = (props: UsersServiceProviderProps) => {
  const createProfile = async (userName: string): Promise<string> => {
    return UsersService.instance.createProfile(userName);
  };

  const getProfile = async () => {
    return UsersService.instance.getProfile();
  };

  const updateProfile = async (userName: string) => {
    return UsersService.instance.updateProfile(userName);
  };

  const deleteProfile = async () => {
    return UsersService.instance.deleteProfile();
  };

  return (
    <UsersServiceContext.Provider
      value={{
        createProfile,
        getProfile,
        updateProfile,
        deleteProfile,
      }}
    >
      {props.children}
    </UsersServiceContext.Provider>
  );
};
