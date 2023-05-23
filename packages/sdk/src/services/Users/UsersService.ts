import {
  ICreateUserProfileRequestDto,
  IUpdateUserProfileRequestDto,
} from "@minteeble/utils";
import { UserClientModel } from "@minteeble/utils";
import { BaseService } from "../../models";
import { JsonSerializer } from "typescript-json-serializer";

const serializer = new JsonSerializer();

/**
 * Singleton class for handling Users service features
 */
class UsersService extends BaseService {
  /**
   * Singleton instance
   */
  private static _instance: UsersService;

  constructor() {
    super("users");
  }

  public static get instance(): UsersService {
    if (!this._instance) this._instance = new UsersService();

    return this._instance;
  }

  public async createProfile(userName: string) {
    let body: ICreateUserProfileRequestDto = {
      userName,
    };

    let reqInit: any = {
      responseType: "text",
      body,
    };

    let res = await this.apiCaller.post(`/users`, reqInit);

    if (res && res.userName && typeof res.userName === "string") {
      return res.userName;
    } else throw new Error("Fail on creating user.");
  }

  public async getProfile(): Promise<UserClientModel | null> {
    let data = await this.apiCaller.get(`/user`, {}, true);

    let user = serializer.deserializeObject<UserClientModel>(
      data,
      UserClientModel
    );

    return user || null;
  }

  public async deleteProfile(): Promise<void> {
    let reqInit: any = {
      responseType: "text",
    };

    await this.apiCaller.delete(`/user`, reqInit);
  }

  public async updateProfile(userName: string) {
    let body: IUpdateUserProfileRequestDto = {
      userName,
    };

    let reqInit: any = {
      responseType: "text",
      body,
    };

    await this.apiCaller.put(`/user`, reqInit);
  }
}

export { UsersService };
