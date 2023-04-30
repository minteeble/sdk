import { GenerationDataClientModel, NftGenerationType } from "@minteeble/utils";
import { createContext } from "react";

export interface GenerationServiceContent {
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

export const GenerationServiceContext = createContext<GenerationServiceContent>(
  {
    createGeneration: () => new Promise(() => {}),

    getGeneration: () => new Promise(() => {}),

    // getRenderers: () => new Promise(() => {}),

    // updateRenderer: () => new Promise(() => {}),
  }
);
