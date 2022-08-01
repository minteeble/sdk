import { createContext } from "react";
import WalletService from "./WalletService";

export interface WalletServiceContent {
  walletService?: WalletService;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  walletAddress: string;
}

export const WalletServiceContext = createContext<WalletServiceContent>({
  connectWallet: () => new Promise<void>(() => {}),
  disconnectWallet: () => new Promise<void>(() => {}),
  walletAddress: "",
});
