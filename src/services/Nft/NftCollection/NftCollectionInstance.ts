import {
  INftCollectionInfoClientModel,
  NftCollectionInfoClientModel,
} from "@minteeble/utils";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

/**
 * Interface model for NftCollectionInstance
 */
export interface INftCollectionInstance extends INftCollectionInfoClientModel {
  active: boolean;

  connect(): Promise<void>;
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

  protected _web3: Web3 | null;

  protected _contract: Contract | null;

  constructor(collectionModel?: NftCollectionInfoClientModel, web3?: Web3) {
    super();

    if (collectionModel) {
      this.address = collectionModel.address;
      this.chainName = collectionModel.chainName;
      this.collectionName = collectionModel.collectionName;
      this.resourceOwner = collectionModel.resourceOwner;
      this.type = collectionModel.type;
      this.abi = collectionModel.abi;
    }

    this._active = false;
    this._web3 = web3 || null;
    this._contract = null;
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

  public async connect(): Promise<void> {
    if (!this._active && this._web3) {
      console.log("Using abi:", this.abi);
      let contract = new this._web3.eth.Contract(
        this.abi.abi as any,
        this.address
      );

      this._contract = contract || null;
      this._active = true;
    }
  }
}

// -----------------

/**
 * Interface for base IERC721 collection interfaces
 */
export interface IERC721Instance extends INftCollectionInstance {
  mintToken(amount: number): Promise<void>;

  owner(): Promise<string | null>;
}

/**
 * Base IERC721 instance
 */
export class ERC721Instance
  extends NftCollectionInstance
  implements IERC721Instance
{
  public async mintToken(amount: number): Promise<void> {
    this.requireActive();

    console.log("Requested minting", amount);
  }

  public async owner(): Promise<string | null> {
    this.requireActive();

    return await this._contract?.methods.owner().call();
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
  implements IMinteebleERC721AInstance
{
  public override async owner(): Promise<string | null> {
    this.requireActive();

    return await this._contract?.methods.owner().call();
  }
}
