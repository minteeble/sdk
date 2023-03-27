import { createContext } from "react";
import React from "react";
import { SmartContractInstance } from "./SmartContractInstance";

export interface SmartContractServiceContent {
  getSmartContractInstance: (
    chainName: string,
    id: string,
    connect: boolean
  ) => Promise<SmartContractInstance | null>;
}

export const SmartContractServiceContext =
  createContext<SmartContractServiceContent>({
    getSmartContractInstance: () => new Promise(() => {}),
  });
