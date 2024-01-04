import { NavigationRouteClientModel } from "@minteeble/utils";
import { createContext } from "react";
import NavigationService from "./NavigationService";

export interface NavigationServiceContent {}

export const NavigationServiceContext = createContext<NavigationServiceContent>(
  {}
);
