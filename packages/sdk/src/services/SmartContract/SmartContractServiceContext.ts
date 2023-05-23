import { createContext } from "react";
import React from "react";
import { SmartContractInstance } from "./SmartContractInstance";
import { ISmartContractClientModel } from "@minteeble/utils";

export interface SmartContractServiceContent {
  getSmartContractInstance: (
    chainName: string,
    id: string,
    connect: boolean
  ) => Promise<SmartContractInstance | null>;

  createSmartContract(
    chainName: string,
    address: string,
    abi: string
  ): Promise<ISmartContractClientModel>;
}

export const SmartContractServiceContext =
  createContext<SmartContractServiceContent>({
    getSmartContractInstance: () => new Promise(() => {}),
    createSmartContract: () => new Promise(() => {}),
  });
