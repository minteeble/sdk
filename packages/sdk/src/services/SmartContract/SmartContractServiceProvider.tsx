import {
  ISmartContractClientModel,
  SmartContractClientModel,
} from "@minteeble/utils";
import React, { useEffect } from "react";
import { useWalletService } from "../WalletService";
import { SmartContractInstance } from "./SmartContractInstance";
import { SmartContractService } from "./SmartContractService";
import { SmartContractServiceProviderProps } from "./SmartContractService.types";
import { SmartContractServiceContext } from "./SmartContractServiceContext";

export const SmartContractServiceProvider = (
  props: SmartContractServiceProviderProps
) => {
  let { walletAddress, web3 } = useWalletService();

  const createSmartContract = async (
    chianName: string,
    address: string,
    abi: string
  ): Promise<ISmartContractClientModel> => {
    return SmartContractService.instance.createSmartContract(
      chianName,
      address,
      abi
    );
  };

  const getSmartContractInstance = async (
    chainName: string,
    id: string,
    connect: boolean
  ): Promise<SmartContractInstance | null> => {
    return new Promise<SmartContractInstance | null>(
      async (resolve, reject) => {
        try {
          if (connect && !web3) {
            reject("Error. Client is not yet connected to web3.");
            return;
          }

          let smartContractInfo =
            await SmartContractService.instance.getSmartContractInfo(
              chainName,
              id
            );

          let smartContractInstance: SmartContractInstance | null =
            new SmartContractInstance(smartContractInfo || undefined, web3);

          if (connect && smartContractInstance) {
            await smartContractInstance.connect();
          }

          resolve(smartContractInstance);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      }
    );
  };

  const updateSmartContractAbi = (
    chainName: string,
    id: string,
    abi: any
  ): Promise<void> => {
    return SmartContractService.instance.updateSmartContractAbi(
      chainName,
      id,
      abi
    );
  };

  const deleteSmartContract = async (
    id: string,
    chainName: string
  ): Promise<void> => {
    return await SmartContractService.instance.deleteSmartContract(
      id,
      chainName
    );
  };

  const getOwnedSmartContracts = async (
    chainName: string
  ): Promise<Array<SmartContractClientModel>> => {
    return await SmartContractService.instance.getOwnedSmartContracts(
      chainName
    );
  };

  return (
    <SmartContractServiceContext.Provider
      value={{
        getSmartContractInstance,
        createSmartContract,
        updateSmartContractAbi,
        deleteSmartContract,
        getOwnedSmartContracts,
      }}
    >
      {props.children}
    </SmartContractServiceContext.Provider>
  );
};
