import {
  IMinteebleErc721SmartContractInstance,
  MinteebleErc721SmartContractInstance,
} from "./MinteebleERC721ContractInstance";

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
