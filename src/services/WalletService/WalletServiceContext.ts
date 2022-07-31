import { createContext } from "react";
import WalletService from "./WalletService";

export const WalletServiceContext = createContext<WalletService | undefined>(
  undefined
);
