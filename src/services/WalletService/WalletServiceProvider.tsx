import { useState } from "react";
import WalletService from "./WalletService";
import { WalletServiceContext } from "./WalletServiceContext";
import React from "react";

export interface WalletServiceProviderProps {
  children: any;
}

export const WalletServiceProvider = (props: WalletServiceProviderProps) => {
  const [walletService, setWalletService] = useState<WalletService>();

  return (
    <WalletServiceContext.Provider value={walletService}>
      {props.children}
    </WalletServiceContext.Provider>
  );
};
