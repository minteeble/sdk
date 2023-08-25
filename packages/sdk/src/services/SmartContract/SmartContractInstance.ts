import {
  INftCollectionInfoClientModel,
  ISmartContractClientModel,
  SmartContractClientModel,
} from "@minteeble/utils";
import { WalletClient } from "viem";
import {
  fetchBlockNumber,
  signMessage,
  getContract,
  readContract,
  writeContract,
  GetContractResult,
} from "wagmi/actions";

export interface ISmartContractInstance extends ISmartContractClientModel {
  active: boolean;

  connect(): Promise<void>;
}

export class SmartContractInstance
  extends SmartContractClientModel
  implements ISmartContractInstance
{
  private _active: boolean;

  protected _walletClient: WalletClient | null;

  protected _contract: GetContractResult<any, any> | null;

  constructor(
    smartContractModel?: SmartContractClientModel,
    walletClient?: WalletClient
  ) {
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
    this._walletClient = walletClient || null;
    this._contract = null;
  }

  public get active(): boolean {
    return this._active;
  }

  protected requireActive(): void {
    if (!this.active || !this._walletClient)
      throw new Error("Collection not active.");
  }

  public async connect(): Promise<void> {
    if (!this._active && this._walletClient) {
      let contract = getContract({
        abi: this.abi,
        address: this.address as any,
      });
      // contract.
      // let contract = new this._walletClient.eth.Contract(
      //   this.abi as any,
      //   this.address
      // );
      this._contract = contract || null;
      this._active = true;
    }
  }

  /**
   * Returns web3 contract object is instance is active. Returns null otherwise
   */
  public get contract(): GetContractResult<any, any> | null {
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

    let owner: any = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "owner",
      args: [],
    });

    return owner || null;
  }

  public async ownedIds(ownerAddress: string): Promise<Array<string>> {
    this.requireActive();

    let ids: any = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "walletOfOwner",
      args: [ownerAddress],
    });

    return ids;
  }
}

export interface IMinteebleErc721SmartContractInstance
  extends IERC721SmartContractInstance {
  mintToken(amount: number): Promise<void>;

  mintPrice(): Promise<bigint>;

  estimatedMintTrxFees(mintAmount: number): Promise<bigint>;

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

    let owner: any = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "owner",
      args: [],
    });

    return owner || null;
  }

  public async mintToken(amount: number): Promise<void> {
    // TODO here
    // this.requireActive();

    console.log("REQUESTED MINT", amount);

    let price = await this.mintPrice();
    let value = price * BigInt(amount);

    let { hash } = await writeContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "mint",
      args: [amount],
      value: value,
    });

    console.log("TRX", hash);
  }

  public async mintPrice(): Promise<bigint> {
    let price = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "mintPrice",
      args: [],
    });

    return price as any;
  }

  public async estimatedMintTrxFees(_mintAmount: number): Promise<bigint> {
    return BigInt(0);
    //TODO implement in viem

    // let accounts = await this._web3!.eth.getAccounts();
    // let mintPrice = await this.mintPrice();
    // let gasPrice = await this._web3?.eth.getGasPrice();
    // if (gasPrice) {
    //   let gas = await (this.contract?.methods.mint as any)(
    //     mintAmount
    //   ).estimateGas({
    //     from: accounts[0],
    //     value: mintPrice * BigInt(mintAmount),
    //   });

    //   return gas * gasPrice;
    // } else throw new Error("Error on getting gas price");
  }

  public async isPaused(): Promise<boolean> {
    let pausedState = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "paused",
      args: [],
    });

    return pausedState as unknown as boolean;
  }

  public async setPaused(_pausedState: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async maxMintAmountPerTrx(): Promise<number> {
    let amount = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "maxMintAmountPerTrx",
      args: [],
    });

    return amount as any;
  }

  public async setMaxMintAmountPerTrx(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export interface IERC1155SmartContractInstance extends ISmartContractInstance {}

export class ERC1155SmartContractInstance
  extends SmartContractInstance
  implements IERC1155SmartContractInstance {}

export interface IMinteebleERC1155SmartContractInstance
  extends IERC1155SmartContractInstance {
  mintPrice(id: number): Promise<bigint>;

  estimatedMintTrxFees(id: number, mintAmount: number): Promise<bigint>;

  mintToken(id: number, amount: number): Promise<void>;

  balanceOf(account: string, id: number): Promise<number>;

  balanceOfBatch(
    accounts: Array<string>,
    ids: Array<number>
  ): Promise<Array<number>>;

  balanceOfIds(account: string, ids: Array<number>): Promise<Array<number>>;

  isApprovedForAll(account: string, operator: string): Promise<boolean>;

  setApprovalForAll(operator: string, approved: boolean): Promise<void>;
}

export class MinteebleERC1155SmartContractInstance
  extends ERC1155SmartContractInstance
  implements IMinteebleERC1155SmartContractInstance
{
  public async mintPrice(id: number): Promise<bigint> {
    let price = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "mintPrice",
      args: [id],
    });

    return price as any;
  }

  public async estimatedMintTrxFees(
    _id: number,
    _mintAmount: number
  ): Promise<bigint> {
    return BigInt(0);

    //TODO Implement in viem

    // let accounts = await this._web3!.eth.getAccounts();
    // let mintPrice = await this.mintPrice(id);
    // let gasPrice = await this._web3?.eth.getGasPrice();
    // if (gasPrice) {
    //   let gas = await (this.contract?.methods.mint as any)(
    //     id,
    //     mintAmount
    //   ).estimateGas({
    //     from: accounts[0],
    //     value: mintPrice * BigInt(mintAmount),
    //   });

    //   return gas * gasPrice;
    // } else throw new Error("Error on getting gas price");
  }

  public async mintToken(_id: number, _amount: number): Promise<void> {
    this.requireActive();

    // TODO implement erc1155 mint

    // let price = await this.mintPrice(id);
    // let value = price * BigInt(amount);
    // let accounts = await this._web3!.eth.getAccounts();

    // let trx = await (this.contract!.methods.mint as any)(id, amount).send({
    //   value: value.toString(),
    //   from: accounts[0],
    // });
  }

  public async balanceOf(_account: string): Promise<number> {
    this.requireActive();

    let balance: any = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "balanceOf",
      args: [],
    });

    return parseInt(balance);
  }

  public async balanceOfIds(
    account: string,
    ids: Array<number>
  ): Promise<Array<number>> {
    this.requireActive();

    return this.balanceOfBatch(Array(ids.length).fill(account), ids);
  }

  public async balanceOfBatch(
    accounts: Array<String>,
    ids: Array<number>
  ): Promise<Array<number>> {
    this.requireActive();

    let balances: any[] = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "balanceOfBatch",
      args: [accounts, ids],
    });

    return balances.map((balance) => parseInt(balance));
  }

  public async isApprovedForAll(
    _account: string,
    _operator: string
  ): Promise<boolean> {
    return false;
    // TODO implement

    // this.requireActive();

    // return await (this.contract?.methods.isApprovedForAll as any)(
    //   account,
    //   operator
    // ).call();
  }

  public async setApprovalForAll(
    _operator: string,
    _approved: boolean
  ): Promise<void> {
    // TODO impleemnt in viem
    // this.requireActive();
    // let accounts = await this._web3!.eth.getAccounts();
    // await (this.contract?.methods.setApprovalForAll as any)(
    //   operator,
    //   approved
    // ).send({ from: accounts[0] });
  }
}

export interface IMinteebleDynamicCollectionSmartContractInstance
  extends IMinteebleErc721SmartContractInstance {
  gadgetCollection(): Promise<string>;
  pairGadget(id: string, groupId: number, variationId: number): Promise<void>;
}

export class MinteebleDynamicCollectionSmartContractInstance
  extends MinteebleErc721SmartContractInstance
  implements IMinteebleDynamicCollectionSmartContractInstance
{
  public async gadgetCollection(): Promise<string> {
    return "";
    // TOTO implement
    // this.requireActive();

    // return this.contract?.methods.gadgetCollection().call() || "";
  }

  public async pairGadget(
    _id: string,
    _groupId: number,
    _variationId: number
  ): Promise<void> {
    // TODO impleemnt in viem
    // let accounts = await this._web3!.eth.getAccounts();
    // console.log("Input data", id, groupId, variationId);
    // await (this.contract?.methods.pairGadget as any)(
    //   id,
    //   groupId,
    //   variationId
    // ).send({ from: accounts[0] });
  }
}

export interface IMinteebleGadgetsSmartContractInstance
  extends IMinteebleERC1155SmartContractInstance {
  groupIdToTokenId(groupId: number, variationId: number): Promise<number>;

  tokenIdToGroupId(
    tokenId: number
  ): Promise<{ groupId: number; variationId: number }>;
}

export class MinteebleGadgetsSmartContractInstance
  extends MinteebleERC1155SmartContractInstance
  implements IMinteebleGadgetsSmartContractInstance
{
  public async groupIdToTokenId(
    _groupId: number,
    _variationId: number
  ): Promise<number> {
    return 0;
    // TODO
    // this.requireActive();
    // let tokenId = await (this.contract?.methods.groupIdToTokenId as any)(
    //   groupId,
    //   variationId
    // ).call();
    // return parseInt(tokenId);
  }

  public async tokenIdToGroupId(
    _tokenId: number
  ): Promise<{ groupId: number; variationId: number }> {
    return { groupId: 0, variationId: 0 };
    // TODO
    // this.requireActive();

    // let groupInfo = await (this.contract?.methods.tokenIdToGroupId as any)(
    //   tokenId
    // ).call();
    // console.log("GroupInfo:", groupInfo);

    // return {
    //   groupId: parseInt(groupInfo[0]),
    //   variationId: parseInt(groupInfo[1]),
    // };
  }
}
