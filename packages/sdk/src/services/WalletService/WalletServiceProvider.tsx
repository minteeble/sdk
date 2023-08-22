import React from "react";
import {
  WalletServiceProviderContent,
  WalletServiceProviderContentProps,
} from "./WalletServiceProviderContent";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export interface WalletServiceProviderProps
  extends WalletServiceProviderContentProps {
  children: any;
}

const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Test App",
  projectId: "9377377b92bc54c321702b390bfb5b83",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

export const WalletServiceProvider = (props: WalletServiceProviderProps) => {
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
