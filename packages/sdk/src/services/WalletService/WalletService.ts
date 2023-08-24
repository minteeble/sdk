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

class WalletService {
  constructor() {}

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
}

export default WalletService;
