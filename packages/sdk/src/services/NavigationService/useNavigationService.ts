import React from "react";
import { NavigationServiceContext } from "./NavigationServiceContext";

export const useNavigationService = () => {
  const context = React.useContext(NavigationServiceContext);

  if (typeof context === undefined) {
    throw new Error(
      "`useNavigationService` must be within a `NavigationServiceProvider`"
    );
  }

  return context;
};
