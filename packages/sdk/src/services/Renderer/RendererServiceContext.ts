import {
  GenerationDataClientModel,
  ITriggerCustomActionRequestDto,
  NftGenerationItemInfoClientModel,
  NftGenerationType,
  NftRendererType,
  RendererDataClientModel,
  TraitTypeStats,
  TriggerCustomActionResponseDto,
  UploadRendererCustomActionNames,
} from "@minteeble/utils";
import { createContext } from "react";
import {
  RendererActionRequest,
  RendererActionResponse,
} from "./RendererService";

export interface RendererServiceContent {
  createRenderer(
    type: NftRendererType,
    name: string,
    attributes: { [key: string]: string }
  ): Promise<RendererDataClientModel | null>;

  getRenderer(rendererId: string): Promise<RendererDataClientModel | null>;

  getRenderers(): Promise<Array<RendererDataClientModel>>;

  updateRenderer(renderer: RendererDataClientModel): Promise<void>;

  createGeneration(
    type: NftGenerationType,
    name: string,
    attributes: {
      [key: string]: any;
    }
  ): Promise<GenerationDataClientModel | null>;

  getGeneration(
    generationId: string
  ): Promise<GenerationDataClientModel | null>;

  getGenerations(): Promise<Array<GenerationDataClientModel>>;

  getNftGenerationItemsInfo(
    generationId: string,
    nftGenerationItems: string
  ): Promise<Array<NftGenerationItemInfoClientModel>>;

  updateGeneration(
    generationId: string,
    attributes: {
      [key: string]: any;
    }
  ): Promise<void>;

  deleteGeneration(generationId: string): Promise<void>;

  deleteRenderer(rendererId: string): Promise<void>;

  revealItem(
    chainName: string,
    collectionId: string,
    nftId: number
  ): Promise<void>;

  mutateItem(
    chainName: string,
    collectionId: string,
    nftId: number,
    mutationVariantName: string
  ): Promise<void>;

  setMutationStatus(
    collectionId: string,
    chainName: string,
    nftId: number,
    mutationStatus: boolean
  ): Promise<void>;

  triggerCustomAction(
    params: ITriggerCustomActionRequestDto,
    authenticated?: boolean
  ): Promise<TriggerCustomActionResponseDto | null>;

  triggerRendererAction<
    RT extends NftRendererType,
    AT extends UploadRendererCustomActionNames | never
  >(params: {
    rendererType: RT;
    chainName: string;
    collectionId: string;
    rendererId: string;
    actionName: AT;
    requestBody: RendererActionRequest<RT, AT>;
    authenticated?: boolean;
  }): Promise<{
    responseBody: RendererActionResponse<RT, AT> | null;

    success: boolean;

    errorMessage?: string;
  }>;

  getCollectionTraits(
    chainName: string,
    collectionId: string
  ): Promise<TraitTypeStats[]>;

  filterNftsOnTraits(
    chainName: string,
    collectionId: string,
    filterOptions: {
      [traitType: string]: string[];
    }
  ): Promise<Array<number>>;
}

export const RendererServiceContext = createContext<RendererServiceContent>({
  createRenderer: () => new Promise(() => {}),

  getRenderer: () => new Promise(() => {}),

  getRenderers: () => new Promise(() => {}),

  updateRenderer: () => new Promise(() => {}),

  createGeneration: () => new Promise(() => {}),

  getGeneration: () => new Promise(() => {}),

  getGenerations: () => new Promise(() => {}),

  getNftGenerationItemsInfo: () => new Promise(() => {}),

  updateGeneration: () => new Promise(() => {}),

  deleteGeneration: () => new Promise(() => {}),

  deleteRenderer: () => new Promise(() => {}),

  revealItem: () => new Promise(() => {}),

  mutateItem: () => new Promise(() => {}),

  setMutationStatus: () => new Promise(() => {}),

  triggerCustomAction: () => new Promise(() => {}),

  triggerRendererAction: () => new Promise(() => {}),

  getCollectionTraits: () => new Promise(() => {}),

  filterNftsOnTraits: () => new Promise(() => {}),
});
