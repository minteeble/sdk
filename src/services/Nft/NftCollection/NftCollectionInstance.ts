import {
  INftCollectionInfoClientModel,
  NftCollectionInfoClientModel,
} from "@minteeble/utils";

/**
 * Interface model for NftCollectionInstance
 */
export interface INftCollectionInstance extends INftCollectionInfoClientModel {
  active: boolean;
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
  private _active: boolean;

  constructor(collectionModel?: NftCollectionInfoClientModel) {
    super();

    if (collectionModel) {
      this.address = collectionModel.address;
      this.chainName = collectionModel.chainName;
      this.collectionName = collectionModel.collectionName;
      this.resourceOwner = collectionModel.resourceOwner;
      this.type = collectionModel.type;
    }

    this._active = false;
  }

  public get active(): boolean {
    return this._active;
  }

  /**
   * Method for checking that the NftCollection instance is active.
   * If not active throws an exception.
   */
  protected requireActive(): void {
    if (!this.active) throw new Error("Collection not active.");
  }
}

// -----------------

/**
 * Interface for base IERC721 collection interfaces
 */
export interface IERC721Instance extends INftCollectionInstance {
  mintToken(amount: number): Promise<void>;
}

/**
 * Base IERC721 instance
 */
export class ERC721Instance
  extends NftCollectionInstance
  implements IMinteebleERC721AInstance
{
  public async mintToken(amount: number): Promise<void> {
    this.requireActive();

    console.log("Requested minting", amount);
  }
}

// -----------------

/**
 * Interface for Minteeble ERC721 collections
 */
export interface IMinteebleERC721AInstance extends IERC721Instance {}

/**
 * Interface for ERC721 collections
 */
export class MinteebleERC721AInstance
  extends ERC721Instance
  implements IMinteebleERC721AInstance {}
