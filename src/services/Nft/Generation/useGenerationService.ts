import React from "react";
import { GenerationServiceContext } from "./GenerationServiceContext";

export const useGenerationService = () => {
  const context = React.useContext(GenerationServiceContext);

  if (typeof context === undefined) {
    throw new Error(
      "`useGenerationService` must be within a `GenerationServiceProvider`"
    );
  }

  return context;
};
