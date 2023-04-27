import {
  GadgetGroupClientModel,
  GadgetInfoClientModel,
  IGadgetGroupClientModel,
} from "@minteeble/utils";
import { createContext } from "react";

export interface GadgetServiceContent {
  createGadgetGroup: (name: string) => Promise<GadgetGroupClientModel | null>;
  getGadgetGroup: (groupId: string) => Promise<GadgetGroupClientModel | null>;
  createGadget: (
    groupId: string,
    traitName: string,
    value: string,
    tokenId: number
  ) => Promise<GadgetInfoClientModel | null>;
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
}

export const GadgetServiceContext = createContext<GadgetServiceContent>({
  createGadgetGroup: () => new Promise(() => {}),
  getGadgetGroup: () => new Promise(() => {}),
  createGadget: () => new Promise(() => {}),
  createGadgetImage: () => new Promise(() => {}),
  getGadgetImage: () => new Promise(() => {}),
  getGadgetsGroupByOwner: () => new Promise(() => {}),
  getGroupGadgets: () => new Promise(() => {}),
});
