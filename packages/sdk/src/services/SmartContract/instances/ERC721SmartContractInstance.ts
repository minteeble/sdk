import { readContract } from "viem/actions";
import {
  ISmartContractInstance,
  SmartContractInstance,
} from "../SmartContractInstance";

export interface IERC721SmartContractInstance extends ISmartContractInstance {
  getOwner(): Promise<string | null>;

  ownedIds(ownerAddress: string): Promise<Array<string>>;

  getTotalSupply(): Promise<number>;
  getMaxSupply(): Promise<number>;
}

export class ERC721SMartContractInstance
  extends SmartContractInstance
  implements IERC721SmartContractInstance
{
  public async getOwner(): Promise<string | null> {
    this.requireActive();

    let owner: any = await readContract(this._walletClient!, {
      address: this.address as any,
      abi: this.abi,
      functionName: "owner",
      args: [],
    });

    return owner || null;
  }

  public async ownedIds(ownerAddress: string): Promise<Array<string>> {
    this.requireActive();

    let ids: any = await readContract(this._walletClient!, {
      address: this.address as any,
      abi: this.abi,
      functionName: "walletOfOwner",
      args: [ownerAddress],
    });

    return ids;
  }

  public async getTotalSupply(): Promise<number> {
    this.requireActive();

    const totalSupply: any = await readContract(this._walletClient!, {
      address: this.address as any,
      abi: this.abi,
      functionName: "totalSupply",
      args: [],
    });

    return totalSupply;
  }

  public async getMaxSupply(): Promise<number> {
    this.requireActive();

    const maxSupply: any = await readContract(this._walletClient!, {
      address: this.address as any,
      abi: this.abi,
      functionName: "maxSupply",
      args: [],
    });

    return maxSupply;
  }
}
