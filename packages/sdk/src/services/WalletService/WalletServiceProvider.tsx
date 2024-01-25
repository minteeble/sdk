import React from "react";
import {
  WalletServiceProviderContent,
  WalletServiceProviderContentProps,
} from "./WalletServiceProviderContent";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { InjectedConnector } from "wagmi/connectors/injected";

export interface WalletServiceProviderProps
  extends WalletServiceProviderContentProps {
  appName?: string;

  walletConnectProjectId: string;

  alchemyApiKey?: string;

  chains: Array<any>;

  children: any;

  /**
   * If true, the wallet will refresh on chain change
   */
  refreshOnChainChange?: boolean;
}

export const WalletServiceProvider = (props: WalletServiceProviderProps) => {
  let providers = [publicProvider()];

  if (props.alchemyApiKey) {
    providers.push(
      alchemyProvider({
        apiKey: props.alchemyApiKey,
      })
    );
  }

  const { chains, publicClient } = configureChains(
    props.chains || [],
    providers
  );

  const { connectors } = getDefaultWallets({
    appName: props.appName || "Minteeble Sdk Consumer",
    projectId: props.walletConnectProjectId,
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <WalletServiceProviderContent
          refreshOnChainChange={props.refreshOnChainChange ?? true}
        >
          {props.children}
        </WalletServiceProviderContent>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
