import {
  INftCollectionInfoClientModel,
  ISmartContractClientModel,
  SmartContractClientModel,
} from "@minteeble/utils";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import * as BN from "bn.js";

export interface ISmartContractInstance extends ISmartContractClientModel {
  active: boolean;

  connect(): Promise<void>;
}

export class SmartContractInstance
  extends SmartContractClientModel
  implements ISmartContractInstance
{
  private _active: boolean;

  protected _web3: Web3 | null;

  protected _contract: Contract | null;

  constructor(smartContractModel?: SmartContractClientModel, web3?: Web3) {
    super();

    if (smartContractModel) {
      this.address = smartContractModel.address;
      this.chainName = smartContractModel.chainName;
      this.owner = smartContractModel.owner;
      this.type = smartContractModel.type;
      this.id = smartContractModel.id;
      this.abi = smartContractModel.abi;
    }

    this._active = false;
    this._web3 = web3 || null;
    this._contract = null;
  }

  public get active(): boolean {
    return this._active;
  }

  protected requireActive(): void {
    if (!this.active || !this._web3) throw new Error("Collection not active.");
  }

  public async connect(): Promise<void> {
    if (!this._active && this._web3) {
      console.log("Using abi:", this.abi);
      let contract = new this._web3.eth.Contract(this.abi as any, this.address);
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

export interface IERC721SmartContractInstance extends ISmartContractInstance {
  getOwner(): Promise<string | null>;

  ownedIds(ownerAddress: string): Promise<Array<string>>;
}

export class ERC721SMartContractInstance
  extends SmartContractInstance
  implements IERC721SmartContractInstance
{
  public async getOwner(): Promise<string | null> {
    this.requireActive();

    return await this._contract?.methods.owner().call();
  }

  public async ownedIds(ownerAddress: string): Promise<Array<string>> {
    this.requireActive();

    let ids = await this._contract?.methods.walletOfOwner(ownerAddress).call();

    return ids;
  }
}

export interface IMinteebleErc721SmartContractInstance
  extends IERC721SmartContractInstance {
  mintToken(amount: number): Promise<void>;

  mintPrice(): Promise<BN>;

  estimatedMintTrxFees(mintAmount: number): Promise<BN>;

  isPaused(): Promise<boolean>;

  setPaused(pausedState: boolean): Promise<void>;

  maxMintAmountPerTrx(): Promise<number>;

  setMaxMintAmountPerTrx(): Promise<void>;
}

export class MinteebleErc721SmartContractInstance
  extends ERC721SMartContractInstance
  implements IMinteebleErc721SmartContractInstance
{
  public override async getOwner(): Promise<string | null> {
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

  public async estimatedMintTrxFees(mintAmount: number): Promise<BN> {
    let accounts = await this._web3!.eth.getAccounts();
    let mintPrice = await this.mintPrice();
    let gasPrice = await this._web3?.eth.getGasPrice();
    if (gasPrice) {
      let gas = await this.contract?.methods.mint(mintAmount).estimateGas({
        from: accounts[0],
        value: new BN.BN(mintPrice).muln(mintAmount).toString(),
      });

      return new BN.BN(gas).mul(new BN.BN(gasPrice));
    } else throw new Error("Error on getting gas price");
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
