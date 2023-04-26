import React from "react";
import { GadgetServiceProviderProps } from "./GadgetService.types";
import { GadgetServiceContext } from "./GadgetServiceContext";
import {
  GadgetGroupClientModel,
  IGadgetGroupClientModel,
} from "@minteeble/utils";
import { GadgetService } from "./GadgetService";

export const GadgetServiceProvider = (props: GadgetServiceProviderProps) => {
  const createGadgetGroup = (
    name: string
  ): Promise<IGadgetGroupClientModel | null> => {
    return GadgetService.instance.createGadgetGroup(name);
  };

  const getGadgetconst = async (
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
  ) => {};

  return (
    <GadgetServiceContext.Provider value={{}}>
      {props.children}
    </GadgetServiceContext.Provider>
  );
};
