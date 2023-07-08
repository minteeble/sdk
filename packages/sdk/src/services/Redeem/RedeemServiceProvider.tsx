import {
  RedeemSystemInfoClientModel,
  RedeemSystemInfoPreviewClientModel,
  RedeemSystemConfigClientModel,
  RedeemType,
  ShippingInformation,
  ContactInformation,
  IProductVariationClientModel,
} from "@minteeble/utils";
import React from "react";
import { RedeemService } from "./RedeemService";
import { RedeemProviderProps } from "./RedeemService.types";
import { RedeemServiceContext } from "./RedeemServiceContext";

export const RedeemServiceProvider = (props: RedeemProviderProps) => {
  const createRedeemSystemInfo = async (
    chainName: string,
    redeemType: RedeemType,
    collectionId: string,
    name: string
  ): Promise<string> => {
    return RedeemService.instance.createRedeemSystemInfo(
      chainName,
      redeemType,
      collectionId,
      name
    );
  };

  const getRedeemSystemInfo = async (
    redeemSystemId: string
  ): Promise<RedeemSystemInfoClientModel | null> => {
    return RedeemService.instance.getRedeemSystemInfo(redeemSystemId);
  };

  const getRedeemSystemsInfo =
    async (): Promise<Array<RedeemSystemInfoPreviewClientModel> | null> => {
      return RedeemService.instance.getRedeemSystemsInfo();
    };

  const updateRedeemSystemInfo = async (
    name: string,
    collectionId: string,
    chainName: string,
    redeemSystemId: string,
    config: RedeemSystemConfigClientModel
  ): Promise<void> => {
    RedeemService.instance.updateRedeemSystemInfo(
      name,
      collectionId,
      chainName,
      redeemSystemId,
      config
    );
  };

  const deleteRedeemSystemInfo = async (
    redeemSystemId: string
  ): Promise<void> => {
    return RedeemService.instance.deleteRedeemSystemInfo(redeemSystemId);
  };

  const addRedeemSystemProduct = async (
    redeemSystemId: string,
    name: string,
    description: string,
    variations: Array<IProductVariationClientModel>,
    supply?: number
  ): Promise<void> => {
    return await RedeemService.instance.addRedeemSystemProduct(
      redeemSystemId,
      name,
      description,
      variations,
      supply
    );
  };

  const getRedeemProductImageUrl = async (
    redeemSystemId: string,
    productId: string
  ): Promise<string> => {
    return await RedeemService.instance.getRedeemProductImageUrl(
      redeemSystemId,
      productId
    );
  };

  const updateRedeemSystemProduct = async (
    redeemSystemId: string,
    productId: string,
    name: string,
    description: string,
    variations: Array<IProductVariationClientModel>,
    supply?: number
  ): Promise<void> => {
    await RedeemService.instance.updateRedeemSystemProduct(
      redeemSystemId,
      productId,
      name,
      description,
      variations,
      supply
    );
  };

  const updateRedeemSystemProductImage = async (
    url: string,
    imageString: string
  ): Promise<void> => {
    return await RedeemService.instance.updateRedeemSystemProductImage(
      url,
      imageString
    );
  };

  const deleteRedeemSystemProduct = async (
    redeemSystemId: string,
    productId: string
  ): Promise<void> => {
    await RedeemService.instance.deleteRedeemSystemProduct(
      redeemSystemId,
      productId
    );
  };

  const redeemItem = async (
    nftId: string,
    shippingInfo: ShippingInformation,
    contactInfo: ContactInformation,
    redeemSystemId: string,
    productId: string,
    variationName: string
  ): Promise<void> => {
    return await RedeemService.instance.redeemItem(
      nftId,
      shippingInfo,
      contactInfo,
      redeemSystemId,
      productId,
      variationName
    );
  };

  const getRedeemableIds = async (
    redeemSystemId: string
  ): Promise<Array<number> | null> => {
    return await RedeemService.instance.getRedeemableIds(redeemSystemId);
  };

  return (
    <RedeemServiceContext.Provider
      value={{
        createRedeemSystemInfo,
        getRedeemSystemInfo,
        getRedeemSystemsInfo,
        updateRedeemSystemInfo,
        deleteRedeemSystemInfo,
        addRedeemSystemProduct,
        getRedeemProductImageUrl,
        deleteRedeemSystemProduct,
        updateRedeemSystemProduct,
        updateRedeemSystemProductImage,
        redeemItem,
        getRedeemableIds,
      }}
    >
      {props.children}
    </RedeemServiceContext.Provider>
  );
};
