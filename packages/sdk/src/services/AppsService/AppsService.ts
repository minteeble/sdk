import { BaseService } from "../../models";
import { JsonSerializer } from "typescript-json-serializer";
import {
  ICreateAppRequestDto,
  ICreateAppResponseDto,
  AppInfoClientModel,
  IGetAppResponseDto,
  IGetAppUsersResponseDto,
  UserPreviewClientModel,
  IGetUserAppsResponseDto,
  IGetAppAdminsResponseDto,
  IGetUserRoleResponseDto,
  GetUserRoleResponseDto,
  AppRole,
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

    const app = new AppInfoClientModel();

    app.displayName = res.displayName;
    app.urlName = res.urlName;

    return app;
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
    const body = {
      displayName,
    };

    this.apiCaller.put(
      `/${urlName}/app`,
      {
        responseType: "text",
        body: body,
      },
      true
    );
  };

  public getAppAdmins = async (
    urlName: string
  ): Promise<Array<UserPreviewClientModel>> => {
    let res: IGetAppAdminsResponseDto = await this.apiCaller.get(
      `/${urlName}/admins`,
      {},
      true
    );

    let admins: UserPreviewClientModel[] =
      (serializer.deserializeObjectArray<UserPreviewClientModel>(
        res.users,
        UserPreviewClientModel
      ) || []) as [];

    let nextPage;
    while (res.paginationToken) {
      res = await this.apiCaller.get(
        `/${urlName}/admins?paginationToken=${encodeURIComponent(
          res.paginationToken
        )}`,
        {},
        true
      );
      nextPage = (serializer.deserializeObjectArray<UserPreviewClientModel>(
        res.users,
        UserPreviewClientModel
      ) || []) as [];
      admins = admins.concat(nextPage);
    }
    return admins;
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
        `/${urlName}/users?paginationToken=${encodeURIComponent(
          res.paginationToken
        )}`,
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

  public removeAppUser = async (
    urlName: string,
    userWallet: string
  ): Promise<void> => {
    const body = {
      userWallet,
    };

    await this.apiCaller.delete(`/${urlName}/user/app`, {
      responeType: "text",
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

  public async getUserRole(): Promise<AppRole> {
    const res: IGetUserRoleResponseDto = await this.apiCaller.get(
      `/role`,
      {
        responseType: "text",
      },
      true
    );

    let deserializedResponse: GetUserRoleResponseDto =
      (serializer.deserializeObject<GetUserRoleResponseDto>(
        res,
        GetUserRoleResponseDto
      ) || {}) as GetUserRoleResponseDto;

    return deserializedResponse.role;
  }
}
