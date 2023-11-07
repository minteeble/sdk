import { useEffect, useState } from "react";
import WalletService from "./WalletService";
import { WalletServiceContext } from "./WalletServiceContext";
import React from "react";

import { NetworkModel, NetworkUtils } from "@minteeble/utils";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  useWalletClient,
  useDisconnect,
  useNetwork,
  useAccount,
  useSwitchNetwork,
} from "wagmi";
// import { useAccount, useConnect, useDisconnect } from "wagmi";
import { privateKeyToAccount } from "viem/accounts";
import { fetchBlockNumber, signMessage } from "wagmi/actions";

export interface WalletServiceProviderContentProps {
  /**
   * If true, the wallet will refresh on chain change
   */
  refreshOnChainChange?: boolean;

  children: any;
}

export const WalletServiceProviderContent = (
  props: WalletServiceProviderContentProps
) => {
  const [walletService, setWalletService] = useState<WalletService | null>(
    null
  );
  const account = useAccount();
  const { chain, chains } = useNetwork();
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const [walletAddress, setWalletAddress] = useState<string>("");
  const [userIsSigning, setUserIsSigning] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Array<string> | null>(null);
  const [currentChain, setCurrentChain] = useState<NetworkModel | null>(null);

  const {
    chains: switchChains,
    error,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
  });

  useEffect(() => {
    console.log("Wagmi chain", chain);
  }, [chain]);

  useEffect(() => {
    console.log("Wagmi account", account);
    // console.log("")
    // account.connector.
  }, [account]);

  useEffect(() => {
    console.log("Wagmi walletclient", walletClient);
  }, [walletClient]);

  useEffect(() => {
    console.log("Wagmi chains", chains);
  }, [chains]);

  const handleChainReload = () => {
    if (props.refreshOnChainChange) {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (chain) {
      const chainId = chain.id;
      if (chainId) {
        let networkInfo = NetworkUtils.getAllNetworks().find(
          (net) => net.chainId == chainId
        );
        console.log("Current chain:", networkInfo);
        if (networkInfo) {
          if (currentChain && currentChain.chainId !== networkInfo.chainId) {
            handleChainReload();
          }
          setCurrentChain(networkInfo);
        } else {
          console.log("Current chain: Unknown");
          if (currentChain && currentChain.chainId !== 0) {
            handleChainReload();
          }
          setCurrentChain({
            chainId: 0,
            name: "unknown",
            currency: "",
            urlName: "unknown",
            isTestnet: false,
            explorerUrlPattern: "",
          });
        }
      }
    }
  }, [chain]);

  useEffect(() => {
    let service = new WalletService();

    setWalletService(service);
  }, []);

  useEffect(() => {
    if (userIsSigning) {
      console.log("User is signing");
    } else {
      console.log("User is not signing");
    }
  }, [userIsSigning]);

  useEffect(() => {
    (async () => {
      if (walletClient) {
        let address = walletClient.account.address;

        if (address.length > 0) {
          setWalletAddress(address);
        } else {
          // await disconnectWallet();
        }
      }
    })();
  }, [walletClient]);

  const disconnectWallet = async (): Promise<void> => {
    // modal?.clearCachedProvider();
    setWalletAddress("");
    setCurrentChain(null);
    disconnect();
  };

  const connectWallet = async (): Promise<void> => {
    if (openConnectModal) {
      console.log("Opening connect modal.");
      openConnectModal();
    }
  };

  const sign = async (_message: any): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
      if (walletService && walletAddress && walletClient) {
        try {
          setUserIsSigning(true);

          const signature = await signMessage({
            message: _message,
          });

          setUserIsSigning(false);
          resolve(signature);
        } catch (err) {
          setUserIsSigning(false);
          console.error(err);
          reject();
        }
      } else reject();
    });
  };

  return (
    <WalletServiceContext.Provider
      value={{
        walletService: walletService as WalletService | undefined,
        connectWallet,
        disconnectWallet,
        sign,
        accounts,
        walletAddress,
        userIsSigning,
        currentChain,
        walletClient: walletClient || null,
      }}
    >
      {props.children}
    </WalletServiceContext.Provider>
  );
};
