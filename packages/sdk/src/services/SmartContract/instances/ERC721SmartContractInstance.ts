import { readContract } from "wagmi/actions";
import {
  ISmartContractInstance,
  SmartContractInstance,
} from "../SmartContractInstance";

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
