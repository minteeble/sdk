import { NftCollectionInfoClientModel } from "@minteeble/utils";
import { useEffect, useState } from "react";
import NftCollectionService from "./NftCollectionService";
import { NftCollectionServiceContext } from "./NftCollectionServiceContext";
import React from "react";

export interface NftCollectionServiceProviderProps {
  children: any;
}

export const NftCollectionServiceProvider = (
  props: NftCollectionServiceProviderProps
) => {
  const [nftCollectionService, setNftCollectionService] =
    useState<NftCollectionService | null>(null);

  useEffect(() => {
    let service = new NftCollectionService();

    setNftCollectionService(service);
  });

  const createNftCollection = async (
    nftCollection: NftCollectionInfoClientModel
  ): Promise<void> => {};

  return (
    <NftCollectionServiceContext.Provider
      value={{ nftCollectionService, createNftCollection }}
    >
      {props.children}
    </NftCollectionServiceContext.Provider>
  );
};
