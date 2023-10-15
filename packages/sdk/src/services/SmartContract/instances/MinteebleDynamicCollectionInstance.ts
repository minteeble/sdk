import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
import {
  IMinteebleErc721SmartContractInstance,
  MinteebleErc721SmartContractInstance,
} from "./MinteebleERC721ContractInstance";

export interface IMinteebleDynamicCollectionSmartContractInstance
  extends IMinteebleErc721SmartContractInstance {
  gadgetCollection(): Promise<string>;
  pairGadget(id: string, groupId: number, variationId: number): Promise<void>;
  unpairGadget(id: string, groupId: number, variationId: number): Promise<void>;
  getIteminfo(id: string): Promise<Array<number>>;
}

export class MinteebleDynamicCollectionSmartContractInstance
  extends MinteebleErc721SmartContractInstance
  implements IMinteebleDynamicCollectionSmartContractInstance
{
  public async gadgetCollection(): Promise<string> {
    throw new Error("Method not implemented.");
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
    let { hash } = await writeContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "pairGadget",
      args: [_id, _groupId, _variationId],
    });

    await waitForTransaction({
      hash,
    });
  }

  public async unpairGadget(
    _id: string,
    _groupId: number,
    _variationId: number
  ): Promise<void> {
    let { hash } = await writeContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "unpairGadget",
      args: [_id, _groupId, _variationId],
    });

    await waitForTransaction({
      hash,
    });
  }

  public async getIteminfo(_id: string): Promise<Array<number>> {
    let result = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "getIteminfo",
      args: [_id],
    });

    return result.map((item) => Number(item)) as any;
  }
}
