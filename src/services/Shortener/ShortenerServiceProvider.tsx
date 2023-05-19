import { ShorteningType } from "@minteeble/utils";
import React from "react";
import { ShortenerService } from "./shortenerService";
import { ShortenerServiceProviderProps } from "./ShortenerService.types";
import { ShortenerServiceContext } from "./ShortenerServiceContext";

export const ShortenerServiceProvider = (
  props: ShortenerServiceProviderProps
) => {
  const createShortener = async (
    name: string,
    type: ShorteningType,
    TTLDelta: number
  ): Promise<string> => {
    return ShortenerService.instance.createShortener(name, type, TTLDelta);
  };

  return (
    <ShortenerServiceContext.Provider value={{ createShortener }}>
      {props.children}
    </ShortenerServiceContext.Provider>
  );
};
