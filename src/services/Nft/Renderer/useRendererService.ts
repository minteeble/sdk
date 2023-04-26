import React from "react";
import { RendererServiceContext } from "./RendererServiceContext";

export const useRendererService = () => {
  const context = React.useContext(RendererServiceContext);

  if (typeof context === undefined) {
    throw new Error(
      "`useRendererService` must be within a `RendererServiceProvider`"
    );
  }

  return context;
};
