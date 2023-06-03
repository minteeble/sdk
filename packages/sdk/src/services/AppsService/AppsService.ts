import { BaseService } from "../../models";
import { JsonSerializer } from "typescript-json-serializer";

const serializer = new JsonSerializer();

export class AppsService extends BaseService {
  private static _instance: AppsService;

  constructor() {
    super("app");
  }

  public static get instance(): AppsService {
    if (!this._instance) this._instance = new AppsService();

    return this._instance;
  }

  public createApp = async (
    urlName: string,
    displayName: string
  ): Promise<any | null> => {
    const body = {
      urlName,
      displayName,
    };

    const res = await this.apiCaller.post(
      `/app`,
      {
        responseType: "text",
        body: body,
      },
      true
    );

    if (!res || !res.id) return null;

    // const form = new AppDataClientModel
  };

  public getApp = async (urlName: string): Promise<any | null> => {
    const res = await this.apiCaller.get(
      `/${urlName}/app`,
      {
        responseType: "text",
      },
      true
    );

    const app =
      //    serializer.deserializeObject()
      //   ||
      null;

    return app;
  };

  public deleteApp = async (urlName: string): Promise<void> => {
    await this.apiCaller.delete(`/${urlName}/app`, {
      responseType: "text",
    });
  };

  public updateApp = async (displayName: string, newDisplayName: string) => {
    const body = {
      displayName,
      newDisplayName,
    };

    // const res = await this.apiCaller.get(
    //     `/${urlName}/app`,
    //     {
    //       responseType: "text",
    //     },
    //     true
    //   );
  };

  //   public getAppUsers = async()

  // public addAppAdmin = async()

  // public removeAppAdmin = async()

  // public joinApp = async()

  // public leaveApp = async()
}
