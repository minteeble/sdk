import { appServiceContext } from "./AppsServiceContext";
import { AppsServiceProviderProps } from "./AppsServiceProvider.types";
import React from "react";

import {
  AppInfoClientModel,
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
  ): Promise<void> => {};

  const removeAppAdmin = async (
    urlName: string,
    adminUserWallet: string
  ): Promise<void> => {
    await AppsService.instance.removeAppAdmin(urlName, adminUserWallet);
  };

  const joinApp = async (
    urlName: string
  ): Promise<{ urlName: string } | null> => {
    return await AppsService.instance.joinApp(urlName);
  };

  const leaveApp = async (urlName: string): Promise<void> => {
    await AppsService.instance.leaveApp(urlName);
  };

  return (
    <appServiceContext.Provider
      value={{
        createApp,
        getApp,
        deleteApp,
        updateApp,
        getAppUsers,
        getUserApps,
        addAppAdmin,
        removeAppAdmin,
        joinApp,
        leaveApp,
      }}
    >
      {props.children}
    </appServiceContext.Provider>
  );
};

export default AppsServiceProvider;
