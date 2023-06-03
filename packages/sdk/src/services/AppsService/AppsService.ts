import { BaseService } from "../../models";
import { JsonSerializer } from "typescript-json-serializer";
import {
  ICreateAppRequestDto,
  ICreateAppResponseDto,
  AppInfoClientModel,
  IGetAppResponseDto,
  IUpdateAppRequestDto,
  IGetAppUsersResponseDto,
  UserPreviewClientModel,
  IGetUserAppsResponseDto,
} from "@minteeble/utils";

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
  ): Promise<ICreateAppResponseDto | null> => {
    const body: ICreateAppRequestDto = {
      urlName,
      displayName,
    };

    const res: AppInfoClientModel = await this.apiCaller.post(
      `/app`,
      {
        responseType: "text",
        body: body,
      },
      true
    );

    if (!res || !res.urlName) return null;

    const form = new AppInfoClientModel();

    form.displayName = res.displayName;
    form.urlName = res.urlName;

    return form;
  };

  public getApp = async (
    urlName: string
  ): Promise<IGetAppResponseDto | null> => {
    const res = await this.apiCaller.get(
      `/${urlName}/app`,
      {
        responseType: "text",
      },
      true
    );

    const app =
      serializer.deserializeObject<AppInfoClientModel>(
        res,
        AppInfoClientModel
      ) || null;

    return app;
  };

  public deleteApp = async (urlName: string): Promise<void> => {
    await this.apiCaller.delete(`/${urlName}/app`, {
      responseType: "text",
    });
  };

  public updateApp = async (
    urlName: string,
    displayName: string
  ): Promise<void> => {
    const body: IUpdateAppRequestDto = {
      urlName,
      displayName,
    };

    this.apiCaller.put(
      `/${urlName}/app`,
      {
        responseType: "text",
      },
      true
    );
  };

  public getAppUsers = async (
    urlName: string
  ): Promise<Array<UserPreviewClientModel>> => {
    let res: IGetAppUsersResponseDto = await this.apiCaller.get(
      `/${urlName}/users`,
      {
        responseType: "text",
      },
      true
    );

    let users: UserPreviewClientModel[] =
      (serializer.deserializeObjectArray<UserPreviewClientModel>(
        res.users,
        UserPreviewClientModel
      ) || []) as [];

    let nextPage;

    while (res.paginationToken) {
      res = await this.apiCaller.get(
        `/users?paginationToken=${encodeURIComponent(res.paginationToken)}`,
        {},
        true
      );
      nextPage = (serializer.deserializeObjectArray<UserPreviewClientModel>(
        res.users,
        UserPreviewClientModel
      ) || []) as [];
      users = users.concat(nextPage);
    }

    return users;
  };

  public getUserApps = async (): Promise<AppInfoClientModel[]> => {
    const res: IGetUserAppsResponseDto = await this.apiCaller.get(
      `/apps`,
      {
        responseType: "text",
      },
      true
    );

    let apps: AppInfoClientModel[] =
      (serializer.deserializeObjectArray<AppInfoClientModel>(
        res.apps,
        AppInfoClientModel
      ) || []) as [];

    return apps;
  };

  public addAppAdmin = async (
    urlName: string,
    newAdminUserWallet: string
  ): Promise<void> => {
    const body = {
      newAdminUserWallet,
    };

    await this.apiCaller.put(
      `/${urlName}/admin/app`,
      {
        responseType: "text",
        body,
      },

      true
    );
  };

  public removeAppAdmin = async (
    urlName: string,
    adminUserWallet: string
  ): Promise<void> => {
    const body = {
      adminUserWallet,
    };

    await this.apiCaller.delete(`/${urlName}/admin/app`, {
      responseType: "text",
      body,
    });
  };

  public joinApp = async (
    urlName: string
  ): Promise<{ urlName: string } | null> => {
    const res: { urlName: string } = await this.apiCaller.post(
      `/${urlName}/join/app`,
      {
        responseType: "text",
      },
      true
    );

    return res || null;
  };

  public leaveApp = async (urlName: string): Promise<void> => {
    await this.apiCaller.post(
      `/${urlName}/leave/app`,
      {
        responseType: "text",
      },
      true
    );
  };
}
