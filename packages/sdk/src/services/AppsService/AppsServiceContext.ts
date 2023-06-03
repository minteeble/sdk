import { createContext } from "react";

export interface AppsServiceContent {}

export const appServiceContext = createContext<AppsServiceContent>({});
