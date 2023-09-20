import { readContract } from "wagmi/actions";
import {
  IERC1155SmartContractInstance,
  ERC1155SmartContractInstance,
} from "./ERC1155SmartContractInstance";

export interface IAccessControl {
  defaultAdminRole(): Promise<string>;

  hasRole(role: string, account: string): Promise<boolean>;

  hasAdminRole(account: string): Promise<boolean>;
}

export interface IMinteebleERC1155SmartContractInstance
  extends IERC1155SmartContractInstance,
    IAccessControl {
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
  public async defaultAdminRole(): Promise<string> {
    let role = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "DEFAULT_ADMIN_ROLE",
      args: [],
    });

    return role as any;
  }

  public async hasRole(role: string, account: string): Promise<boolean> {
    let result = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "hasRole",
      args: [role, account],
    });

    return result as any;
  }

  public async hasAdminRole(account: string): Promise<boolean> {
    return this.hasRole(await this.defaultAdminRole(), account);
  }

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
