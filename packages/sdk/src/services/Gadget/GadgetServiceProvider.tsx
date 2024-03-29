import React from "react";
import { GadgetServiceProviderProps } from "./GadgetService.types";
import { GadgetServiceContext } from "./GadgetServiceContext";
import {
  GadgetGroupClientModel,
  GadgetInfoClientModel,
  GetGadgetsBatchUploadUrlResponseDto,
  IGadgetGroupClientModel,
  IGadgetInfoClientModel,
} from "@minteeble/utils";
import { GadgetService } from "./GadgetService";

export const GadgetServiceProvider = (props: GadgetServiceProviderProps) => {
  const createGadgetGroup = (
    name: string,
    chainName?: string,
    collectionId?: string
  ): Promise<IGadgetGroupClientModel | null> => {
    return GadgetService.instance.createGadgetGroup(
      name,
      chainName,
      collectionId
    );
  };

  const getGadgetGroup = async (
    groupId: string
  ): Promise<GadgetGroupClientModel | null> => {
    return new Promise<GadgetGroupClientModel | null>(
      async (resolve, reject) => {
        try {
          let group = await GadgetService.instance.getGadgetGroup(groupId);

          resolve(group);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      }
    );
  };

  const createGadget = async (
    groupId: string,
    traitName: string,
    value: string,
    tokenId: number
  ): Promise<IGadgetInfoClientModel | null> => {
    return GadgetService.instance.createGadget(
      groupId,
      traitName,
      value,
      tokenId
    );
  };

  const updateGadget = async (
    groupId: string,
    tokenId: number,
    traitName: string,
    value: string
  ): Promise<void> => {
    return GadgetService.instance.updateGadget(
      groupId,
      tokenId,
      traitName,
      value
    );
  };

  const createGadgetImage = async (
    groupId: string,
    tokenId: string,
    imageString: string
  ): Promise<void> => {
    return GadgetService.instance.createGadgetImage(
      groupId,
      tokenId,
      imageString
    );
  };

  const getGadgetImageUploadUrl = async (
    groupId: string,
    tokenId: string
  ): Promise<string | null> => {
    return GadgetService.instance.getGadgetImageUploadUrl(groupId, tokenId);
  };

  const uploadGadgetImage = async (
    url: string,
    imageString: string
  ): Promise<void> => {
    return GadgetService.instance.uploadGadgetImage(url, imageString);
  };

  const getGadgetImage = async (
    groupId: string,
    tokenId: string
  ): Promise<Blob | null> => {
    return new Promise<Blob | null>(async (resolve, reject) => {
      try {
        let image = await GadgetService.instance.getGadgetImage(
          groupId,
          tokenId
        );

        resolve(image || null);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };

  const getGadgetsGroupByOwner =
    async (): Promise<Array<IGadgetGroupClientModel> | null> => {
      return new Promise<Array<IGadgetGroupClientModel> | null>(
        async (resolve, reject) => {
          try {
            let groups = await GadgetService.instance.getGadgetsGroupByOwner();

            resolve(groups);
          } catch (err) {
            console.log(err);
            reject(err);
          }
        }
      );
    };

  const getGroupGadgets = async (
    groupId: string
  ): Promise<Array<GadgetInfoClientModel> | null> => {
    return new Promise<Array<GadgetInfoClientModel> | null>(
      async (resolve, reject) => {
        try {
          let gadgets = await GadgetService.instance.getGroupGadgets(groupId);

          resolve(gadgets);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      }
    );
  };

  const deleteGadgetGroup = async (groupId: string): Promise<void> => {
    return GadgetService.instance.deleteGadgetGroup(groupId);
  };

  const deleteGadget = async (
    groupId: string,
    tokenId: number
  ): Promise<void> => {
    return GadgetService.instance.deleteGadget(groupId, tokenId);
  };

  const getGadgetImageUrl = (groupId: string, tokenId: number): string => {
    return GadgetService.instance.getGadgetImageUrl(groupId, tokenId);
  };

  const getGadgetsBatchUploadUrl = async (
    groupId: string
  ): Promise<GetGadgetsBatchUploadUrlResponseDto | null> => {
    return GadgetService.instance.getGadgetsBatchUploadUrl(groupId);
  };

  const batchCreateGadgets = async (
    groupId: string,
    requestId: string
  ): Promise<{ success: boolean; message?: string }> => {
    return GadgetService.instance.batchCreateGadgets(groupId, requestId);
  };

  return (
    <GadgetServiceContext.Provider
      value={{
        createGadgetGroup,
        getGadgetGroup,
        createGadget,
        updateGadget,
        createGadgetImage,
        getGadgetImage,
        getGadgetsGroupByOwner,
        getGroupGadgets,
        deleteGadgetGroup,
        deleteGadget,
        getGadgetImageUploadUrl,
        uploadGadgetImage,
        getGadgetImageUrl,
        getGadgetsBatchUploadUrl,
        batchCreateGadgets,
      }}
    >
      {props.children}
    </GadgetServiceContext.Provider>
  );
};
