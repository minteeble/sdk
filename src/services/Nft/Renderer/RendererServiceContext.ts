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
    attributes: {
      [key: string]: string;
    }
  ): Promise<GenerationDataClientModel | null>;

  getGeneration(
    generationId: string
  ): Promise<GenerationDataClientModel | null>;

  getGenerations(): Promise<Array<GenerationDataClientModel>>;

  updateGeneration(
    generationId: string,
    attributes: {
      [key: string]: string;
    }
  ): Promise<void>;

  deleteGeneration(generationId: string): Promise<void>;
  deleteRenderer(rendererId: string): Promise<void>;
}

export const RendererServiceContext = createContext<RendererServiceContent>({
  createRenderer: () => new Promise(() => {}),

  getRenderer: () => new Promise(() => {}),

  getRenderers: () => new Promise(() => {}),

  updateRenderer: () => new Promise(() => {}),
  createGeneration: () => new Promise(() => {}),

  getGeneration: () => new Promise(() => {}),

  getGenerations: () => new Promise(() => {}),

  updateGeneration: () => new Promise(() => {}),

  deleteGeneration: () => new Promise(() => {}),
  deleteRenderer: () => new Promise(() => {}),
});
