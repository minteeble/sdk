import {
  GadgetGroupClientModel,
  GadgetInfoClientModel,
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
}

export const GadgetServiceContext = createContext<GadgetServiceContent>({
  createGadgetGroup: () => new Promise(() => {}),
  getGadgetGroup: () => new Promise(() => {}),
  createGadget: () => new Promise(() => {}),
  createGadgetImage: () => new Promise(() => {}),
  getGadgetImage: () => new Promise(() => {}),
});
