import { API } from "aws-amplify";

export class ApiCaller {
  private serviceSlug: string;

  private static apiName: string = "ApiGatewayRestApi";

  private appName: string;

  constructor(serviceSlug: string) {
    this.serviceSlug = serviceSlug;
    this.appName = "Minteeble";
  }

  public async post(
    path: string,
    init: {
      [key: string]: any;
    }
  ): Promise<any> {
    return API.post(
      ApiCaller.apiName,
      `/${this.serviceSlug}/${this.appName}${path}`,
      init
    );
  }

  public async get(
    path: string,
    init: {
      [key: string]: any;
    }
  ): Promise<any> {
    return API.get(
      ApiCaller.apiName,
      `/${this.serviceSlug}/${this.appName}${path}`,
      init
    );
  }
}
