import {
  GadgetGroupClientModel,
  GadgetInfoClientModel,
  IGadgetGroupClientModel,
} from "@minteeble/utils";
import { createContext } from "react";

export interface GadgetServiceContent {
  createGadgetGroup: (
    name: string,
    chainName?: string,
    collectionId?: string
  ) => Promise<GadgetGroupClientModel | null>;

  getGadgetGroup: (groupId: string) => Promise<GadgetGroupClientModel | null>;

  createGadget: (
    groupId: string,
    traitName: string,
    value: string,
    tokenId: number
  ) => Promise<GadgetInfoClientModel | null>;

  updateGadget: (
    groupId: string,
    tokenId: number,
    traitName: string,
    value: string
  ) => Promise<void>;

  createGadgetImage: (
    groupId: string,
    tokenId: string,
    imageString: string
  ) => Promise<void>;

  getGadgetImage: (groupId: string, tokenId: string) => Promise<string | null>;

  getGadgetsGroupByOwner: () => Promise<Array<IGadgetGroupClientModel> | null>;

  getGroupGadgets: (
    groupId: string
  ) => Promise<Array<GadgetInfoClientModel> | null>;

  deleteGadgetGroup: (groupId: string) => Promise<void>;

  deleteGadget: (groupId: string, tokenId: number) => Promise<void>;

  getGadgetImageUploadUrl: (
    groupId: string,
    tokenId: string
  ) => Promise<string | null>;

  uploadGadgetImage: (url: string, imageString: string) => Promise<void>;

  getGadgetImageUrl: (groupId: string, tokenId: number) => string;
}

export const GadgetServiceContext = createContext<GadgetServiceContent>({
  createGadgetGroup: () => new Promise(() => {}),
  getGadgetGroup: () => new Promise(() => {}),
  createGadget: () => new Promise(() => {}),
  createGadgetImage: () => new Promise(() => {}),
  getGadgetImage: () => new Promise(() => {}),
  getGadgetsGroupByOwner: () => new Promise(() => {}),
  getGroupGadgets: () => new Promise(() => {}),
  deleteGadgetGroup: () => new Promise(() => {}),
  deleteGadget: () => new Promise(() => {}),
  getGadgetImageUploadUrl: () => new Promise(() => {}),
  uploadGadgetImage: () => new Promise(() => {}),
  getGadgetImageUrl: () => "",
  updateGadget: () => new Promise(() => {}),
});
