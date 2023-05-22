import { createContext } from "react";
import React from "react";
import {
  ShortenedClientModel,
  ShortenedType,
  ShortenerClientModel,
  ShortenerPreviewClientModel,
  ShorteningType,
} from "@minteeble/utils";

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

  /**
   * Shortens a string
   *
   * @param shortenerId Shortener to be used
   * @param type Shornening approach
   * @param stringToShorten Input string to be shortened
   * @returns Id of the shortened string
   */
  createShortened(
    shortenerId: string,
    type: ShortenedType,
    stringToShorten: string
  ): Promise<string>;

  /**
   * Gets the shortened full string by passing its id
   *
   * @param shortenerId Shortener Id
   * @param shortenedObjectId Shortened id to be fetched
   * @returns Shortened object if exists, null otherwise
   */
  getShortened(
    shortenerId: string,
    shortenedObjectId: string
  ): Promise<ShortenedClientModel | null>;

  /**
   * Gets Shortener info
   *
   * @param shortenerId Id of the shortener to be fetched
   * @returns Shortener object if found, null otherwise
   */
  getShortener(shortenerId: string): Promise<ShortenerClientModel | null>;

  /**
   * Gets list of owned shorteners
   *
   * @returns List of shorteners
   */
  getShorteners(): Promise<ShortenerClientModel[] | null>;
}

export const ShortenerServiceContext = createContext<ShortenerServiceContent>({
  createShortener() {
    throw new Error("Not initialized");
  },
  createShortened() {
    throw new Error("Not initialized");
  },
  getShortened() {
    throw new Error("Not initialized");
  },
  getShortener() {
    throw new Error("Not initialized");
  },
  getShorteners() {
    throw new Error("Not initialized");
  },
});
