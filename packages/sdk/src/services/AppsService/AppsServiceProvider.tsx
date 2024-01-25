import { appServiceContext } from "./AppsServiceContext";
import { AppsServiceProviderProps } from "./AppsServiceProvider.types";
import React from "react";

import {
  AppInfoClientModel,
  AppRole,
  ICreateAppResponseDto,
  IGetAppResponseDto,
  UserPreviewClientModel,
} from "@minteeble/utils";
import { AppsService } from "./AppsService";

const AppsServiceProvider = (props: AppsServiceProviderProps) => {
  const createApp = async (
    urlName: string,
    displayName: string
  ): Promise<ICreateAppResponseDto | null> => {
    return await AppsService.instance.createApp(urlName, displayName);
  };

  const getApp = async (
    urlName: string
  ): Promise<IGetAppResponseDto | null> => {
    return await AppsService.instance.getApp(urlName);
  };

  const deleteApp = async (urlName: string): Promise<void> => {
    await AppsService.instance.deleteApp(urlName);
  };

  const updateApp = async (
    urlName: string,
    displayName: string
  ): Promise<void> => {
    await AppsService.instance.updateApp(urlName, displayName);
  };

  const getAppAdmins = async (
    urlName: string
  ): Promise<Array<UserPreviewClientModel>> => {
    return await AppsService.instance.getAppAdmins(urlName);
  };

  const getAppUsers = async (
    urlName: string
  ): Promise<Array<UserPreviewClientModel>> => {
    return await AppsService.instance.getAppUsers(urlName);
  };

  const getUserApps = async (): Promise<AppInfoClientModel[]> => {
    return await AppsService.instance.getUserApps();
  };

  const addAppAdmin = async (
    urlName: string,
    adminUserWallet: string
  ): Promise<void> => {
    await AppsService.instance.addAppAdmin(urlName, adminUserWallet);
  };

  const removeAppAdmin = async (
    urlName: string,
    adminUserWallet: string
  ): Promise<void> => {
    await AppsService.instance.removeAppAdmin(urlName, adminUserWallet);
  };

  const removeAppUser = async (
    urlName: string,
    userWallet: string
  ): Promise<void> => {
    await AppsService.instance.removeAppUser(urlName, userWallet);
  };

  const joinApp = async (
    urlName: string
  ): Promise<{ urlName: string } | null> => {
    return await AppsService.instance.joinApp(urlName);
  };

  const leaveApp = async (urlName: string): Promise<void> => {
    await AppsService.instance.leaveApp(urlName);
  };

  const getUserRole = async (): Promise<AppRole> => {
    return await AppsService.instance.getUserRole();
  };

  return (
    <appServiceContext.Provider
      value={{
        createApp,
        getApp,
        deleteApp,
        updateApp,
        getAppAdmins,
        getAppUsers,
        getUserApps,
        addAppAdmin,
        removeAppAdmin,
        removeAppUser,
        joinApp,
        leaveApp,
        getUserRole,
      }}
    >
      {props.children}
    </appServiceContext.Provider>
  );
};

export default AppsServiceProvider;
