import {
  GadgetGroupClientModel,
  GadgetInfoClientModel,
  ICreateGadgetGroupRequestDto,
  ICreateGadgetImageRequestDto,
  ICreateGadgetRequestDto,
} from "@minteeble/utils";
import { BaseService } from "../../../shared/BaseService";
import { JsonSerializer } from "typescript-json-serializer";
import axios from "axios";

const serializer = new JsonSerializer();

export class GadgetService extends BaseService {
  private static _instance: GadgetService;

  constructor() {
    super("gadgets");
  }

  public static get instance(): GadgetService {
    if (!this._instance) this._instance = new GadgetService();

    return this._instance;
  }

  public async createGadgetGroup(
    name: string,
    chainName?: string,
    collectionId?: string
  ): Promise<GadgetGroupClientModel | null> {
    let body: ICreateGadgetGroupRequestDto = {
      name: name,
      chainName: chainName || "",
      collectionId: collectionId || "",
    };

    let res = await this.apiCaller.post(
      `/group`,
      {
        responseType: "text",
        body: body,
      },
      true
    );

    let id = res.id;

    if (!id) return null;

    let group = new GadgetGroupClientModel();
    group.id = id;
    group.name = res.name;
    group.resourceOwner = res.resourceOwner;

    return group || null;
  }

  public async getGadgetGroup(
    groupId: string
  ): Promise<GadgetGroupClientModel | null> {
    let data = await this.apiCaller.get(`/group/${groupId}/`, {}, true);

    let group = serializer.deserializeObject<GadgetGroupClientModel>(
      data,
      GadgetGroupClientModel
    );

    return group || null;
  }

  public async createGadget(
    groupId: string,
    traitName: string,
    value: string,
    tokenId: number
  ): Promise<GadgetInfoClientModel | null> {
    let body: ICreateGadgetRequestDto = {
      groupId: groupId,
      traitName: traitName,
      value: value,
      tokenId: tokenId,
    };

    let res = await this.apiCaller.post(
      `/group/${groupId}/gadget`,
      {
        responseType: "text",
        body: body,
      },
      true
    );

    let id = res.id;

    if (!id) return null;

    let gadget = new GadgetInfoClientModel();
    gadget.groupId = id;
    gadget.tokenId = res.tokenId;
    gadget.traitName = res.traitName;
    gadget.value = res.value;

    return gadget;
  }

  public async createGadgetImage(
    groupId: string,
    tokenId: string,
    imageString: string
  ): Promise<void> {
    // let body = new Blob([
    //   Buffer.from(imageString.split(",").at(1) || "", "base64"),
    // ]);

    // console.log(
    //   "BLOB:",
    //   body.size,
    //   imageString,
    //   imageString.slice(0, 30),
    //   imageString.split(",").at(1)!.length
    // );

    await this.apiCaller.post(
      `/group/${groupId}/token/${tokenId}`,
      {
        responseType: "blob",
        body: imageString.split(",").at(1) || "",
        headers: {
          "Content-Type": "image/png",
        },
      },
      true
    );
  }

  public async getGadgetImageUploadUrl(
    groupId: string,
    tokenId: string
  ): Promise<string | null> {
    let res = await this.apiCaller.post(
      `/group/${groupId}/token/${tokenId}/upload`,
      {
        responseType: "text",
      }
    );

    return res?.url ? res.url : null;
  }

  public async uploadGadgetImage(
    url: string,
    imageString: string
  ): Promise<void> {
    console.log(url, imageString.length);

    await axios.put(
      url,
      new Blob([Buffer.from(imageString.split(",").at(1) || "", "base64")])
    );
  }

  public async getGadgetImage(
    groupId: string,
    tokenId: string
  ): Promise<string | null> {
    try {
      let image = await this.apiCaller.get(
        `/group/${groupId}/token/${tokenId}`,
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
      return null;
    }
  }

  public async getGadgetsGroupByOwner(): Promise<Array<GadgetGroupClientModel> | null> {
    let groups = await this.apiCaller.get(`/resourceOwner`, {}, true);

    return groups.items || null;
  }

  public async getGroupGadgets(
    groupId: string
  ): Promise<Array<GadgetInfoClientModel> | null> {
    let gadgets = await this.apiCaller.get(
      `/group/${groupId}/gadgets`,
      {},
      true
    );

    return gadgets.items || null;
  }

  public async deleteGadgetGroup(groupId: string): Promise<void> {
    let body = {
      groupId: groupId,
    };

    await this.apiCaller.delete(`/group`, {
      responseType: "text",
      body: body,
    });
  }

  public async deleteGadget(groupId: string, tokenId: number): Promise<void> {
    let body = {
      tokenId: tokenId,
    };

    await this.apiCaller.delete(`/group/${groupId}/gadget`, {
      responseType: "text",
      body: body,
    });
  }

  public getGadgetImageUrl(groupId: string, tokenId: number): string {
    return `${this.apiCaller.apiBaseUrl}/${this.apiCaller.serviceSlug}/${this.apiCaller.appName}/group/${groupId}/token/${tokenId}`;
  }
}
