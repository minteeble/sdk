import React from "react";
import { PredicatesServiceContext } from "./PredicatesServiceContext";

export const usePredicatesService = () => {
  const context = React.useContext(PredicatesServiceContext);

  if (typeof context === undefined) {
    throw new Error(
      "`usePredicatesService` must be within a `PredicatesServiceProvider`"
    );
  }

  return context;
};
