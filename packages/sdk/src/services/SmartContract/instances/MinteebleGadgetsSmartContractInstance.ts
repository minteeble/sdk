import {
  IMinteebleERC1155SmartContractInstance,
  MinteebleERC1155SmartContractInstance,
} from "./MinteebleERC1155ContractInstance";

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
