import {
  GenerationDataClientModel,
  ITriggerCustomActionRequestDto,
  NftGenerationItemInfoClientModel,
  NftGenerationType,
  NftRendererType,
  RendererDataClientModel,
  TraitTypeStats,
  TriggerCustomActionResponseDto,
  UpdateRendererRequestDto,
  UploadRendererCustomActionNames,
} from "@minteeble/utils";
import React from "react";
import { useAuthService } from "../AuthService";
import {
  RendererActionRequest,
  RendererActionResponse,
  RendererService,
} from "./RendererService";
import { RendererServiceProviderProps } from "./RendererService.types";
import { RendererServiceContext } from "./RendererServiceContext";

export const RendererServiceProvider = (
  props: RendererServiceProviderProps
) => {
  const { user } = useAuthService();

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
      [key: string]: any;
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

  const getNftGenerationItemsInfo = async (
    generationId: string,
    nftGenerationItems: string
  ): Promise<Array<NftGenerationItemInfoClientModel>> => {
    return RendererService.instance.getNftGenerationItemsInfo(
      generationId,
      nftGenerationItems
    );
  };

  const updateGeneration = async (
    generationId: string,
    attributes: {
      [key: string]: any;
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

  const mutateItem = async (
    chainName: string,
    collectionId: string,
    nftId: number,
    mutationVariantName: string
  ) => {
    return RendererService.instance.mutateItem(
      chainName,
      collectionId,
      nftId,
      mutationVariantName
    );
  };

  const setMutationStatus = async (
    collectionId: string,
    chainName: string,
    nftId: number,
    mutationStatus: boolean
  ) => {
    return RendererService.instance.setMutationStatus(
      collectionId,
      chainName,
      nftId,
      mutationStatus
    );
  };

  const triggerCustomAction = async (
    params: ITriggerCustomActionRequestDto,
    authenticated?: boolean
  ): Promise<TriggerCustomActionResponseDto | null> => {
    return RendererService.instance.triggerCustomAction(params, authenticated);
  };

  const triggerRendererAction = async <
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
  }> => {
    return RendererService.instance.triggerRendererAction(params);
  };

  const getCollectionTraits = async (
    chainName: string,
    collectionId: string
  ): Promise<TraitTypeStats[]> => {
    return RendererService.instance.getCollectionTraits(
      chainName,
      collectionId
    );
  };

  const filterNftsOnTraits = async (
    chainName: string,
    collectionId: string,
    filterOptions: {
      [traitType: string]: string[];
    }
  ): Promise<Array<number>> => {
    return RendererService.instance.filterNftsOnTraits(
      chainName,
      collectionId,
      filterOptions
    );
  };

  const triggerTraitsRefresh = async (
    chainName: string,
    collectionId: string
  ) => {
    return RendererService.instance.triggerTraitsRefresh(
      chainName,
      collectionId
    );
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
        getNftGenerationItemsInfo,
        updateGeneration,
        deleteGeneration,
        deleteRenderer,
        revealItem,
        mutateItem,
        setMutationStatus,
        triggerCustomAction,
        triggerRendererAction,
        getCollectionTraits,
        filterNftsOnTraits,
        triggerTraitsRefresh,
      }}
    >
      {props.children}
    </RendererServiceContext.Provider>
  );
};
