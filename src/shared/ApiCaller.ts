import { API } from "aws-amplify";
import axios from "axios";
import { AuthService } from "../services";

export class ApiCaller {
  private serviceSlug: string;

  private static apiName: string = "ApiGatewayRestApi";

  private appName: string;

  private customBaseUrl?: string;

  constructor(serviceSlug: string, appName: string = "Minteeble") {
    this.serviceSlug = serviceSlug;
    this.appName = appName;
  }

  public set apiBaseUrl(value: string) {
    this.customBaseUrl = value;
  }

  public get apiBaseUrl(): string {
    return this.customBaseUrl || AuthService.apiBaseUrl;
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

  public async put(
    path: string,
    init: {
      [key: string]: any;
    }
  ): Promise<any> {
    return API.put(
      ApiCaller.apiName,
      `/${this.serviceSlug}/${this.appName}${path}`,
      init
    );
  }

  public async get(
    path: string,
    init: {
      [key: string]: any;
    },
    authenticated: boolean = true
  ): Promise<any> {
    let urlPath = `/${this.serviceSlug}/${this.appName}${path}`;

    if (authenticated) {
      return API.get(ApiCaller.apiName, urlPath, init);
    } else {
      return (
        await axios.get(`${this.apiBaseUrl}${urlPath}`, {
          params: init?.queryStringParameters || {},
        })
      ).data;
    }
  }

  public async delete(
    path: string,
    init: {
      [key: string]: any;
    }
  ): Promise<any> {
    return API.del(
      ApiCaller.apiName,
      `/${this.serviceSlug}/${this.appName}${path}`,
      init
    );
  }
}
