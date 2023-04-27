import { NftRendererType, RendererDataClientModel } from "@minteeble/utils";
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

  return (
    <RendererServiceContext.Provider
      value={{ createRenderer, getRenderer, getRenderers }}
    >
      {props.children}
    </RendererServiceContext.Provider>
  );
};
