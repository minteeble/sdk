import { NftCollectionInfoClientModel } from "@minteeble/utils";
import { createContext } from "react";
import { SmartContractInstance } from "../SmartContract";
import { NftCollectionInstance } from "./NftCollectionInstance";
import NftCollectionService from "./NftCollectionService";

export interface NftCollectionServiceContent {
  nftCollectionService: NftCollectionService | null;

  createNftCollection: (
    nftCollection: NftCollectionInfoClientModel,
    address: string
  ) => Promise<void>;

  deleteNftCollection: (
    chainName: string,
    collectionId: string
  ) => Promise<void>;

  setCustomABI: (
    chainName: string,
    collectionId: string,
    customABI: any
  ) => Promise<void>;

  getUserNftCollections: (
    user: string,
    chainName?: string
  ) => Promise<Array<NftCollectionInfoClientModel>>;

  getCollectionInstance: (
    chainName: string,
    collectionId: string,
    connect: boolean
  ) => Promise<NftCollectionInstance | null>;

  updateCollectionInfo: (
    collection: NftCollectionInfoClientModel
  ) => Promise<void>;

  getNftImageUrl: (collectionId: string, tokenId: number) => string;

  getNftMetadataUrl: (collectionId: string, tokenId: number) => string;
}

export const NftCollectionServiceContext =
  createContext<NftCollectionServiceContent>({
    nftCollectionService: null,

    // @ts-ignore
    createNftCollection: (nftCollection: NftCollectionInfoClientModel) =>
      new Promise(() => {}),

    // @ts-ignore
    deleteNftCollection: (chainName: string, collectionId: string) =>
      new Promise(() => {}),

    // @ts-ignore
    setCustomABI: (chainName: string, collectionId: string, customABI: any) =>
      new Promise(() => {}),

    // @ts-ignore
    getUserNftCollections: (user: string, chainName: string) =>
      new Promise(() => {}),

    getCollectionInstance: (
      // @ts-ignore
      chainName: string,
      // @ts-ignore
      collectionId: string,
      // @ts-ignore
      connect: boolean
    ) => new Promise(() => {}),

    updateCollectionInfo: () => new Promise(() => {}),

    getNftImageUrl: () => "",

    getNftMetadataUrl: () => "",
  });
