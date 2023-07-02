import { createContext } from "react";
import {
  RedeemRequestClientModel,
  RedeemSystemInfoClientModel,
  RedeemSystemInfoPreviewClientModel,
  RedeemType,
} from "@minteeble/utils";

export interface RedeemServiceContent {
  createRedeemRequest(redeemSystemId: string): Promise<string>;
  createRedeemSystemInfo(
    chainName: string,
    redeemType: RedeemType,
    collectionId: string,
    name: string
  ): Promise<string>;
  getRedeemRequest(
    id: string,
    redeemSystemId: string
  ): Promise<RedeemRequestClientModel | null>;
  getRedeemSystemInfo(id: string): Promise<RedeemSystemInfoClientModel | null>;
  getRedeemSystemsInfo(): Promise<Array<RedeemSystemInfoPreviewClientModel> | null>;
  updateRedeemSystemInfo(
    name: string,
    collectionId: string,
    chainName: string,
    redeemSystemId: string
  ): Promise<void>;
  deleteRedeemSystemInfo(redeemSystemId: string): Promise<void>;
  addRedeemSystemProduct(
    redeemSystemId: string,
    name: string,
    description: string,
    supply?: number
  ): Promise<void>;
}

export const RedeemServiceContext = createContext<RedeemServiceContent>({
  createRedeemRequest: () => new Promise(() => {}),
  createRedeemSystemInfo: () => new Promise(() => {}),
  getRedeemRequest: () => new Promise(() => {}),
  getRedeemSystemInfo: () => new Promise(() => {}),
  getRedeemSystemsInfo: () => new Promise(() => {}),
  updateRedeemSystemInfo: () => new Promise(() => {}),
  deleteRedeemSystemInfo: () => new Promise(() => {}),
  addRedeemSystemProduct: () => new Promise(() => {}),
});
