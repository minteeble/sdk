/**
 * Copyright (c) Minteeble 2022. All Rights Reserved.
 * Node module: @minteeble/sdk
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 *
 * Email:     minteeble@gmail.com
 * Website:   https://minteeble.com
 */

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import Web3 from "web3";

class WalletService {
  private modal: Web3Modal | null;

  private web3: Web3 | null;

  private walletAddress: string;

  constructor() {
    this.modal = null;
    this.web3 = null;
    this.walletAddress = "";
  }

  public init(): void {
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
  }

  public async connectWallet(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        console.log("Connecting to wallet.");

        let provider = await this.modal!.connect();

        console.log("Got provider", provider);
        this.web3 = new Web3(provider);
        resolve();
      } catch (err) {
        console.log("CLosed");
        reject("Modal closed.");
      }
    });
  }

  public async disconnectWallet(): Promise<void> {
    this.modal?.clearCachedProvider();
    this.web3 = null;
    this.walletAddress = "";
  }

  public registerWeb3Events(provider: any): void {
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts: string[]) => {
      console.log(accounts);
      window.location.reload();
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
  }
}

export default WalletService;
