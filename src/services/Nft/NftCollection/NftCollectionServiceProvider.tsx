import { NftCollectionInfoClientModel } from "@minteeble/utils";
import { useEffect, useState } from "react";
import NftCollectionService from "./NftCollectionService";
import { NftCollectionServiceContext } from "./NftCollectionServiceContext";
import React from "react";
import {
  MinteebleERC721AInstance,
  NftCollectionInstance,
} from "./NftCollectionInstance";
import { useWalletService } from "../../WalletService";

export interface NftCollectionServiceProviderProps {
  children: any;
}

export const NftCollectionServiceProvider = (
  props: NftCollectionServiceProviderProps
) => {
  const [nftCollectionService, setNftCollectionService] =
    useState<NftCollectionService | null>(null);

  // const [collections, setCollections] = useState<Array<NftCollectionInstance>>(
  //   []
  // );

  let { walletAddress, web3 } = useWalletService();

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

  const deleteNftCollection = async (
    chainName: string,
    collectionId: string
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await nftCollectionService?.deleteNftCollection(
          chainName,
          collectionId
        );
        resolve();
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };

  const setCustomABI = async (
    chainName: string,
    collectionId: string,
    customABI: any
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await nftCollectionService?.setCustomABI(
          chainName,
          collectionId,
          customABI
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
  ): Promise<NftCollectionInstance | null> => {
    return new Promise<NftCollectionInstance | null>(
      async (resolve, reject) => {
        try {
          if (connect && !web3) {
            reject("Error. Client is not yet connected to web3.");
            return;
          }

          let collectionModel = await nftCollectionService?.getCollectionInfo(
            chainName,
            collectionId,
            true
          );

          console.log("Fetched collection info:", collectionModel);

          let collectionInstance: NftCollectionInstance | null = null;

          if (collectionModel) {
            if (collectionModel.type === "MinteebleERC721A") {
              collectionInstance = new MinteebleERC721AInstance(
                collectionModel,
                web3
              );

              if (connect) {
                await collectionInstance.connect();
              }
            }
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
        getCollectionInstance,
        deleteNftCollection,
        setCustomABI,
      }}
    >
      {props.children}
    </NftCollectionServiceContext.Provider>
  );
};
