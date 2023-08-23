import { useEffect, useState } from "react";
import WalletService from "./WalletService";
import { WalletServiceContext } from "./WalletServiceContext";
import React from "react";
import Web3 from "web3";

import { NetworkModel, NetworkUtils } from "@minteeble/utils";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useWalletClient } from "wagmi";

import { providers } from "ethers";

export function walletClientToSigner(walletClient: any) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return provider;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId } = {} as any) {
  const { data: walletClient } = useWalletClient({ chainId });
  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  );
}

export function useWeb3Signer({ chainId } = {} as any) {
  const { data: walletClient } = useWalletClient({ chainId });

  return walletClient
    ? new Web3(walletClientToSigner(walletClient).provider as any)
    : undefined;
}

export interface WalletServiceProviderContentProps {
  children: any;
}

export const WalletServiceProviderContent = (
  props: WalletServiceProviderContentProps
) => {
  const [walletService, setWalletService] = useState<WalletService | null>(
    null
  );
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const web3signer = useWeb3Signer();
  const { openConnectModal } = useConnectModal();

  const [web3, setWeb3] = useState<Web3 | null>();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [userIsSigning, setUserIsSigning] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Array<string> | null>(null);
  const [currentChain, setCurrentChain] = useState<NetworkModel | null>(null);

  useEffect(() => {
    console.log("web3signer:", web3signer);
    if (web3signer) setWeb3(web3signer as any);
  }, [web3signer]);

  useEffect(() => {
    console.log("isLoading:", isLoading);
  }, [isLoading]);

  useEffect(() => {
    let service = new WalletService();

    (async () => {
      // let modalObj = service.getModal();
      // setModal(modalObj);
      // if (modalObj.cachedProvider) {
      //   let web3Obj = await service.connectWallet(modalObj);
      //   setWeb3(web3Obj);
      // }
    })();

    setWalletService(service);
  }, []);

  useEffect(() => {
    (async () => {
      console.log("Got new web3 object:", web3);
      if (walletService && web3 != null) {
        console.log("Loading accounts");
        let address = (await walletService.getWalletAddress(web3)) || "";

        if (address.length > 0) {
          setWalletAddress(address);

          walletService.registerWeb3Events(
            web3.eth.currentProvider,
            (accounts) => {
              setAccounts(accounts);
            }
          );

          setAccounts(await web3.eth.getAccounts());

          // (web3.eth.currentProvider as any).on(
          //   "accountsChanged",
          //   (accounts: string[]) => {
          //     console.log(accounts);
          //     window.location.reload();
          //   }
          // );
        } else {
          await disconnectWallet();
        }
      }
    })();
  }, [web3]);

  useEffect(() => {
    if (userIsSigning) {
      console.log("User is signing");
    } else {
      console.log("User is not signing");
    }
  }, [userIsSigning]);

  useEffect(() => {
    (async () => {
      const chainId = await web3?.eth.getChainId();

      if (chainId) {
        let chainName = NetworkUtils.getAllNetworks().find(
          (net) => BigInt(net.chainId) == chainId
        );

        console.log("CHAIN", chainName);

        if (!chainName) throw new Error("Chain is not implemented.");
        setCurrentChain(chainName);
      }
    })();
  }, [web3]);

  useEffect(() => {
    console.log("CURRENT CHAIN", currentChain);
  }, [currentChain]);

  const disconnectWallet = async (): Promise<void> => {
    // modal?.clearCachedProvider();
    // setWeb3(null);
    // setWalletAddress("");
    // setCurrentChain(null);
  };

  const connectWallet = async (): Promise<void> => {
    // if (walletService && modal) {
    //   let web3Obj = await walletService.connectWallet(modal);

    //   setWeb3(web3Obj);
    // }
    if (openConnectModal) {
      openConnectModal();
    }
  };

  const sign = async (message: any): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
      if (walletService && walletAddress && web3) {
        try {
          setUserIsSigning(true);

          const signature = await walletService.sign(
            web3,
            walletAddress,
            message
          );

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
        web3: web3 || undefined,
      }}
    >
      {props.children}
    </WalletServiceContext.Provider>
  );
};
