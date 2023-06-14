import {
  GenerationDataClientModel,
  NftGenerationType,
  NftRendererType,
  RendererDataClientModel,
  UpdateRendererRequestDto,
} from "@minteeble/utils";
import React from "react";
import { RendererService } from "./RendererService";
import { RendererServiceProviderProps } from "./RendererService.types";
import { RendererServiceContext } from "./RendererServiceContext";

export const RendererServiceProvider = (
  props: RendererServiceProviderProps
) => {
  const createRenderer = async (
    type: NftRendererType,
    name: string,
    attributes: { [key: string]: string }
  ): Promise<RendererDataClientModel | null> => {
    return RendererService.instance.createRenderer(type, name, attributes);
  };

  const getRenderer = async (
    rendererId: string
  ): Promise<RendererDataClientModel | null> => {
    return RendererService.instance.getRenderer(rendererId);
  };

  const getRenderers = async (): Promise<Array<RendererDataClientModel>> => {
    return RendererService.instance.getRenderers();
  };

  const updateRenderer = async (
    renderer: RendererDataClientModel
  ): Promise<void> => {
    return RendererService.instance.updateRenderer(renderer);
  };

  const createGeneration = async (
    type: NftGenerationType,
    name: string,
    attributes: {
      [key: string]: string;
    }
  ): Promise<GenerationDataClientModel | null> => {
    return RendererService.instance.createGeneration(type, name, attributes);
  };

  const getGeneration = async (
    generationId: string
  ): Promise<GenerationDataClientModel | null> => {
    return RendererService.instance.getGeneration(generationId);
  };

  const getGenerations = async (): Promise<
    Array<GenerationDataClientModel>
  > => {
    return RendererService.instance.getGenerations();
  };

  const updateGeneration = async (
    generationId: string,
    attributes: {
      [key: string]: string;
    }
  ): Promise<void> => {
    return RendererService.instance.updateGeneration(generationId, attributes);
  };

  const deleteGeneration = async (generationId: string): Promise<void> => {
    return RendererService.instance.deleteGeneration(generationId);
  };
  const deleteRenderer = async (rendererId: string): Promise<void> => {
    return RendererService.instance.deleteRenderer(rendererId);
  };

  const revealItem = async (
    chainName: string,
    collectionId: string,
    nftId: number
  ) => {
    return RendererService.instance.revealItem(chainName, collectionId, nftId);
  };

  return (
    <RendererServiceContext.Provider
      value={{
        createRenderer,
        getRenderer,
        getRenderers,
        updateRenderer,
        createGeneration,
        getGeneration,
        getGenerations,
        updateGeneration,
        deleteGeneration,
        deleteRenderer,
        revealItem,
      }}
    >
      {props.children}
    </RendererServiceContext.Provider>
  );
};
