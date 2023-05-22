import React from "react";
import { AuthServiceContext } from "./AuthServiceContext";

export const useAuthService = () => {
  const context = React.useContext(AuthServiceContext);

  if (typeof context === undefined) {
    throw new Error(
      "`useWalletService` must be within a `WalletServiceProvider`"
    );
  }

  return context;
};
