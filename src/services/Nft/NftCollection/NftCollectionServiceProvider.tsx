import { NftCollectionInfoClientModel } from "@minteeble/utils";
import { useEffect, useState } from "react";
import NftCollectionService from "./NftCollectionService";
import { NftCollectionServiceContext } from "./NftCollectionServiceContext";
import React from "react";
import { NftCollectionInstance } from "./NftCollectionInstance";
import { useWalletService } from "../../WalletService";

export interface NftCollectionServiceProviderProps {
  children: any;
}

export const NftCollectionServiceProvider = (
  props: NftCollectionServiceProviderProps
) => {
  const [nftCollectionService, setNftCollectionService] =
    useState<NftCollectionService | null>(null);

  const [collections, setCollections] = useState<Array<NftCollectionInstance>>(
    []
  );

  let { walletAddress } = useWalletService();

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

  const getCollectionInstance = async (
    chainName: string,
    collectionId: string,
    connect: boolean
  ) => {
    return new Promise<NftCollectionInstance | null>(
      async (resolve, reject) => {
        try {
          let collectionModel = await nftCollectionService?.getCollectionInfo(
            chainName,
            collectionId,
            connect // Specifies that ABI has to be fetched
          );

          let collectionInstance: NftCollectionInstance | null = null;

          if (collectionModel) {
            collectionInstance = new NftCollectionInstance(collectionModel);
          }

          resolve(collectionInstance);
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
