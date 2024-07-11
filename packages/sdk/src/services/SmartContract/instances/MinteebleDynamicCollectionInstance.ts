import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "viem/actions";
import {
  IMinteebleErc721SmartContractInstance,
  MinteebleErc721SmartContractInstance,
} from "./MinteebleERC721ContractInstance";

export interface IMinteebleDynamicCollectionSmartContractInstance
  extends IMinteebleErc721SmartContractInstance {
  gadgetCollection(): Promise<string>;
  pairGadget(id: string, groupId: number, variationId: number): Promise<void>;
  unpairGadget(id: string, groupId: number, variationId: number): Promise<void>;
  getIteminfo(id: string): Promise<{ gadgets: Array<bigint> }>;
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
    if (!this._walletClient) throw new Error("No wallet connected");
    const hash = await writeContract(this._walletClient, {
      address: this.address as any,
      abi: this.abi,
      functionName: "pairGadget",
      account: this._walletClient.account!,
      args: [_id, _groupId, _variationId],
      chain: null,
    });

    await waitForTransactionReceipt(this._walletClient, {
      hash,
    });
  }

  public async unpairGadget(
    _id: string,
    _groupId: number,
    _variationId: number
  ): Promise<void> {
    if (!this._walletClient) throw new Error("No wallet connected");
    const hash = await writeContract(this._walletClient, {
      address: this.address as any,
      abi: this.abi,
      functionName: "unpairGadget",
      args: [_id, _groupId, _variationId],
      account: this._walletClient.account!,
      chain: null,
    });

    console.log("Triggered unpair");

    await waitForTransactionReceipt(this._walletClient, {
      hash,
    });

    console.log("Unpair completed");
  }

  public async getIteminfo(_id: string): Promise<{ gadgets: Array<bigint> }> {
    if (!this._walletClient) throw new Error("No wallet connected");
    let result = await readContract(this._walletClient!, {
      address: this.address as any,
      abi: this.abi,
      functionName: "getItemInfo",
      args: [_id],
    });

    return result as any;
  }
}
