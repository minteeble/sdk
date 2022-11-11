import {
  INftCollectionInfoClientModel,
  NftCollectionInfoClientModel,
} from "@minteeble/utils";

/**
 * Interface model for NftCollectionInstance
 */
export interface INftCollectionInstance extends INftCollectionInfoClientModel {
  isActive(): boolean;
}

/**
 * NftCollectionInstance class. Allows to interact with nft collections
 * registered on the platform.
 * There are to types of interaction: active ancd unactive.
 * In unactive mode no info are read from blockchain.
 * Instead, in active mode in can interact with blockchain (eg. mint functionalities)
 */
export class NftCollectionInstance
  extends NftCollectionInfoClientModel
  implements INftCollectionInstance
{
  /**
   * Specifies whether current instance is active or not
   */
  private active: boolean;

  constructor(collectionModel?: NftCollectionInfoClientModel) {
    super();

    if (collectionModel) {
      this.address = collectionModel.address;
      this.chainName = collectionModel.chainName;
      this.collectionName = collectionModel.collectionName;
      this.resourceOwner = collectionModel.resourceOwner;
      this.type = collectionModel.type;
    }

    this.active = false;
  }

  public isActive(): boolean {
    return this.active;
  }
}
