import {
  INftCollectionInfoClientModel,
  NftCollectionInfoClientModel,
} from "@minteeble/utils";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import * as BN from "bn.js";

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
      this.collectionId = collectionModel.collectionId;
      this.ABI = collectionModel.ABI;
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
    if (!this.active || !this._web3) throw new Error("Collection not active.");
  }

  public async connect(): Promise<void> {
    if (!this._active && this._web3) {
      console.log("Using abi:", this.ABI);
      let contract = new this._web3.eth.Contract(
        this.ABI.ABI as any,
        this.address
      );

      this._contract = contract || null;
      this._active = true;
    }
  }

  /**
   * Returns web3 contract object is instance is active. Returns null otherwise
   */
  public get contract(): Contract | null {
    return this._contract || null;
  }
}

// -----------------

/**
 * Interface for base IERC721 collection interfaces
 */
export interface IERC721Instance extends INftCollectionInstance {
  owner(): Promise<string | null>;

  ownedIds(ownerAddress: string): Promise<Array<number>>;
}

/**
 * Base IERC721 instance
 */
export class ERC721Instance
  extends NftCollectionInstance
  implements IERC721Instance
{
  public async owner(): Promise<string | null> {
    this.requireActive();

    return await this._contract?.methods.owner().call();
  }

  public async ownedIds(ownerAddress: string): Promise<Array<number>> {
    this.requireActive();

    let ids = await this._contract?.methods.walletOfOwner(ownerAddress).call();

    return ids;
  }
}

// -----------------

/**
 * Interface for Minteeble ERC721 collections
 */
export interface IMinteebleERC721AInstance extends IERC721Instance {
  mintToken(amount: number): Promise<void>;

  mintPrice(): Promise<BN>;

  isPaused(): Promise<boolean>;

  setPaused(pausedState: boolean): Promise<void>;

  maxMintAmountPerTrx(): Promise<number>;

  setMaxMintAmountPerTrx(): Promise<void>;
}

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

  public async mintToken(amount: number): Promise<void> {
    this.requireActive();

    let price = await this.mintPrice();
    let value = price.muln(amount).toString();
    let accounts = await this._web3!.eth.getAccounts();

    console.log("Mint with value", {
      value: value,
      from: accounts[0],
    });

    let trx = await this.contract!.methods.mint(amount).send({
      value: value,
      from: accounts[0],
    });

    console.log("Trx:", trx);
  }

  public async mintPrice(): Promise<BN> {
    let price = await this.contract?.methods.mintPrice().call();
    let priceNum = this._web3!.utils.toBN(price);

    return priceNum;
  }

  public async isPaused(): Promise<boolean> {
    let pausedState = await this.contract?.methods.paused().call();

    return pausedState;
  }

  public async setPaused(_pausedState: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async maxMintAmountPerTrx(): Promise<number> {
    let amount = await this.contract?.methods.maxMintAmountPerTrx().call();

    return amount;
  }

  public async setMaxMintAmountPerTrx(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

// ----------

export interface IMinteebleStaticMutationInstance
  extends IMinteebleERC721AInstance {
  mintMutant(oldCollectionId: number, serumId: number): Promise<void>;
}

export class MinteebleStaticMutationInstance
  extends MinteebleERC721AInstance
  implements IMinteebleStaticMutationInstance
{
  public async mintMutant(
    oldCollectionId: number,
    serumId: number
  ): Promise<void> {
    this.requireActive();

    console.log(oldCollectionId, serumId);
  }
}
