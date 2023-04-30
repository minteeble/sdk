import {
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
    attributes: { [key: string]: string }
  ): Promise<RendererDataClientModel | null> => {
    return RendererService.instance.createRenderer(type, attributes);
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

  return (
    <RendererServiceContext.Provider
      value={{ createRenderer, getRenderer, getRenderers, updateRenderer }}
    >
      {props.children}
    </RendererServiceContext.Provider>
  );
};
