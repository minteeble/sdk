import { createContext } from "react";
import {
  RedeemRequestClientModel,
  RedeemSystemConfigClientModel,
  RedeemSystemInfoClientModel,
  RedeemSystemInfoPreviewClientModel,
  RedeemType,
} from "@minteeble/utils";

export interface RedeemServiceContent {
  createRedeemRequest(redeemConfigId: string): Promise<string>;
  createRedeemSystemInfo(
    chainName: string,
    redeemType: RedeemType,
    collectionId: string,
    name: string
  ): Promise<string>;
  getRedeemRequest(
    id: string,
    redeemConfigId: string
  ): Promise<RedeemRequestClientModel | null>;
  getRedeemSystemInfo(id: string): Promise<RedeemSystemInfoClientModel | null>;
  getRedeemSystemsInfo(): Promise<Array<RedeemSystemInfoPreviewClientModel> | null>;
  updateRedeemSystemInfo(
    name: string,
    collectionId: string,
    chainName: string,
    id: string
  ): Promise<void>;
  deleteRedeemSystemInfo(id: string): Promise<void>;
}

export const RedeemServiceContext = createContext<RedeemServiceContent>({
  createRedeemRequest: () => new Promise(() => {}),
  createRedeemSystemInfo: () => new Promise(() => {}),
  getRedeemRequest: () => new Promise(() => {}),
  getRedeemSystemInfo: () => new Promise(() => {}),
  getRedeemSystemsInfo: () => new Promise(() => {}),
  updateRedeemSystemInfo: () => new Promise(() => {}),
  deleteRedeemSystemInfo: () => new Promise(() => {}),
});
