import { readContract, waitForTransaction, writeContract } from "wagmi/actions";
import {
  IMinteebleERC1155SmartContractInstance,
  MinteebleERC1155SmartContractInstance,
} from "./MinteebleERC1155ContractInstance";

/**
 * Represents an instance of the Minteeble Gadgets smart contract.
 * Extends the IMinteebleERC1155SmartContractInstance interface.
 */
export interface IMinteebleGadgetsSmartContractInstance
  extends IMinteebleERC1155SmartContractInstance {
  /**
   * Returns the token ID for a given group ID and variation ID.
   * @param groupId The ID of the group.
   * @param variationId The ID of the variation.
   * @returns A Promise that resolves to the token ID.
   */
  groupIdToTokenId(groupId: number, variationId: number): Promise<number>;

  /**
   * Returns the group ID and variation ID for a given token ID.
   * @param tokenId The ID of the token.
   * @returns A Promise that resolves to an object containing the group ID and variation ID.
   */
  tokenIdToGroupId(
    tokenId: number
  ): Promise<{ groupId: number; variationId: number }>;

  /**
   * Returns the number of gadget groups.
   * @returns A Promise that resolves to the number of gadget groups as a bigint.
   */
  getGadgetGroups(): Promise<bigint>;

  /**
   * Returns the number of variations for a given gadget group.
   * @param groupId The ID of the gadget group.
   * @returns A Promise that resolves to the number of variations as a bigint.
   */
  getGadgetGroupVariations(groupId: number): Promise<bigint>;

  /**
   * Adds a new variation to a gadget group.
   * @param groupId The ID of the gadget group.
   * @returns A Promise that resolves when the variation has been added.
   */
  addVariation(groupId: number): Promise<void>;

  /**
   * Adds a new gadget group.
   * @returns A Promise that resolves when the group has been added.
   */
  addGadgetGroup(): Promise<void>;
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

  public async addGadgetGroup(): Promise<void> {
    let { hash } = await writeContract({
      address: this.address as any,
      abi: this.abi,
      functionName: "addGadgetGroup",
      args: [],
    });

    await waitForTransaction({
      hash,
    });
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
