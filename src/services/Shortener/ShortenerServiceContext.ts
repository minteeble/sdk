import { createContext } from "react";
import React from "react";
import { ShorteningType } from "@minteeble/utils";

export interface ShortenerServiceContent {
  /**
   * Creates a new Shortener
   *
   * @param name Shortener name
   * @param type Type of shortener
   * @param TTLDelta Delta internal to be used as TTL in the shortened strings
   * @returns Id of the created shortener
   */
  createShortener(
    name: string,
    type: ShorteningType,
    TTLDelta: number
  ): Promise<string>;
}

export const ShortenerServiceContext = createContext<ShortenerServiceContent>({
  createShortener() {
    throw new Error("Not initialized");
  },
});
