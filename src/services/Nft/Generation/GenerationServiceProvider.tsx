import {
  GenerationDataClientModel,
  NftGenerationType,
  NftRendererType,
  RendererDataClientModel,
  UpdateRendererRequestDto,
} from "@minteeble/utils";
import React from "react";
import { GenerationService } from "./GenerationService";
import { GenerationServiceProviderProps } from "./GenerationService.types";
import { GenerationServiceContext } from "./GenerationServiceContext";

export const GenerationServiceProvider = (
  props: GenerationServiceProviderProps
) => {
  const createGeneration = async (
    type: NftGenerationType,
    maxSupply: number
  ): Promise<GenerationDataClientModel | null> => {
    return GenerationService.instance.createGeneration(type, maxSupply);
  };

  const getGeneration = async (
    generationId: string
  ): Promise<GenerationDataClientModel | null> => {
    return GenerationService.instance.getGeneration(generationId);
  };

  // const getRenderers = async (): Promise<Array<RendererDataClientModel>> => {
  //   return GenerationService.instance.getRenderers();
  // };

  // const updateRenderer = async (
  //   renderer: RendererDataClientModel
  // ): Promise<void> => {
  //   return GenerationService.instance.updateRenderer(renderer);
  // };

  return (
    <GenerationServiceContext.Provider
      value={{
        createGeneration,
        getGeneration,
        // getRenderers, updateRenderer
      }}
    >
      {props.children}
    </GenerationServiceContext.Provider>
  );
};
