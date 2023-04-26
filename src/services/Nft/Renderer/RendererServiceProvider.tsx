import React from "react";
import { RendererServiceProviderProps } from "./RendererService.types";
import { RendererServiceContext } from "./RendererServiceContext";

export const RendererServiceProvider = (
  props: RendererServiceProviderProps
) => {
  return (
    <RendererServiceContext.Provider value={{}}>
      {props.children}
    </RendererServiceContext.Provider>
  );
};
