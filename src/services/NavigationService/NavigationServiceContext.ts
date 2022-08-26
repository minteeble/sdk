import { NavigationRouteClientModel } from "@minteeble/utils";
import { createContext } from "react";
import NavigationService from "./NavigationService";
import { UserNavigationInfo } from "./NavigationService.types";

export interface NavigationServiceContent {
  navigationService: NavigationService | null;
  userNavigationInfo: UserNavigationInfo | null;
  loadUserNavigationInfo: () => Promise<void>;
}

export const NavigationServiceContext = createContext<NavigationServiceContent>(
  {
    navigationService: null,
    userNavigationInfo: null,
    loadUserNavigationInfo: () => new Promise<void>(() => {}),
  }
);
