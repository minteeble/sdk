import { createContext } from "react";
import {
  ContactInformation,
  GetRedeemedItemResponseDto,
  IProductVariationClientModel,
  RedeemSystemConfigClientModel,
  RedeemSystemInfoClientModel,
  RedeemSystemInfoPreviewClientModel,
  RedeemType,
  ShippingInformation,
} from "@minteeble/utils";

export interface RedeemServiceContent {
  createRedeemSystemInfo(
    chainName: string,
    redeemType: RedeemType,
    collectionId: string,
    name: string
  ): Promise<string>;

  getRedeemSystemInfo(id: string): Promise<RedeemSystemInfoClientModel | null>;

  getRedeemSystemsInfo(): Promise<Array<RedeemSystemInfoPreviewClientModel> | null>;

  updateRedeemSystemInfo(
    name: string,
    collectionId: string,
    chainName: string,
    redeemSystemId: string,
    config: RedeemSystemConfigClientModel
  ): Promise<void>;

  deleteRedeemSystemInfo(redeemSystemId: string): Promise<void>;

  addRedeemSystemProduct(
    redeemSystemId: string,
    name: string,
    description: string,
    variations: Array<IProductVariationClientModel>,
    supply?: number
  ): Promise<void>;

  getRedeemProductImageUrl(
    redeemSystemId: string,
    productId: string
  ): Promise<string>;

  updateRedeemSystemProduct(
    redeemSystemId: string,
    productId: string,
    name: string,
    description: string,
    variations: Array<IProductVariationClientModel>,
    attributes?: { [key: string]: any },
    supply?: number
  ): Promise<void>;

  updateRedeemSystemProductImage(
    url: string,
    imageString: string
  ): Promise<void>;

  deleteRedeemSystemProduct(
    redeemSystemId: string,
    productId: string
  ): Promise<void>;

  redeemItem(
    nftId: string,
    shippingInfo: ShippingInformation,
    contactInfo: ContactInformation,
    redeemSystemId: string,
    productId: string,
    variationName: string
  ): Promise<void>;

  getRedeemableIds(redeemSystemId: string): Promise<Array<number> | null>;

  getRedeemedItem: (
    nftId: string,
    redeemSystemId: string
  ) => Promise<GetRedeemedItemResponseDto | null>;
  deleteRedeemSystemProductImage: (
    redeemSystemId: string,
    productId: string,
    imageIndex: string
  ) => Promise<void>;
}

export const RedeemServiceContext = createContext<RedeemServiceContent>({
  createRedeemSystemInfo: () => new Promise(() => {}),
  getRedeemSystemInfo: () => new Promise(() => {}),
  getRedeemSystemsInfo: () => new Promise(() => {}),
  updateRedeemSystemInfo: () => new Promise(() => {}),
  deleteRedeemSystemInfo: () => new Promise(() => {}),
  addRedeemSystemProduct: () => new Promise(() => {}),
  getRedeemProductImageUrl: () => new Promise(() => {}),
  updateRedeemSystemProduct: () => new Promise(() => {}),
  updateRedeemSystemProductImage: () => new Promise(() => {}),
  deleteRedeemSystemProduct: () => new Promise(() => {}),
  redeemItem: () => new Promise(() => {}),
  getRedeemableIds: () => new Promise(() => {}),
  getRedeemedItem: () => new Promise(() => {}),
  deleteRedeemSystemProductImage: () => new Promise(() => {}),
});
