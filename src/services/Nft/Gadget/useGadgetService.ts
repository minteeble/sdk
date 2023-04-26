import React from "react";
import { GadgetServiceContext } from "./GadgetServiceContext";

export const useGadgetService = () => {
  const context = React.useContext(GadgetServiceContext);

  if (typeof context === undefined) {
    throw new Error(
      "`useGadgetService` must be within a `GadgetServiceProvider`"
    );
  }

  return context;
};
