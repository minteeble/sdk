import React from "react";
import { GadgetServiceProviderProps } from "./GadgetService.types";
import { GadgetServiceContext } from "./GadgetServiceContext";
import {
  GadgetGroupClientModel,
  GadgetInfoClientModel,
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

  const getGadgetsGroupByOwner =
    (): Promise<Array<IGadgetGroupClientModel> | null> => {
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

  const getGroupGadgets = (
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

  return (
    <GadgetServiceContext.Provider
      value={{
        createGadgetGroup,
        getGadgetGroup,
        createGadget,
        createGadgetImage,
        getGadgetImage,
        getGadgetsGroupByOwner,
        getGroupGadgets,
      }}
    >
      {props.children}
    </GadgetServiceContext.Provider>
  );
};
