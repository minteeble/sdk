import { readContract, writeContract } from "wagmi/actions";
import {
  IERC721SmartContractInstance,
  ERC721SMartContractInstance,
} from "./ERC721SmartContractInstance";

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
