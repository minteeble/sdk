import React, { useState } from "react";
import {
  WalletServiceProviderContent,
  WalletServiceProviderContentProps,
} from "./WalletServiceProviderContent";

import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import {
  coinbaseWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { NetworkUtils } from "@minteeble/utils";
export interface WalletServiceProviderProps
  extends Omit<
    Omit<WalletServiceProviderContentProps, "wagmiConfig">,
    "queryClient"
  > {
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
  // let providers = [publicProvider()];

  // if (props.alchemyApiKey) {
  //   providers.push(
  //     alchemyProvider({
  //       apiKey: props.alchemyApiKey,
  //     })
  //   );
  // }
  coinbaseWallet.preference = "all";

  const connectors = connectorsForWallets(
    [
      {
        groupName: "Recommended",
        wallets: [
          metaMaskWallet,
          rainbowWallet,
          walletConnectWallet,
          coinbaseWallet,
        ],
      },
    ],
    {
      appName: props.appName ?? "Minteeble App",
      projectId: props.walletConnectProjectId,
    }
  );

  const transports = {};

  NetworkUtils.getAllNetworks().forEach((network) => {
    // @ts-ignore
    transports[network.chainId] = http();
  });

  const [config] = useState(
    createConfig({
      connectors,
      chains: props.chains as any,
      transports,
    })
  );

  const [queryClient] = useState<QueryClient>(new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <WalletServiceProviderContent
            refreshOnChainChange={props.refreshOnChainChange ?? true}
            wagmiConfig={config}
            queryClient={queryClient}
          >
            {props.children}
          </WalletServiceProviderContent>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
