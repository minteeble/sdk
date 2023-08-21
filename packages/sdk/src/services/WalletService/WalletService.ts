/**
 * Copyright (c) Minteeble 2022. All Rights Reserved.
 * Node module: @minteeble/sdk
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 *
 * Email:     minteeble@gmail.com
 * Website:   https://minteeble.com
 */
"use strict";

import Web3Modal, { removeLocal } from "web3modal";

import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

class WalletService {
  constructor() {}

  public getModal = (): Web3Modal => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "95e5a8d4be98435ba50d93f448a1d34e",
        },
      },
    };

    const web3Modal: Web3Modal = new Web3Modal({
      theme: "dark",
      cacheProvider: true,
      disableInjectedProvider: false,
      providerOptions,
    });

    // if (web3Modal.cachedProvider) {
    //   this.connectWallet();
    // }

    return web3Modal;
  };

  public connectWallet = async (modal: Web3Modal): Promise<Web3> => {
    return new Promise<Web3>(async (resolve, reject) => {
      try {
        console.log("Connecting to wallet");

        console.log("Modal:", this);

        let provider = await modal.connect();

        console.log("Got provider", provider);
        let web3 = new Web3(provider);

        resolve(web3);

        // if (accounts.length > 0) {
        //   this._walletAddress = accounts[0];

        //   this.registerWeb3Events(this.web3.eth.currentProvider);
        // } else {
        //   await this.disconnectWallet();
        // }
        // resolve();
      } catch (err) {
        console.log("CLosed", err);
        reject("Modal closed.");
      }
    });
  };

  public getWalletAddress = async (web3: Web3): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
      try {
        let accounts = await web3.eth.getAccounts();

        if (accounts.length > 0) {
          resolve(accounts[0]);
        } else resolve("");
      } catch (err) {
        reject("Cannot get wallet address");
      }
    });
  };

  // public disconnectWallet = async (): Promise<void> => {
  //   this.modal?.clearCachedProvider();
  //   this.web3 = null;
  //   this._walletAddress = "";
  // };

  public registerWeb3Events = (
    provider: any,
    onAccountChange?: (accounts: Array<string>) => void
  ): void => {
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts: string[]) => {
      console.log(accounts);
      if (onAccountChange) {
        onAccountChange(accounts);
      }
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId: number) => {
      console.log(chainId);
      window.location.reload();
    });

    // Subscribe to provider connection
    provider.on("connect", (info: { chainId: number }) => {
      console.log("User connected", info);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error: { code: number; message: string }) => {
      console.log(error);
    });
  };

  public sign = async (
    web3: Web3,
    walletAddress: string,
    message: any
  ): Promise<any> => {
    const signature = await web3.eth.personal.sign(message, walletAddress, "");

    return signature;
  };
}

export default WalletService;
