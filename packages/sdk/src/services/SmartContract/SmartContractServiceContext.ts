import { createContext } from "react";
import React from "react";
import { SmartContractInstance } from "./SmartContractInstance";
import {
  ISmartContractClientModel,
  SmartContractClientModel,
} from "@minteeble/utils";

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

  /**
   * Set new smart contract abi
   *
   * @param chainName Netowrk chain name
   * @param id Smart contract id
   * @param abi Smart contract abi
   */
  updateSmartContractAbi(
    chainName: string,
    id: string,
    abi: any
  ): Promise<void>;

  deleteSmartContract(id: string, chainName: string): Promise<void>;

  getOwnedSmartContracts(
    chainName: string
  ): Promise<Array<SmartContractClientModel>>;
}

export const SmartContractServiceContext =
  createContext<SmartContractServiceContent>({
    getSmartContractInstance: () => new Promise(() => {}),
    createSmartContract: () => new Promise(() => {}),
    updateSmartContractAbi: () => new Promise(() => {}),
    deleteSmartContract: () => new Promise(() => {}),
    getOwnedSmartContracts: () => new Promise(() => {}),
  });
