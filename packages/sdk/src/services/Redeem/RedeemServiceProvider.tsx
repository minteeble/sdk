import {
  RedeemRequestClientModel,
  RedeemSystemConfigClientModel,
  RedeemSystemInfoClientModel,
  RedeemSystemInfoPreviewClientModel,
  RedeemType,
} from "@minteeble/utils";
import React from "react";
import { RedeemService } from "./RedeemService";
import { RedeemProviderProps } from "./RedeemService.types";
import { RedeemServiceContext } from "./RedeemServiceContext";

export const RedeemServiceProvider = (props: RedeemProviderProps) => {
  const createRedeemRequest = async (
    redeemSystemId: string
  ): Promise<string> => {
    return RedeemService.instance.createRedeemRequest(redeemSystemId);
  };

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

  const getRedeemRequest = async (
    id: string,
    redeemSystemId: string
  ): Promise<RedeemRequestClientModel | null> => {
    return RedeemService.instance.getRedeemRequest(id, redeemSystemId);
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

  return (
    <RedeemServiceContext.Provider
      value={{
        createRedeemRequest,
        createRedeemSystemInfo,
        getRedeemRequest,
        getRedeemSystemInfo,
        getRedeemSystemsInfo,
        updateRedeemSystemInfo,
        deleteRedeemSystemInfo,
      }}
    >
      {props.children}
    </RedeemServiceContext.Provider>
  );
};
