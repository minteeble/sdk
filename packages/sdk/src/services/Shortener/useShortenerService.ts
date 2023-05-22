import React from "react";
import { ShortenerServiceContext } from "./ShortenerServiceContext";

export const useShortenerService = () => {
  const context = React.useContext(ShortenerServiceContext);

  if (typeof context === undefined) {
    throw new Error(
      "`useShortenerService` must be within a `ShortenerServiceProvider`"
    );
  }

  return context;
};
