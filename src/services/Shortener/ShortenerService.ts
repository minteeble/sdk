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
import { BaseService } from "../../shared/BaseService";
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

  public async createShortened(
    shortenerId: string,
    type: ShortenedType,
    object: any
  ): Promise<string> {
    let body: ICreateShortenedRequestDto = {
      shortenerId,
      type,
      object,
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

  public async getShorteners(
    shortenerId: string
  ): Promise<ShortenerPreviewClientModel[] | null> {
    let data = await this.apiCaller.get(
      `/shortener/${shortenerId}/shortener`,
      {},
      true
    );

    let shorteners =
      (serializer.deserializeObjectArray<ShortenerPreviewClientModel>(
        data.shorteners,
        ShortenerPreviewClientModel
      ) || []) as [];

    return shorteners || null;
  }
}

export { ShortenerService };
