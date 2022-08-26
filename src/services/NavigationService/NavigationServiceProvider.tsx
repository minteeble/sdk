import { useEffect, useState } from "react";
import NavigationService from "./NavigationService";
import { UserNavigationInfo } from "./NavigationService.types";
import { NavigationServiceContext } from "./NavigationServiceContext";
import React from "react";

export interface NavigationServiceProviderProps {
  children: any;
}

export const NavigationServiceProvider = (
  props: NavigationServiceProviderProps
) => {
  const [navigationService, setNavigationService] =
    useState<NavigationService | null>(null);

  const [userNavigationInfo, setUserNavigationInfo] =
    useState<UserNavigationInfo | null>(null);

  useEffect(() => {
    let service = new NavigationService();

    setNavigationService(service);
  }, []);

  const loadUserNavigationInfo = async (): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        console.log("Navigation service:", navigationService);
        if (navigationService) {
          let navigationInfo =
            await navigationService.getNavigationInfoForGroup("admin_group");

          setUserNavigationInfo(navigationInfo);

          resolve();
        }
      } catch (err) {
        setUserNavigationInfo(null);
        console.log(err);
        reject(err);
      }
    });
  };

  return (
    <NavigationServiceContext.Provider
      value={{ navigationService, userNavigationInfo, loadUserNavigationInfo }}
    >
      {props.children}
    </NavigationServiceContext.Provider>
  );
};
