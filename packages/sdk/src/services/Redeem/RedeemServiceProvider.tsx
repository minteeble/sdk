import {
  RedeemSystemInfoClientModel,
  RedeemSystemInfoPreviewClientModel,
  RedeemType,
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
    redeemSystemId: string
  ): Promise<void> => {
    return RedeemService.instance.updateRedeemSystemInfo(
      name,
      collectionId,
      chainName,
      redeemSystemId
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
    supply?: number
  ): Promise<void> => {
    return await RedeemService.instance.addRedeemSystemProduct(
      redeemSystemId,
      name,
      description,
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
    supply?: number
  ): Promise<string> => {
    return await RedeemService.instance.updateRedeemSystemProduct(
      redeemSystemId,
      productId,
      name,
      description,
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
  ): Promise<string> => {
    return await RedeemService.instance.deleteRedeemSystemProduct(
      redeemSystemId,
      productId
    );
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
      }}
    >
      {props.children}
    </RedeemServiceContext.Provider>
  );
};
