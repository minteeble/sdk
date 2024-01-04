import { useEffect, useState } from "react";
import NavigationService from "./NavigationService";
import { NavigationServiceContext } from "./NavigationServiceContext";
import React from "react";

export interface NavigationServiceProviderProps {
  children: any;
}

export const NavigationServiceProvider = (
  props: NavigationServiceProviderProps
) => {
  return (
    <NavigationServiceContext.Provider value={{}}>
      {props.children}
    </NavigationServiceContext.Provider>
  );
};
