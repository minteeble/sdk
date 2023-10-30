import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
import {
  IERC1155SmartContractInstance,
  ERC1155SmartContractInstance,
} from "./ERC1155SmartContractInstance";

export interface IAccessControl {
  defaultAdminRole(): Promise<string>;

  hasRole(role: string, account: string): Promise<boolean>;

  hasAdminRole(account: string): Promise<boolean>;
}

/**
 * Represents an instance of the MinteebleERC1155 smart contract.
 * Extends the IERC1155SmartContractInstance and IAccessControl interfaces.
 */
export interface IMinteebleERC1155SmartContractInstance
  extends IERC1155SmartContractInstance,
    IAccessControl {
  /**
   * Returns the total supply of tokens with the given ID.
   * @param id The ID of the token.
   * @returns A Promise that resolves to a bigint representing the total supply of tokens.
   */
  totalSupply(id: number): Promise<bigint>;

  /**
   * Returns the price to mint a single token with the given ID.
   * @param id The ID of the token.
   * @returns A Promise that resolves to a bigint representing the price to mint a single token.
   */
  mintPrice(id: number): Promise<bigint>;

  /**
   * Returns the prices to mint multiple tokens with the given IDs.
   * @param ids An array of token IDs.
   * @returns A Promise that resolves to an array of bigints representing the prices to mint each token.
   */
  batchMintPrice(ids: Array<number>): Promise<Array<bigint>>;

  /**
   * Returns the estimated transaction fees to mint a given amount of tokens with the given ID.
   * @param id The ID of the token.
   * @param mintAmount The amount of tokens to mint.
   * @returns A Promise that resolves to a bigint representing the estimated transaction fees.
   */
  estimatedMintTrxFees(id: number, mintAmount: number): Promise<bigint>;

  /**
   * Mints the specified amount of tokens with the given ID.
   * @param id The ID of the token.
   * @param amount The amount of tokens to mint.
   * @returns A Promise that resolves when the transaction is complete.
   */
  mintToken(id: number, amount: number): Promise<void>;

  /**
   * Mints the specified amount of tokens with the given ID for the specified account.
   *
   * @param recipientAccount The account to mint the tokens for.
   * @param ids The IDs of the tokens to mint.
   * @param amounts The amounts of the tokens to mint.
   */
  mintTokenBatchForAddress(
    recipientAccount: string,
    ids: number[],
    amounts: number[]
  ): Promise<void>;

  /**
   * Returns the balance of the specified account for the specified token ID.
   * @param account The account to check the balance of.
   * @param id The ID of the token.
   * @returns A Promise that resolves to the balance of the account for the specified token ID.
   */
  balanceOf(account: string, id: number): Promise<number>;

  /**
   * Returns the balances of the specified accounts for the specified token IDs.
   * @param accounts An array of accounts to check the balances of.
   * @param ids An array of token IDs.
   * @returns A Promise that resolves to an array of balances for the specified accounts and token IDs.
   */
  balanceOfBatch(
    accounts: Array<string>,
    ids: Array<number>
  ): Promise<Array<number>>;

  /**
   * Returns the balances of the specified account for the specified token IDs.
   * @param account The account to check the balances of.
   * @param ids An array of token IDs.
   * @returns A Promise that resolves to an array of balances for the specified account and token IDs.
   */
  balanceOfIds(account: string, ids: Array<number>): Promise<Array<number>>;

  /**
   * Returns whether the specified operator is approved to manage all of the specified account's tokens.
   * @param account The account to check.
   * @param operator The operator to check.
   * @returns A Promise that resolves to a boolean indicating whether the operator is approved.
   */
  isApprovedForAll(account: string, operator: string): Promise<boolean>;

  /**
   * Sets whether the specified operator is approved to manage all of the specified account's tokens.
   * @param operator The operator to set approval for.
   * @param approved Whether to approve or revoke approval.
   * @returns A Promise that resolves when the transaction is complete.
   */
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
    const adminRole = await this.defaultAdminRole();
    return this.hasRole(adminRole, account);
  }

  public async totalSupply(id: number): Promise<bigint> {
    let result = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "totalSupply",
      args: [id],
    });

    return result as any;
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

    let price = await this.mintPrice(_id);

    let { hash } = await writeContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "mint",
      args: [_id, _amount],
      value: price * BigInt(_amount),
    });

    await waitForTransaction({
      hash,
    });
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
    this.requireActive();

    let res: any = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "isApprovedForAll",
      args: [_account, _operator],
    });

    return !!res;
  }

  public async setApprovalForAll(
    _operator: string,
    _approved: boolean
  ): Promise<void> {
    this.requireActive();

    let { hash } = await writeContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "setApprovalForAll",
      args: [_operator, _approved],
    });

    await waitForTransaction({
      hash,
    });
  }

  public async batchMintPrice(ids: Array<number>): Promise<Array<bigint>> {
    let prices: any[] = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "batchMintPrice",
      args: [ids],
    });

    return prices.map((price) => BigInt(price));
  }

  public async mintTokenBatchForAddress(
    recipientAccount: string,
    ids: number[],
    amounts: number[]
  ): Promise<void> {
    this.requireActive();

    let prices = await this.batchMintPrice(ids);

    let { hash } = await writeContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "mintBatchForAddress",
      args: [recipientAccount, ids, amounts],
      value: prices.reduce((a, b) => a + b, BigInt(0)),
    });

    await waitForTransaction({
      hash,
    });
  }
}
