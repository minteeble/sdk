import React, { useEffect } from "react";
import { useWalletService } from "../../WalletService";
import { SmartContractInstance } from "./SmartContractInstance";
import { SmartContractService } from "./SmartContractService";
import { SmartContractServiceProviderProps } from "./SmartContractService.types";
import { SmartContractServiceContext } from "./SmartContractServiceContext";

export const SmartContractServiceProvider = (
  props: SmartContractServiceProviderProps
) => {
  let { walletAddress, web3 } = useWalletService();

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

  return (
    <SmartContractServiceContext.Provider value={{ getSmartContractInstance }}>
      {props.children}
    </SmartContractServiceContext.Provider>
  );
};
