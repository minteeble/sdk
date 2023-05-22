import { ShortenedType, ShorteningType } from "@minteeble/utils";
import React from "react";
import { ShortenerService } from "./ShortenerService";
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

  const createShortened = async (
    shortenerId: string,
    type: ShortenedType,
    stringToShorten: string
  ) => {
    return ShortenerService.instance.createShortened(
      shortenerId,
      type,
      stringToShorten
    );
  };

  const getShortened = async (
    shortenerId: string,
    shortenedObjectId: string
  ) => {
    return ShortenerService.instance.getShortened(
      shortenerId,
      shortenedObjectId
    );
  };

  const getShortener = async (shortenerId: string) => {
    return ShortenerService.instance.getShortener(shortenerId);
  };

  const getShorteners = async () => {
    return ShortenerService.instance.getShorteners();
  };

  const deleteShortener = async (shortenerId: string) => {
    return ShortenerService.instance.deleteShortener(shortenerId);
  };

  return (
    <ShortenerServiceContext.Provider
      value={{
        createShortener,
        createShortened,
        getShortened,
        getShortener,
        getShorteners,
        deleteShortener,
      }}
    >
      {props.children}
    </ShortenerServiceContext.Provider>
  );
};
