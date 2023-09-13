import {
  GenerationDataClientModel,
  ITriggerCustomActionRequestDto,
  NftGenerationItemInfoClientModel,
  NftGenerationType,
  NftRendererType,
  RendererDataClientModel,
  TriggerCustomActionResponseDto,
} from "@minteeble/utils";
import { createContext } from "react";

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
});
