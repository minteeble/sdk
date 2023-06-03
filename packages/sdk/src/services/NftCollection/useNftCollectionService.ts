import React from "react";
import { NftCollectionServiceContext } from "./NftCollectionServiceContext";

export const useNftCollectionService = () => {
  const context = React.useContext(NftCollectionServiceContext);

  if (typeof context === undefined) {
    throw new Error(
      "`useNftCollectionService` must be within a `NftCollectionServiceProvider`"
    );
  }

  return context;
};
