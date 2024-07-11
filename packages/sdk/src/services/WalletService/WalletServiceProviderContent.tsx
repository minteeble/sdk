import { useEffect, useState } from "react";
import WalletService from "./WalletService";
import { WalletServiceContext } from "./WalletServiceContext";
import React from "react";
import { NetworkModel, NetworkUtils } from "@minteeble/utils";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  useWalletClient,
  useDisconnect,
  useAccount,
  useSwitchChain,
  useChainId,
} from "wagmi";
import { signMessage } from "wagmi/actions";

export interface WalletServiceProviderContentProps {
  /**
   * If true, the wallet will refresh on chain change
   */
  refreshOnChainChange?: boolean;

  wagmiConfig: any;

  children: any;
}

export const WalletServiceProviderContent = (
  props: WalletServiceProviderContentProps
) => {
  const [walletService, setWalletService] = useState<WalletService | null>(
    null
  );
  const account = useAccount();
  const { chains, switchChain: switchNetwork } = useSwitchChain();
  const chainId = useChainId(props.wagmiConfig);
  const { data: walletClient } = useWalletClient();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const [walletAddress, setWalletAddress] = useState<string>("");
  const [userIsSigning, setUserIsSigning] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Array<string> | null>(null);
  const [currentChain, setCurrentChain] = useState<NetworkModel | null>(null);

  useEffect(() => {
    console.log("Wagmi chain id", chainId);
  }, [chainId]);

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
  }, [chainId]);

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
          setWalletAddress("");
        }
      } else {
        setWalletAddress("");
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
    return await new Promise<any>(async (resolve, reject) => {
      if (walletAddress && walletClient) {
        try {
          setUserIsSigning(true);

          console.log("Signing message: ", _message);
          const signature = await signMessage(props.wagmiConfig, {
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

  const switchChain = async (chainId: number) => {
    await switchNetwork({ chainId: chainId });
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
        switchChain,
        wagmiConfig: props.wagmiConfig,
      }}
    >
      {props.children}
    </WalletServiceContext.Provider>
  );
};
