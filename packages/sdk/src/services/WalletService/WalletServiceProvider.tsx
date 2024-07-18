import React, { useEffect, useState } from "react";
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
  const tTmp = {};

  props.chains.forEach((network) => {
    // @ts-ignore
    tTmp[network.id] = http();
  });
  coinbaseWallet.preference = "all";

  const [connectors, setConnectors] = useState<any>(
    connectorsForWallets(
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
        appIcon: props.appIcon,
        projectId: props.walletConnectProjectId,
      }
    )
  );
  const [transports, setTransports] = useState<any>(tTmp);
  const [config, setConfig] = useState<any>(
    createConfig({
      connectors,
      chains: props.chains as any,
      transports,
    })
  );

  const [queryClient] = useState<QueryClient>(new QueryClient());

  //Effects
  useEffect(() => {
    coinbaseWallet.preference = "all";

    const tmp = connectorsForWallets(
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
        appIcon: props.appIcon,
        projectId: props.walletConnectProjectId,
      }
    );
    setConnectors(tmp);
  }, []);

  useEffect(() => {
    const tmp = {};

    props.chains.forEach((network) => {
      // @ts-ignore
      tmp[network.id] = http();
    });

    setTransports(tmp);
  }, [props.chains]);

  useEffect(() => {
    if (transports) {
      setConfig(
        createConfig({
          connectors,
          chains: props.chains as any,
          transports,
        })
      );
    }
  }, [transports]);

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
