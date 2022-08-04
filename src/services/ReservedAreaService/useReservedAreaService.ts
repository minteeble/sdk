import React from "react";
import { ReservedAreaServiceContext } from "./ReservedAreaServiceContext";

export const useReservedAreaService = () => {
  const context = React.useContext(ReservedAreaServiceContext);

  if (typeof context === undefined) {
    throw new Error(
      "`useWalletService` must be within a `WalletServiceProvider`"
    );
  }

  return context;
};
