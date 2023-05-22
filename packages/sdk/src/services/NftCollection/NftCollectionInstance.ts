import {
  INftCollectionInfoClientModel,
  NftCollectionInfoClientModel,
  SmartContractClientModel,
} from "@minteeble/utils";
import Web3 from "web3";
import {
  ERC1155SmartContractInstance,
  ERC721SMartContractInstance,
  IMinteebleERC1155SmartContractInstance,
  IMinteebleErc721SmartContractInstance,
  ISmartContractInstance,
  MinteebleDynamicCollectionSmartContractInstance,
  MinteebleERC1155SmartContractInstance,
  MinteebleErc721SmartContractInstance,
  MinteebleGadgetsSmartContractInstance,
  SmartContractInstance,
} from "../SmartContract";
import { SmartContractService } from "../SmartContract/SmartContractService";

/**
 * Interface model for NftCollectionInstance
 */
export interface INftCollectionInstance extends INftCollectionInfoClientModel {
  active: boolean;

  loadSmartContract(): Promise<ISmartContractInstance | null>;

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
      this.rendererId = collectionModel.rendererId;
      this.generationId = collectionModel.generationId;
    }

    this._active = false;
    this._web3 = web3 || null;
    this._smartContract = null;
  }

  public get active(): boolean {
    return this._active;
  }

  public async loadSmartContract(): Promise<SmartContractInstance | null> {
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

      this._smartContract = smartContract;

      return this._smartContract;
    } else throw new Error("Cannot load smart contract");
  }

  public async connect(): Promise<void> {
    if (!this._active) {
      if (!this._smartContract) await this.loadSmartContract();

      if (this._smartContract) await this._smartContract.connect();
      else throw new Error("Cannot load smart contract");

      if (this._smartContract.active) {
        this._active = true;
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
  extends IERC721CollectionInstance {
  loadSmartContract(): Promise<IMinteebleErc721SmartContractInstance | null>;
}

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

  public async loadSmartContract(): Promise<MinteebleErc721SmartContractInstance | null> {
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
      this._smartContract = smartContract;

      return this._smartContract;
    } else throw new Error("Cannot load smart contract");
  }
}

export interface IERC1155CollectionInstance extends INftCollectionInstance {}

export class ERC1155CollectionInstance
  extends NftCollectionInstance
  implements IERC1155CollectionInstance
{
  protected _smartContract: ERC1155SmartContractInstance;

  constructor(collectionModel: NftCollectionInfoClientModel, web3?: Web3) {
    super(collectionModel, web3);
  }

  public get smartContract() {
    return this._smartContract;
  }
}

export interface IMinteebleERC1155CollectionInstance
  extends IERC1155CollectionInstance {
  loadSmartContract(): Promise<IMinteebleERC1155SmartContractInstance | null>;
}

export class MinteebleERC1155CollectionInstance
  extends ERC1155CollectionInstance
  implements IMinteebleERC1155CollectionInstance
{
  protected _smartContract: MinteebleERC1155SmartContractInstance;

  constructor(collectionModel: NftCollectionInfoClientModel, web3?: Web3) {
    super(collectionModel, web3);
  }

  public get smartContract() {
    return this._smartContract;
  }

  public async loadSmartContract(): Promise<MinteebleERC1155SmartContractInstance | null> {
    let smartContractInfo =
      await SmartContractService.instance.getSmartContractInfo(
        this.chainName,
        this.smartContractId
      );

    if (smartContractInfo && this._web3) {
      let smartContract = new MinteebleERC1155SmartContractInstance(
        smartContractInfo,
        this._web3
      );

      this._smartContract = smartContract;

      return this._smartContract;
    } else throw new Error("Cannot load smart contract");
  }
}

export interface IMinteebleDynamiCollectionInstance
  extends IMintebleERC721CollectionInstance {
  loadSmartContract(): Promise<MinteebleDynamicCollectionSmartContractInstance | null>;
}

export class MinteebleDynamiCollectionInstance
  extends MinteebleERC721CollectionInstance
  implements IMinteebleDynamiCollectionInstance
{
  protected _smartContract: MinteebleDynamicCollectionSmartContractInstance;

  constructor(collectionModel: NftCollectionInfoClientModel, web3?: Web3) {
    super(collectionModel, web3);
  }

  public get smartContract() {
    return this._smartContract;
  }

  public async loadSmartContract(): Promise<MinteebleDynamicCollectionSmartContractInstance | null> {
    let smartContractInfo =
      await SmartContractService.instance.getSmartContractInfo(
        this.chainName,
        this.smartContractId
      );

    if (smartContractInfo && this._web3) {
      let smartContract = new MinteebleDynamicCollectionSmartContractInstance(
        smartContractInfo,
        this._web3
      );

      this._smartContract = smartContract;

      return this._smartContract;
    } else throw new Error("Cannot load smart contract");
  }
}

export interface IMinteebleGadgetsCollectionInstance
  extends IMinteebleERC1155CollectionInstance {
  loadSmartContract(): Promise<MinteebleGadgetsSmartContractInstance | null>;
}

export class MinteebleGadgetsCollectionInstance
  extends MinteebleERC1155CollectionInstance
  implements IMinteebleGadgetsCollectionInstance
{
  protected _smartContract: MinteebleGadgetsSmartContractInstance;

  constructor(collectionModel: NftCollectionInfoClientModel, web3?: Web3) {
    super(collectionModel, web3);
  }

  public get smartContract() {
    return this._smartContract;
  }

  public async loadSmartContract(): Promise<MinteebleGadgetsSmartContractInstance | null> {
    let smartContractInfo =
      await SmartContractService.instance.getSmartContractInfo(
        this.chainName,
        this.smartContractId
      );

    if (smartContractInfo && this._web3) {
      let smartContract = new MinteebleGadgetsSmartContractInstance(
        smartContractInfo,
        this._web3
      );

      this._smartContract = smartContract;

      return this._smartContract;
    } else throw new Error("Cannot load smart contract");
  }
}