/**
 * Copyright (c) Minteeble 2022. All Rights Reserved.
 * Node module: @minteeble/sdk
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 *
 * Email:     minteeble@gmail.com
 * Website:   https://minteeble.com
 */

import {
  CreateNftCollectionRequestDto,
  ICreateNftCollectionRequestDto,
  INftCollectionInfoClientModel,
  NftCollectionInfoClientModel,
} from "@minteeble/utils";
import { API } from "aws-amplify";
import { JsonSerializer } from "typescript-json-serializer";
import { BaseService } from "../../../shared/BaseService";

const serializer = new JsonSerializer();

/**
 * Service class for handling NftCollections API
 */
class NftCollectionService extends BaseService {
  constructor() {
    super("nft-collection");
  }

  /**
   * Interacts with API for creating a new NftCollection
   *
   * @param chainName Chain name in which creating the NftCollection
   * @param collectionName Name tio be assigned to the collection
   * @param address Collection address
   * @param type COllection type (ERC721, etc.)
   * @param resourceOwner Address of the owner
   * @returns Status info
   */
  public createNftCollection = async (
    chainName: string,
    collectionName: string,
    address: string,
    type: string,
    resourceOwner: string
  ): Promise<INftCollectionInfoClientModel> => {
    let bodyPayload: ICreateNftCollectionRequestDto = {
      chainName,
      collectionName,
      address,
      type,
      resourceOwner,
      ABI: [],
    };

    try {
      let data = await this.apiCaller.post(`/collection`, {
        responseType: "text",
        body: bodyPayload,
      });

      return data as INftCollectionInfoClientModel;
    } catch (err) {
      console.log("Error on creating NftCollection:", err);
      throw err;
    }
  };

  public deleteNftCollection = async (
    chainName: string,
    collectionId: string
  ): Promise<void> => {
    try {
      await this.apiCaller.delete(
        `/collection/chain/${chainName}/id/${collectionId}`,
        {
          responseType: "text",
        }
      );
    } catch (err) {
      console.log("Error on deleting collection:", err);
      throw err;
    }
  };

  public setCustomABI = async (
    chainName: string,
    collectionId: string,
    customABI: any
  ): Promise<void> => {
    try {
      await this.apiCaller.put(
        `/collection/chain/${chainName}/id/${collectionId}/customABI`,
        {
          responseType: "text",
          body: { ABI: customABI },
        }
      );
    } catch (err) {
      console.log("Error on setting custom ABI:", err);
      throw err;
    }
  };

  public getUserNftCollections = async (
    user: string,
    chainName: string
  ): Promise<Array<NftCollectionInfoClientModel>> => {
    try {
      let data = await this.apiCaller.get(
        `/collection/chain/${chainName}/user/${user}`,
        {
          responseType: "text",
        }
      );

      return data.collections;
    } catch (err) {
      console.log("Error on getting collections:", err);
      throw err;
    }
  };

  /**
   * Gets the NftCollection info by specifying chain and ID
   *
   * @param chainName Chain name
   * @param collectionId Collection ID
   * @returns NftCollection info
   */
  public getCollectionInfo = async (
    chainName: string,
    collectionId: string,
    fetchAbi: boolean
  ): Promise<NftCollectionInfoClientModel | null> => {
    try {
      let reqInit: any = {
        responseType: "text",
      };

      if (fetchAbi) {
        reqInit.queryStringParameters = {
          fetchAbi: 1,
        };
      }

      let data = await this.apiCaller.get(
        `/collection/chain/${chainName}/id/${collectionId}`,
        reqInit
      );

      let collection =
        serializer.deserializeObject<NftCollectionInfoClientModel>(
          data,
          NftCollectionInfoClientModel
        );

      return collection || null;
    } catch (err) {
      console.log("Error on getting collection:", err);
      throw err;
    }
  };
}

export default NftCollectionService;
