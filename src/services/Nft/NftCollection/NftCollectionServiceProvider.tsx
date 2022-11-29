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
      } catch {}
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
          console.log("here");

          if (connect && !web3) {
            reject("Error. Client is not yet connected to web3.");
            return;
          }

          let collectionModel = await nftCollectionService?.getCollectionInfo(
            chainName,
            collectionId,
            connect // Specifies that ABI has to be fetched
          );

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
      }}
    >
      {props.children}
    </NftCollectionServiceContext.Provider>
  );
};
