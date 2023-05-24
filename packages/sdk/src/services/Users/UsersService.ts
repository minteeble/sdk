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

  /**
   * Creates a new User's Profile
   *
   * @param userName User's username
   * @returns Username of the created Profile
   */
  public async createProfile(userName: string) {
    let body: ICreateUserProfileRequestDto = {
      userName,
    };

    let reqInit: any = {
      responseType: "text",
      body,
    };

    let res = await this.apiCaller.post(`/users`, reqInit, true);

    if (res && res.userName && typeof res.userName === "string") {
      return res.userName;
    } else throw new Error("Fail on creating user.");
  }

  /**
   * Gets username and wallet address of a User profile
   *
   * @returns User Client model if found, null otherwise
   */
  public async getProfile(): Promise<UserClientModel | null> {
    let data = await this.apiCaller.get(`/user`, {}, true);

    let user = serializer.deserializeObject<UserClientModel>(
      data,
      UserClientModel
    );

    return user || null;
  }

  /**
   * Gets Users profiles
   *
   * @param paginationToken token string paginating all users
   * @returns object containing a list of Users wallet addresses and a pagination token serving as a paginator
   */
  public async getProfiles(paginationToken?: string): Promise<object> {
    let path;
    if (paginationToken) path = `/users?paginationToken=${paginationToken}`;
    else path = `/users`;
    let data = await this.apiCaller.get(path, {}, true);

    let users = (serializer.deserializeObject<{
      users: Array<string>;
      paginationToken?: string;
    }>(data, { users: data.users, paginationToken: data.paginationToken }) ||
      []) as [];

    return users;
  }

  /**
   * Gets User's profile's image URL
   *
   */
  public async getProfileImageUrl() {
    let res = await this.apiCaller.get(`/image`, {}, true);

    if (res && res.url && typeof res.url === "string") {
      return res.url;
    } else throw new Error("Fail on getting user image url.");
  }

  /**
   * Deletes a User profile
   */
  public async deleteProfile(): Promise<void> {
    let reqInit: any = {
      responseType: "text",
    };

    await this.apiCaller.delete(`/user`, reqInit);
  }

  /**
   * Updates a User profile's username
   *
   * @param userName new username
   */
  public async updateProfile(userName: string) {
    let body: IUpdateUserProfileRequestDto = {
      userName,
    };

    let reqInit: any = {
      responseType: "text",
      body,
    };

    await this.apiCaller.put(`/user`, reqInit, true);
  }
}

export { UsersService };
