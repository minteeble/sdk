import {
  CollectionType,
  NetworkUtils,
  NftCollectionInfoClientModel,
} from "@minteeble/utils";
import { useEffect, useState } from "react";
import NftCollectionService from "./NftCollectionService";
import { NftCollectionServiceContext } from "./NftCollectionServiceContext";
import React from "react";
import {
  ERC1155CollectionInstance,
  ERC721CollectionInstance,
  MinteebleDynamiCollectionInstance,
  MinteebleERC1155CollectionInstance,
  MinteebleERC721CollectionInstance,
  MinteebleGadgetsCollectionInstance,
  NftCollectionInstance,
} from "./NftCollectionInstance";
import { useWalletService } from "../WalletService";
import { SmartContractInstance } from "../SmartContract";
import { EnvironmentType, EnvManager } from "../../models";

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

  let { walletAddress, walletClient } = useWalletService();

  useEffect(() => {
    let service = new NftCollectionService();

    setNftCollectionService(service);
  }, []);

  const createNftCollection = async (
    nftCollection: NftCollectionInfoClientModel,
    address: string
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await nftCollectionService?.createNftCollection(
          nftCollection.chainName,
          nftCollection.collectionName,
          address,
          nftCollection.type,
          nftCollection.resourceOwner,
          nftCollection.description
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
    chainName?: string
  ): Promise<Array<NftCollectionInfoClientModel>> => {
    if (chainName) {
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
    } else {
      let chains =
        EnvManager.environment === EnvironmentType.Prod
          ? NetworkUtils.getMainnetNetworks()
          : NetworkUtils.getTestnetNetworks();

      let results = await Promise.all(
        chains.map((chain) => getUserNftCollections(user, chain.urlName))
      );

      let tot: any[] = [];

      results.forEach((items) => {
        tot = [...tot, ...items];
      });

      return tot;
    }
  };

  const getCollectionInstance = async (
    chainName: string,
    collectionId: string,
    connect: boolean
  ): Promise<NftCollectionInstance | null> => {
    return new Promise<NftCollectionInstance | null>(
      async (resolve, reject) => {
        try {
          if (connect && !walletClient) {
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

          if (collectionModel && walletClient) {
            if (
              collectionModel.type === "MINTEEBLE_ERC721" ||
              collectionModel.type === "MinteebleERC721A"
            ) {
              collectionInstance = new MinteebleERC721CollectionInstance(
                collectionModel,
                walletClient
              );
            } else if (collectionModel.type === "MINTEEBLE_ERC1155") {
              collectionInstance = new MinteebleERC1155CollectionInstance(
                collectionModel,
                walletClient
              );
            } else if (collectionModel.type === "ERC1155") {
              collectionInstance = new ERC1155CollectionInstance(
                collectionModel,
                walletClient
              );
            } else if (
              collectionModel.type === CollectionType.MINTEEBLE_GADGETS
            ) {
              collectionInstance = new MinteebleGadgetsCollectionInstance(
                collectionModel,
                walletClient
              );
            } else if (
              collectionModel.type ===
              CollectionType.MINTEEBLE_DYNAMIC_COLLECTION
            ) {
              collectionInstance = new MinteebleDynamiCollectionInstance(
                collectionModel,
                walletClient
              );
            } else if (collectionModel.type === CollectionType.ERC721) {
              collectionInstance = new ERC721CollectionInstance(
                collectionModel,
                walletClient
              );
            }

            if (connect && collectionInstance) {
              await collectionInstance.connect();
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

  const updateCollectionInfo = async (
    collection: NftCollectionInfoClientModel
  ): Promise<void> => {
    return nftCollectionService?.updateCollectionInfo(collection);
  };

  const getNftImageUrl = (
    collectionId: string,
    chainName: string,
    tokenId: number,
    size?: number,
    showMutation?: boolean
  ): string => {
    return (
      nftCollectionService?.getNftImageUrl(
        collectionId,
        chainName,
        tokenId,
        size,
        showMutation
      ) || ""
    );
  };

  const getNftMetadataUrl = (
    collectionId: string,
    chainName: string,
    tokenId: number,
    showMutation?: boolean
  ): string => {
    return (
      nftCollectionService?.getNftMetadataUrl(
        collectionId,
        chainName,
        tokenId,
        showMutation
      ) || ""
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
        updateCollectionInfo,
        getNftImageUrl,
        getNftMetadataUrl,
      }}
    >
      {props.children}
    </NftCollectionServiceContext.Provider>
  );
};
