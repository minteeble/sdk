import { NftCollectionInfoClientModel } from "@minteeble/utils";
import { createContext } from "react";
import NftCollectionService from "./NftCollectionService";

export interface NftCollectionServiceContent {
  nftCollectionService: NftCollectionService | null;

  createNftCollection: (
    nftCollection: NftCollectionInfoClientModel
  ) => Promise<void>;

  getUserNftCollections: (
    user: string,
    chainName: string
  ) => Promise<Array<NftCollectionInfoClientModel>>;
}

export const NftCollectionServiceContext =
  createContext<NftCollectionServiceContent>({
    nftCollectionService: null,

    // @ts-ignore
    createNftCollection: (nftCollection: NftCollectionInfoClientModel) =>
      new Promise(() => {}),

    // @ts-ignore
    getUserNftCollections: (user: string, chainName: string) =>
      new Promise(() => {}),
  });
