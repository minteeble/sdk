import {
  CreateShortenedRequestDto,
  CreateShortenerRequestDto,
  ICreateShortenedRequestDto,
  ICreateShortenerRequestDto,
  ShortenedClientModel,
  ShortenedType,
  ShortenerClientModel,
  ShortenerPreviewClientModel,
  ShorteningType,
} from "@minteeble/utils";
import { BaseService } from "../../models";
import { JsonSerializer } from "typescript-json-serializer";

const serializer = new JsonSerializer();

/**
 * Singleton class for handling Shortner service features
 */
class ShortenerService extends BaseService {
  /**
   * Singleton instance
   */
  private static _instance: ShortenerService;

  constructor() {
    super("shortener");
  }

  public static get instance(): ShortenerService {
    if (!this._instance) this._instance = new ShortenerService();

    return this._instance;
  }

  /**
   * Creates a new Shortener
   *
   * @param name Shortener name
   * @param type Type of shortener
   * @param TTLDelta Delta internal to be used as TTL in the shortened strings
   * @returns Id of the created shortener
   */
  public async createShortener(
    name: string,
    type: ShorteningType,
    TTLDelta: number
  ): Promise<string> {
    let body: ICreateShortenerRequestDto = {
      name,
      type,
      TTLDelta,
    };

    let reqInit: any = {
      responseType: "text",
      body,
    };

    let res = await this.apiCaller.post(`/shortener`, reqInit);

    if (res && res.id && typeof res.id === "string") {
      return res.id;
    } else throw new Error("Fail on creating shortener.");
  }

  /**
   * Shortens a string
   *
   * @param shortenerId Shortener to be used
   * @param type Shornening approach
   * @param stringToShorten Input string to be shortened
   * @returns Id of the shortened string
   */
  public async createShortened(
    shortenerId: string,
    type: ShortenedType,
    stringToShorten: string
  ): Promise<string> {
    let body: ICreateShortenedRequestDto = {
      shortenerId,
      type,
      object: stringToShorten,
    };

    let reqInit: any = {
      responseType: "text",
      body,
    };

    let res = await this.apiCaller.post(`/shortened`, reqInit);

    if (res && res.id && typeof res.id === "string") {
      return res.id;
    } else throw new Error("Fail on creating shortened.");
  }

  /**
   * Gets the shortened full string by passing its id
   *
   * @param shortenerId Shortener Id
   * @param shortenedObjectId Shortened id to be fetched
   * @returns Shortened object if exists, null otherwise
   */
  public async getShortened(
    shortenerId: string,
    shortenedObjectId: string
  ): Promise<ShortenedClientModel | null> {
    let data = await this.apiCaller.get(
      `/shortener/${shortenerId}/shortened/${shortenedObjectId}/shortened`,
      {},
      true
    );

    let shortened = serializer.deserializeObject<ShortenedClientModel>(
      data,
      ShortenedClientModel
    );

    return shortened || null;
  }

  /**
   * Gets Shortener info
   *
   * @param shortenerId Id of the shortener to be fetched
   * @returns Shortener object if found, null otherwise
   */
  public async getShortener(
    shortenerId: string
  ): Promise<ShortenerClientModel | null> {
    let data = await this.apiCaller.get(
      `/shortener/${shortenerId}/shortener`,
      {},
      true
    );

    let shortener = serializer.deserializeObject<ShortenerClientModel>(
      data,
      ShortenerClientModel
    );

    return shortener || null;
  }

  /**
   * Gets list of owned shorteners
   *
   * @returns List of shorteners
   */
  public async getShorteners(): Promise<ShortenerClientModel[] | null> {
    let data = await this.apiCaller.get(`/shortener/shorteners`, {}, true);

    let shorteners = (serializer.deserializeObjectArray<ShortenerClientModel>(
      data.shorteners,
      ShortenerClientModel
    ) || []) as [];

    return shorteners || null;
  }

  /**
   * Deletes a shortener
   *
   * @param shortenerId Id of the shortener to be deleted
   */
  public async deleteShortener(shortenerId: string): Promise<void> {
    let reqInit: any = {
      responseType: "text",
    };

    await this.apiCaller.delete(`/shortener/${shortenerId}/shortener`, reqInit);
  }
}

export { ShortenerService };
