import { appServiceContext } from "./AppsServiceContext";
import { AppsServiceProviderProps } from "./AppsServiceProvider.types";
import React from "react";

const AppsServiceProvider = (props: AppsServiceProviderProps) => {
  const createApp = async () => {};

  const getApp = async () => {};

  const deleteApp = async () => {};

  const updateApp = async () => {};

  const getAppUsers = async () => {};

  const getAppAdmin = async () => {};

  const addAppAdmin = async () => {};

  const removeAppAdmin = async () => {};

  const joinApp = async () => {};

  const leaveApp = async () => {};

  return (
    <appServiceContext.Provider value={{}}>
      {props.children}
    </appServiceContext.Provider>
  );
};

export default AppsServiceProvider;
