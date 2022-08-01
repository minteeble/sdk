import { createContext } from "react";
import WalletService from "./WalletService";

export interface WalletServiceContent {
  walletService?: WalletService;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  sign: (message: any) => Promise<any>;
  walletAddress: string;
}

export const WalletServiceContext = createContext<WalletServiceContent>({
  connectWallet: () => new Promise<void>(() => {}),
  disconnectWallet: () => new Promise<void>(() => {}),
  sign: () => new Promise<any>(() => {}),
  walletAddress: "",
});
