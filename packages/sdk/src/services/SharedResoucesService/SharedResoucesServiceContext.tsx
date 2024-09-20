import { createContext } from "react";

export interface SharedResoucesServiceContent {
  urlCaller(url: string): Promise<any | null>;
}

export const sharedResoucesServiceContext =
  createContext<SharedResoucesServiceContent>({
    urlCaller: async () => null,
  });
