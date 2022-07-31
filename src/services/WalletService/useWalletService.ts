import React from "react";
import { WalletServiceContext } from "./WalletServiceContext";

export const useWalletService = () => {
  const context = React.useContext(WalletServiceContext);

  if (context === undefined) {
    throw new Error(
      "`useWalletService` must be within a `WalletServiceProvider`"
    );
  }

  return context;
};
