import {
  GenerationDataClientModel,
  NftGenerationType,
  NftRendererType,
  RendererDataClientModel,
} from "@minteeble/utils";
import { createContext } from "react";

export interface RendererServiceContent {
  createRenderer(
    type: NftRendererType,
    attributes: { [key: string]: string }
  ): Promise<RendererDataClientModel | null>;

  getRenderer(rendererId: string): Promise<RendererDataClientModel | null>;

  getRenderers(): Promise<Array<RendererDataClientModel>>;

  updateRenderer(renderer: RendererDataClientModel): Promise<void>;

  createGeneration(
    type: NftGenerationType,
    maxSupply: number
  ): Promise<GenerationDataClientModel | null>;

  getGeneration(
    generationId: string
  ): Promise<GenerationDataClientModel | null>;

  // getRenderers(): Promise<Array<RendererDataClientModel>>;

  // updateRenderer(renderer: RendererDataClientModel): Promise<void>;
}

export const RendererServiceContext = createContext<RendererServiceContent>({
  createRenderer: () => new Promise(() => {}),

  getRenderer: () => new Promise(() => {}),

  getRenderers: () => new Promise(() => {}),

  updateRenderer: () => new Promise(() => {}),
  createGeneration: () => new Promise(() => {}),

  getGeneration: () => new Promise(() => {}),

  // getRenderers: () => new Promise(() => {}),

  // updateRenderer: () => new Promise(() => {}),
});
