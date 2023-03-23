import {
  INftCollectionInfoClientModel,
  NftCollectionInfoClientModel,
  SmartContractClientModel,
} from "@minteeble/utils";
import Web3 from "web3";
import {
  ERC721SMartContractInstance,
  MinteebleErc721SmartContractInstance,
  SmartContractInstance,
} from "../SmartContract";
import { SmartContractService } from "../SmartContract/SmartContractService";

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
  protected _active: boolean;

  protected _smartContract: SmartContractInstance | null;

  protected _web3: Web3 | null;

  constructor(collectionModel: NftCollectionInfoClientModel, web3?: Web3) {
    super();

    if (collectionModel) {
      this.collectionName = collectionModel.collectionName;
      this.description = collectionModel.description;
      this.logo = collectionModel.logo;
      this.chainName = collectionModel.chainName;
      this.resourceOwner = collectionModel.resourceOwner;
      this.type = collectionModel.type;
      this.collectionId = collectionModel.collectionId;
      this.smartContractId = collectionModel.smartContractId;
    }

    this._active = false;
    this._web3 = web3 || null;
    this._smartContract = null;
  }

  public get active(): boolean {
    return this._active;
  }

  public async connect(): Promise<void> {
    if (!this._active) {
      let smartContractInfo =
        await SmartContractService.instance.getSmartContractInfo(
          this.chainName,
          this.smartContractId
        );

      if (smartContractInfo && this._web3) {
        let smartContract = new SmartContractInstance(
          smartContractInfo,
          this._web3
        );

        console.log("Using smart contract", smartContract);
        await smartContract.connect();

        if (smartContract.active) {
          // @ts-ignore
          this._smartContract = smartContract;
          this._active = true;
        }
      } else throw new Error("Cannot load smart contract");
    }
  }

  /**
   * Method for checking that the NftCollection instance is active.
   * If not active throws an exception.
   */
  protected requireActive(): void {
    if (!this.active) throw new Error("Collection not active.");
  }

  public get smartContract(): SmartContractInstance | null {
    return this._smartContract;
  }
}

export interface IERC721CollectionInstance extends INftCollectionInstance {}

export class ERC721CollectionInstance
  extends NftCollectionInstance
  implements IERC721CollectionInstance
{
  protected _smartContract: ERC721SMartContractInstance;

  constructor(collectionModel: NftCollectionInfoClientModel, web3?: Web3) {
    super(collectionModel, web3);
  }

  public get smartContract() {
    return this._smartContract;
  }
}

export interface IMintebleERC721CollectionInstance
  extends IERC721CollectionInstance {}

export class MinteebleERC721CollectionInstance
  extends ERC721CollectionInstance
  implements IMintebleERC721CollectionInstance
{
  protected _smartContract: MinteebleErc721SmartContractInstance;

  constructor(collectionModel: NftCollectionInfoClientModel, web3?: Web3) {
    super(collectionModel, web3);
  }

  public get smartContract() {
    return this._smartContract;
  }

  public async connect(): Promise<void> {
    if (!this._active) {
      let smartContractInfo =
        await SmartContractService.instance.getSmartContractInfo(
          this.chainName,
          this.smartContractId
        );

      if (smartContractInfo && this._web3) {
        let smartContract = new MinteebleErc721SmartContractInstance(
          smartContractInfo,
          this._web3
        );

        console.log("Using smart contract", smartContract);
        await smartContract.connect();

        if (smartContract.active) {
          // @ts-ignore
          this._smartContract = smartContract;
          this._active = true;
        }
      } else throw new Error("Cannot load smart contract");
    }
  }
}
