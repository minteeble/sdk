import React, { useEffect, useState } from "react";
import {
  WalletServiceProviderContent,
  WalletServiceProviderContentProps,
} from "./WalletServiceProviderContent";

import {
  connectorsForWallets,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Config, Storage, WagmiProvider, createConfig, http } from "wagmi";
import {
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { coinbaseWallet } from "wagmi/connectors";
export interface WalletServiceProviderProps
  extends Omit<
    Omit<WalletServiceProviderContentProps, "wagmiConfig">,
    "queryClient"
  > {
  appName?: string;

  appIcon?: string;

  walletConnectProjectId: string;

  alchemyApiKey?: string;

  chains: Array<any>;

  children: any;

  config?: Config;

  modal?: "rainbowkit" | "onchainkit";

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

  //States
  // const tTmp = {};
  // const localStorage: Storage = {
  //   key: "wagmi-info",
  //   getItem: async (key) => {
  //     const value = window.localStorage.getItem(key);
  //     return value ? JSON.parse(value) : null;
  //   },
  //   setItem: async (key, value) => {
  //     window.localStorage.setItem(key, JSON.stringify(value));
  //   },
  //   removeItem: async (key) => {
  //     window.localStorage.removeItem(key);
  //   },
  // };

  // props.chains.forEach((network) => {
  //   // @ts-ignore
  //   tTmp[network.id] = http();
  // });
  // coinbaseWallet.preference = "all";

  // const [connectors, setConnectors] = useState<any>(
  //   connectorsForWallets(
  //     [
  //       {
  //         groupName: "Recommended",
  //         wallets: [
  //           metaMaskWallet,
  //           rainbowWallet,
  //           walletConnectWallet,
  //           coinbaseWallet,
  //         ],
  //       },
  //     ],
  //     {
  //       appName: props.appName ?? "Minteeble App",
  //       appIcon: props.appIcon,
  //       projectId: props.walletConnectProjectId,
  //     }
  //   )
  // );
  // const [transports, setTransports] = useState<any>(tTmp);
  const [config, setConfig] = useState<any>(
    props.config ||
      (!props.modal || props.modal === "rainbowkit"
        ? getDefaultConfig({
            appName: props.appName ?? "Minteeble App",
            projectId: props.walletConnectProjectId,
            chains: props.chains as any,
          })
        : createConfig({
            chains: props.chains as any,
            connectors: [
              coinbaseWallet({
                appName: props.appName ?? "Minteeble App",
                appLogoUrl: props.appIcon,
              }),
            ],
            ssr: false,
            transports: {
              [props.chains[0].id]: http(),
            },
          }))
  );

  const [queryClient] = useState<QueryClient>(new QueryClient());

  //Effects
  // useEffect(() => {
  //   // coinbaseWallet.preference = "all";

  //   const tmp = connectorsForWallets(
  //     [
  //       {
  //         groupName: "Recommended",
  //         wallets: [
  //           metaMaskWallet,
  //           rainbowWallet,
  //           walletConnectWallet,
  //           coinbaseWallet,
  //         ],
  //       },
  //     ],
  //     {
  //       appName: props.appName ?? "Minteeble App",
  //       appIcon: props.appIcon,
  //       projectId: props.walletConnectProjectId,
  //     }
  //   );
  //   setConnectors(tmp);
  // }, []);

  // useEffect(() => {
  //   const tmp = {};

  //   props.chains.forEach((network) => {
  //     // @ts-ignore
  //     tmp[network.id] = http();
  //   });

  //   setTransports(tmp);
  // }, [props.chains]);

  // useEffect(() => {
  //   if (transports) {
  //     setConfig(
  //       createConfig({
  //         connectors,
  //         storage: localStorage,
  //         chains: props.chains as any,
  //         transports,
  //       })
  //     );
  //   }
  // }, [transports]);

  return !props.modal || props.modal === "rainbowkit" ? (
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
  ) : (
    <OnchainKitProvider
      apiKey="WQagHVilxCnEkX0NGuVtE8SY6B5hSLp4"
      chain={props.chains[0]}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <WalletServiceProviderContent
            refreshOnChainChange={props.refreshOnChainChange ?? true}
            wagmiConfig={config}
            queryClient={queryClient}
          >
            {props.children}
          </WalletServiceProviderContent>
        </QueryClientProvider>
      </WagmiProvider>
    </OnchainKitProvider>
  );
};
