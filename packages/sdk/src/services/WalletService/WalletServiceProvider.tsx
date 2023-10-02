import React from "react";
import {
  WalletServiceProviderContent,
  WalletServiceProviderContentProps,
} from "./WalletServiceProviderContent";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

export interface WalletServiceProviderProps
  extends WalletServiceProviderContentProps {
  appName?: string;
  walletConnectProjectId: string;
  chains: Array<any>;

  children: any;
}

export const WalletServiceProvider = (props: WalletServiceProviderProps) => {
  const { chains, publicClient } = configureChains(props.chains || [], [
    publicProvider(),
  ]);

  const { connectors } = getDefaultWallets({
    appName: props.appName || "Minteeble Sdk Consumer",
    projectId: props.walletConnectProjectId,
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  console.log("Setting config:", wagmiConfig);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <WalletServiceProviderContent>
          {props.children}
        </WalletServiceProviderContent>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
