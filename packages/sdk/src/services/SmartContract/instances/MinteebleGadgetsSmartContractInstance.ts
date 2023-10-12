import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
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

  getGadgetGroups(): Promise<bigint>;

  getGadgetGroupVariations(groupId: number): Promise<bigint>;

  addVariation(groupId: number): Promise<void>;
}

export class MinteebleGadgetsSmartContractInstance
  extends MinteebleERC1155SmartContractInstance
  implements IMinteebleGadgetsSmartContractInstance
{
  public async groupIdToTokenId(
    _groupId: number,
    _variationId: number
  ): Promise<number> {
    let tokenId = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "groupIdToTokenId",
      args: [_groupId, _variationId],
    });

    return tokenId as any;
  }

  public async tokenIdToGroupId(
    _tokenId: number
  ): Promise<{ groupId: number; variationId: number }> {
    let result = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "tokenIdToGroupId",
      args: [_tokenId],
    });

    return result as any;
    // return { groupId: 0, variationId: 0 };
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

  public async getGadgetGroups(): Promise<bigint> {
    let result = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "getGadgetGroups",
      args: [],
    });

    return result as any;
  }

  public async getGadgetGroupVariations(groupId: number): Promise<bigint> {
    let result = await readContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "getGadgetGroupVariations",
      args: [groupId],
    });

    return result as any;
  }

  public async addVariation(groupId: number): Promise<void> {
    let { hash } = await writeContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "addVariation",
      args: [groupId],
    });

    await waitForTransaction({
      hash,
    });
  }
}
