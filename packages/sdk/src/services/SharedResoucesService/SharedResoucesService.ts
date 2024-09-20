import { JsonSerializer } from "typescript-json-serializer";
import { BaseService } from "../../models";

const serializer = new JsonSerializer();

/**
 * Singleton class for handling Shared Resources service features
 */
export class SharedResoucesService extends BaseService {
  /**
   * Singleton instance
   */
  private static _instance: SharedResoucesService;

  constructor() {
    super("shared-resources");
  }

  public static get instance(): SharedResoucesService {
    if (!this._instance) {
      this._instance = new SharedResoucesService();
    }

    return this._instance;
  }

  /**
   * URL caller
   *
   * @param url URL to call
   * @returns Response from the URL
   */
  public async urlCaller(url: string): Promise<any | null> {
    const res = await this.apiCaller.get(
      `/url-caller?url=${encodeURIComponent(url)}`,
      {},
      false
    );

    return res || null;
  }
}
