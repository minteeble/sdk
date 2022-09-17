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
  }, []);

  const createNftCollection = async (
    nftCollection: NftCollectionInfoClientModel
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await nftCollectionService?.createNftCollection(
          nftCollection.chainName,
          nftCollection.collectionName,
          nftCollection.address,
          nftCollection.type,
          nftCollection.resourceOwner
        );

        resolve();
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };

  const getUserNftCollections = async (
    user: string,
    chainName: string
  ): Promise<Array<NftCollectionInfoClientModel>> => {
    return new Promise<Array<NftCollectionInfoClientModel>>(
      async (resolve, reject) => {
        try {
          let collections = await nftCollectionService?.getUserNftCollections(
            user,
            chainName
          );

          resolve(collections || []);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      }
    );
  };

  return (
    <NftCollectionServiceContext.Provider
      value={{
        nftCollectionService,
        createNftCollection,
        getUserNftCollections,
      }}
    >
      {props.children}
    </NftCollectionServiceContext.Provider>
  );
};
