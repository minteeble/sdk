import {
  CreateShortenedRequestDto,
  CreateShortenerRequestDto,
  ICreateShortenerRequestDto,
  ShortenedType,
  ShorteningType,
} from "@minteeble/utils";
import { BaseService } from "../../shared/BaseService";

/**
 * Singleton class for handling Shortnere service features
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
}

export { ShortenerService };
