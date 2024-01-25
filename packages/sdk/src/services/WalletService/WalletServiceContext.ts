import { createContext } from "react";
import WalletService from "./WalletService";
import { NetworkModel } from "@minteeble/utils";
import { WalletClient } from "viem";

export interface WalletServiceContent {
  walletService?: WalletService;
  userIsSigning: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  sign: (message: any) => Promise<any>;
  walletAddress: string;
  accounts: Array<string> | null;
  currentChain: NetworkModel | null;
  walletClient: WalletClient | null;
  switchChain(chainId: number): Promise<void>;
}

export const WalletServiceContext = createContext<WalletServiceContent>({
  connectWallet: () => new Promise<void>(() => {}),
  disconnectWallet: () => new Promise<void>(() => {}),
  sign: () => new Promise<any>(() => {}),
  walletAddress: "",
  userIsSigning: false,
  accounts: null,
  currentChain: null,
  walletClient: null,
  switchChain: async () => {},
});
