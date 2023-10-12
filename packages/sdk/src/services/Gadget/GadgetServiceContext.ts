import {
  GadgetGroupClientModel,
  GadgetInfoClientModel,
  GetGadgetsBatchUploadUrlResponseDto,
  IGadgetGroupClientModel,
} from "@minteeble/utils";
import { createContext } from "react";

/**
 * Interface representing the Gadget Service Context.
 * Contains methods for creating, updating, and deleting gadgets and gadget groups.
 */
export interface GadgetServiceContent {
  /**
   * Creates a new gadget group.
   * @param name - The name of the gadget group.
   * @param chainName - (Optional) The name of the chain.
   * @param collectionId - (Optional) The ID of the collection.
   * @returns A Promise that resolves with the newly created GadgetGroupClientModel or null if the operation fails.
   */
  createGadgetGroup: (
    name: string,
    chainName?: string,
    collectionId?: string
  ) => Promise<GadgetGroupClientModel | null>;

  /**
   * Retrieves a gadget group by ID.
   * @param groupId - The ID of the gadget group to retrieve.
   * @returns A Promise that resolves with the retrieved GadgetGroupClientModel or null if the operation fails.
   */
  getGadgetGroup: (groupId: string) => Promise<GadgetGroupClientModel | null>;

  /**
   * Creates a new gadget.
   * @param groupId - The ID of the gadget group to which the gadget belongs.
   * @param traitName - The name of the trait.
   * @param value - The value of the trait.
   * @param tokenId - The ID of the token.
   * @returns A Promise that resolves with the newly created GadgetInfoClientModel or null if the operation fails.
   */
  createGadget: (
    groupId: string,
    traitName: string,
    value: string,
    tokenId: number
  ) => Promise<GadgetInfoClientModel | null>;

  /**
   * Updates a gadget.
   * @param groupId - The ID of the gadget group to which the gadget belongs.
   * @param tokenId - The ID of the token.
   * @param traitName - The name of the trait to update.
   * @param value - The new value of the trait.
   * @returns A Promise that resolves with void if the operation succeeds, or rejects if it fails.
   */
  updateGadget: (
    groupId: string,
    tokenId: number,
    traitName: string,
    value: string
  ) => Promise<void>;

  /**
   * Creates a new gadget image.
   * @param groupId - The ID of the gadget group to which the gadget belongs.
   * @param tokenId - The ID of the token.
   * @param imageString - The base64-encoded image string.
   * @returns A Promise that resolves with void if the operation succeeds, or rejects if it fails.
   */
  createGadgetImage: (
    groupId: string,
    tokenId: string,
    imageString: string
  ) => Promise<void>;

  /**
   * Retrieves a gadget image by ID.
   * @param groupId - The ID of the gadget group to which the gadget belongs.
   * @param tokenId - The ID of the token.
   * @returns A Promise that resolves with the base64-encoded image string or null if the operation fails.
   */
  getGadgetImage: (groupId: string, tokenId: string) => Promise<Blob | null>;

  /**
   * Retrieves all gadget groups owned by the current user.
   * @returns A Promise that resolves with an array of IGadgetGroupClientModel objects or null if the operation fails.
   */
  getGadgetsGroupByOwner: () => Promise<Array<IGadgetGroupClientModel> | null>;

  /**
   * Retrieves all gadgets in a gadget group.
   * @param groupId - The ID of the gadget group.
   * @returns A Promise that resolves with an array of GadgetInfoClientModel objects or null if the operation fails.
   */
  getGroupGadgets: (
    groupId: string
  ) => Promise<Array<GadgetInfoClientModel> | null>;

  /**
   * Deletes a gadget group by ID.
   * @param groupId - The ID of the gadget group to delete.
   * @returns A Promise that resolves with void if the operation succeeds, or rejects if it fails.
   */
  deleteGadgetGroup: (groupId: string) => Promise<void>;

  /**
   * Deletes a gadget by ID.
   * @param groupId - The ID of the gadget group to which the gadget belongs.
   * @param tokenId - The ID of the token.
   * @returns A Promise that resolves with void if the operation succeeds, or rejects if it fails.
   */
  deleteGadget: (groupId: string, tokenId: number) => Promise<void>;

  /**
   * Retrieves the upload URL for a gadget image.
   * @param groupId - The ID of the gadget group to which the gadget belongs.
   * @param tokenId - The ID of the token.
   * @returns A Promise that resolves with the upload URL or null if the operation fails.
   */
  getGadgetImageUploadUrl: (
    groupId: string,
    tokenId: string
  ) => Promise<string | null>;

  /**
   * Uploads a gadget image.
   * @param url - The upload URL.
   * @param imageString - The base64-encoded image string.
   * @returns A Promise that resolves with void if the operation succeeds, or rejects if it fails.
   */
  uploadGadgetImage: (url: string, imageString: string) => Promise<void>;

  /**
   * Retrieves the URL for a gadget image.
   * @param groupId - The ID of the gadget group to which the gadget belongs.
   * @param tokenId - The ID of the token.
   * @returns The URL for the gadget image.
   */
  getGadgetImageUrl: (groupId: string, tokenId: number) => string;

  /**
   * Retrieves the batch upload URL for a gadget group.
   * @param groupId - The ID of the gadget group.
   * @returns A Promise that resolves with the batch upload URL or null if the operation fails.
   */
  getGadgetsBatchUploadUrl(
    groupId: string
  ): Promise<GetGadgetsBatchUploadUrlResponseDto | null>;

  /**
   * Batch creates gadgets.
   * @param groupId - The ID of the gadget group to which the gadgets belong.
   * @param requestId - The ID of the request.
   * @returns A Promise that resolves with an object containing a success flag and an optional message.
   */
  batchCreateGadgets(
    groupId: string,
    requestId: string
  ): Promise<{ success: boolean; message?: string }>;
}

export const GadgetServiceContext = createContext<GadgetServiceContent>({
  createGadgetGroup: () => new Promise(() => {}),
  getGadgetGroup: () => new Promise(() => {}),
  createGadget: () => new Promise(() => {}),
  createGadgetImage: () => new Promise(() => {}),
  getGadgetImage: () => new Promise(() => {}),
  getGadgetsGroupByOwner: () => new Promise(() => {}),
  getGroupGadgets: () => new Promise(() => {}),
  deleteGadgetGroup: () => new Promise(() => {}),
  deleteGadget: () => new Promise(() => {}),
  getGadgetImageUploadUrl: () => new Promise(() => {}),
  uploadGadgetImage: () => new Promise(() => {}),
  getGadgetImageUrl: () => "",
  updateGadget: () => new Promise(() => {}),
  getGadgetsBatchUploadUrl: () => new Promise(() => {}),
  batchCreateGadgets: () => new Promise(() => {}),
});
