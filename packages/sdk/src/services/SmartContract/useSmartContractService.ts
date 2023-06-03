import React from "react";
import { SmartContractServiceContext } from "./SmartContractServiceContext";

export const useSmartContractService = () => {
  const context = React.useContext(SmartContractServiceContext);

  if (typeof context === undefined) {
    throw new Error(
      "`useSmartContractService` must be within a `SmartContractServiceProvider`"
    );
  }

  return context;
};
