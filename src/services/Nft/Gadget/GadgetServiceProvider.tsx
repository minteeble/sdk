import React from "react";
import { GadgetServiceProviderProps } from "./GadgetService.types";
import { GadgetServiceContext } from "./GadgetServiceContext";
import {
  GadgetGroupClientModel,
  IGadgetGroupClientModel,
  IGadgetInfoClientModel,
} from "@minteeble/utils";
import { GadgetService } from "./GadgetService";

export const GadgetServiceProvider = (props: GadgetServiceProviderProps) => {
  const createGadgetGroup = (
    name: string
  ): Promise<IGadgetGroupClientModel | null> => {
    return GadgetService.instance.createGadgetGroup(name);
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

  const createGadget = (
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

  const createGadgetImage = (
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

  const getGadgetImage = (
    groupId: string,
    tokenId: string
  ): Promise<string | null> => {
    return new Promise<string | null>(async (resolve, reject) => {
      try {
        let image = await GadgetService.instance.getGadgetImage(
          groupId,
          tokenId
        );

        resolve(image);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };

  return (
    <GadgetServiceContext.Provider
      value={{
        createGadgetGroup,
        getGadgetGroup,
        createGadget,
        createGadgetImage,
        getGadgetImage,
      }}
    >
      {props.children}
    </GadgetServiceContext.Provider>
  );
};
