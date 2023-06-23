import {
  ICreateUserProfileRequestDto,
  IUpdateUserProfileRequestDto,
  UserPreviewClientModel,
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
   * @returns object containing a list of Users wallet addresses
   */
  public async getProfiles(): Promise<Array<UserPreviewClientModel>> {
    let data = await this.apiCaller.get(`/users`, {}, true);
    let users: any[] =
      (serializer.deserializeObjectArray<UserPreviewClientModel>(
        data.users,
        UserPreviewClientModel
      ) || []) as [];
    let nextPage;
    while (data.paginationToken) {
      data = await this.apiCaller.get(
        `/users?paginationToken=${encodeURIComponent(data.paginationToken)}`,
        {},
        true
      );
      nextPage = (serializer.deserializeObjectArray<UserPreviewClientModel>(
        data.users,
        UserPreviewClientModel
      ) || []) as [];
      users = users.concat(nextPage);
    }
    return users;
  }

  /**
   * Gets User's profile's image URL
   *
   * @returns URL string
   */
  public async getProfileImageUrl(): Promise<string> {
    let res = await this.apiCaller.get(`/image`, {}, true);

    if (res && res.url && typeof res.url === "string") {
      return res.url;
    } else throw new Error("Fail on getting user image url.");
  }

  /**
   * Gets User's profile's image
   *
   *
   * @returns Image as string or null if an error is encountered
   */
  public async getProfileImage(): Promise<string | null> {
    try {
      let image = await this.apiCaller.get(
        `/image`,
        {
          responseType: "text",
        },
        true
      );
      if (image.success === false) {
        return null;
      }

      return image || null;
    } catch (err) {
      console.log(err);
      return null;
    }
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
