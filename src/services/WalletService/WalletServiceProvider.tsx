import { useEffect, useState } from "react";
import WalletService from "./WalletService";
import { WalletServiceContext } from "./WalletServiceContext";
import React from "react";
import Web3 from "web3";
import Web3Modal, { removeLocal } from "web3modal";

export interface WalletServiceProviderProps {
  children: any;
}

export const WalletServiceProvider = (props: WalletServiceProviderProps) => {
  const [walletService, setWalletService] = useState<WalletService | null>(
    null
  );

  const [web3, setWeb3] = useState<Web3 | null>();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [modal, setModal] = useState<Web3Modal>();
  const [userIsSigning, setUserIsSigning] = useState<boolean>(false);

  useEffect(() => {
    let service = new WalletService();

    (async () => {
      let modalObj = service.getModal();

      setModal(modalObj);

      if (modalObj.cachedProvider) {
        let web3Obj = await service.connectWallet(modalObj);

        setWeb3(web3Obj);
      }
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

          walletService.registerWeb3Events(web3.eth.currentProvider);
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

  const disconnectWallet = async (): Promise<void> => {
    modal?.clearCachedProvider();
    setWeb3(null);
    setWalletAddress("");
  };

  const connectWallet = async (): Promise<void> => {
    if (walletService && modal) {
      let web3Obj = await walletService.connectWallet(modal);

      setWeb3(web3Obj);
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
        walletAddress,
        userIsSigning,
        web3: web3 || undefined,
      }}
    >
      {props.children}
    </WalletServiceContext.Provider>
  );
};
