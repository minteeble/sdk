import React from "react";
import { SmartContractServiceProviderProps } from "./SmartContractService.types";
import { SmartContractServiceContext } from "./SmartContractServiceContext";

export const SmartContractServiceProvider = (
  props: SmartContractServiceProviderProps
) => {
  return (
    <SmartContractServiceContext.Provider value={{}}>
      {props.children}
    </SmartContractServiceContext.Provider>
  );
};
