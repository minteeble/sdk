import { ApiCaller } from "./ApiCaller";

/**
 * Base class for SDK services
 */
export class BaseService {
  protected apiCaller: ApiCaller;

  /**
   * @param serviceSlug Service URL slug
   */
  constructor(serviceSlug: string) {
    this.apiCaller = new ApiCaller(serviceSlug);
  }
}
