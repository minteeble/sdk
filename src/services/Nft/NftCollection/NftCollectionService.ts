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
  NftCollectionInfoClientModel,
} from "@minteeble/utils";
import { API } from "aws-amplify";
import { BaseService } from "../../../shared/BaseService";

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
  ): Promise<any> => {
    let bodyPayload: ICreateNftCollectionRequestDto = {
      chainName,
      collectionName,
      address,
      type,
      resourceOwner,
    };

    try {
      let data = await this.apiCaller.post(`/collection`, {
        responseType: "text",
        body: bodyPayload,
      });

      return data as any;
    } catch (err) {
      console.log("Error on creating NftCollection:", err);
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
}

export default NftCollectionService;
