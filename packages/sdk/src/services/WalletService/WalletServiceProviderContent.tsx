import { useEffect, useState } from "react";
import WalletService from "./WalletService";
import { WalletServiceContext } from "./WalletServiceContext";
import React from "react";

import { NetworkModel, NetworkUtils } from "@minteeble/utils";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useWalletClient, useDisconnect, useNetwork } from "wagmi";
// import { useAccount, useConnect, useDisconnect } from "wagmi";

export interface WalletServiceProviderContentProps {
  children: any;
}

export const WalletServiceProviderContent = (
  props: WalletServiceProviderContentProps
) => {
  const [walletService, setWalletService] = useState<WalletService | null>(
    null
  );
  const { chain, chains } = useNetwork();
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const [walletAddress, setWalletAddress] = useState<string>("");
  const [userIsSigning, setUserIsSigning] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Array<string> | null>(null);
  const [currentChain, setCurrentChain] = useState<NetworkModel | null>(null);

  useEffect(() => {
    if (chain) {
      const chainId = chain.id;

      if (chainId) {
        let networkInfo = NetworkUtils.getAllNetworks().find(
          (net) => net.chainId == chainId
        );

        console.log("Current chain:", networkInfo);

        if (!networkInfo) throw new Error("Chain is not implemented.");

        if (currentChain && currentChain.chainId !== networkInfo.chainId) {
          window.location.reload();
        }
        setCurrentChain(networkInfo);
      }
    }
  }, [chain]);

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
      if (walletClient) {
      }
    })();
  }, [walletClient]);

  // useEffect(() => {
  //   (async () => {
  //     // console.log("Got new web3 object:", web3);
  //     if (walletService && web3 != null) {
  //       console.log("Loading accounts");
  //       let address = (await walletService.getWalletAddress(web3)) || "";

  //       if (address.length > 0) {
  //         setWalletAddress(address);

  //         console.log("Address:", address);
  //         console.log(
  //           "Current provider:",
  //           web3.eth.currentProvider,
  //           web3.currentProvider
  //         );

  //         // walletService.registerWeb3Events(
  //         //   web3.eth.currentProvider,
  //         //   (accounts) => {
  //         //     setAccounts(accounts);
  //         //   }
  //         // );

  //         setAccounts(await web3.eth.getAccounts());
  //         console.log("ACCOUNTS:", await web3.eth.getAccounts());

  //         // (web3.eth.currentProvider as any).on(
  //         //   "accountsChanged",
  //         //   (accounts: string[]) => {
  //         //     console.log(accounts);
  //         //     window.location.reload();
  //         //   }
  //         // );
  //       } else {
  //         await disconnectWallet();
  //       }
  //     }
  //   })();
  // }, [web3]);

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
          await disconnectWallet();
        }
      }
    })();
  }, [walletClient]);

  const disconnectWallet = async (): Promise<void> => {
    // modal?.clearCachedProvider();
    // setWeb3(null);
    // setWalletAddress("");
    // setCurrentChain(null);
    disconnect();
  };

  const connectWallet = async (): Promise<void> => {
    // if (walletService && modal) {
    //   let web3Obj = await walletService.connectWallet(modal);

    //   setWeb3(web3Obj);
    // }
    if (openConnectModal) {
      console.log("Opening connect modal.");
      openConnectModal();
    }
  };

  const sign = async (_message: any): Promise<any> => {
    // return new Promise<any>(async (resolve, reject) => {
    //   if (walletService && walletAddress && web3) {
    //     try {
    //       setUserIsSigning(true);
    //       const signature = await walletService.sign(
    //         web3,
    //         walletAddress,
    //         message
    //       );
    //       setUserIsSigning(false);
    //       resolve(signature);
    //     } catch (err) {
    //       setUserIsSigning(false);
    //       console.error(err);
    //       reject();
    //     }
    //   } else reject();
    // });
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
