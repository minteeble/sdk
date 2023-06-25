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
    redeemConfigId: string
  ): Promise<string> => {
    return RedeemService.instance.createRedeemRequest(redeemConfigId);
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
    redeemConfigId: string
  ): Promise<RedeemRequestClientModel | null> => {
    return RedeemService.instance.getRedeemRequest(id, redeemConfigId);
  };

  const getRedeemSystemInfo = async (
    id: string
  ): Promise<RedeemSystemInfoClientModel | null> => {
    return RedeemService.instance.getRedeemSystemInfo(id);
  };

  const getRedeemSystemsInfo =
    async (): Promise<Array<RedeemSystemInfoPreviewClientModel> | null> => {
      return RedeemService.instance.getRedeemSystemsInfo();
    };

  const updateRedeemSystemInfo = async (
    name: string,
    collectionId: string,
    chainName: string,
    id: string
  ): Promise<void> => {
    return RedeemService.instance.updateRedeemSystemInfo(
      name,
      collectionId,
      chainName,
      id
    );
  };

  const deleteRedeemSystemInfo = async (id: string): Promise<void> => {
    return RedeemService.instance.deleteRedeemSystemInfo(id);
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
