import {
  GadgetGroupClientModel,
  GadgetInfoClientModel,
  GetGadgetsBatchUploadUrlResponseDto,
  ICreateGadgetGroupRequestDto,
  ICreateGadgetImageRequestDto,
  ICreateGadgetRequestDto,
} from "@minteeble/utils";
import { BaseService } from "../../models";
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

  public async updateGadget(
    groupId: string,
    tokenId: number,
    traitName: string,
    value: string
  ): Promise<void> {
    let body: ICreateGadgetRequestDto = {
      groupId: groupId,
      traitName: traitName,
      value: value,
      tokenId: tokenId,
    };

    return;

    // TODO: wait api completion
    // await this.apiCaller.put(
    //   `/group/${groupId}/gadget/${tokenId}`,
    //   {
    //     responseType: "text",
    //     body: body,
    //   },
    //   true
    // );
  }

  public async createGadgetImage(
    groupId: string,
    tokenId: string,
    imageString: string
  ): Promise<void> {
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
    imageData: string | Blob
  ): Promise<void> {
    let blobData: Blob =
      typeof imageData === "string"
        ? new Blob([
            Buffer.from(
              `data:image/png;base64,${imageData}`.split(",").at(1) || "",
              "base64"
            ),
          ])
        : imageData;

    await axios.put(url, blobData);
  }

  public async getGadgetImage(
    groupId: string,
    tokenId: string
  ): Promise<Blob | null> {
    try {
      let image = await this.apiCaller.get(
        `/group/${groupId}/token/${tokenId}`,
        {
          responseType: "blob",
        },
        false
      );

      return image;
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

  public async getGadgetsBatchUploadUrl(
    groupId: string
  ): Promise<GetGadgetsBatchUploadUrlResponseDto | null> {
    let res = await this.apiCaller.get(
      `/group/${groupId}/zip`,
      {
        responseType: "text",
      },
      true
    );

    const responseDto =
      serializer.deserializeObject<GetGadgetsBatchUploadUrlResponseDto>(
        res,
        GetGadgetsBatchUploadUrlResponseDto
      );

    return responseDto || null;
  }

  public async batchCreateGadgets(
    groupId: string,
    requestId: string
  ): Promise<{ success: boolean; message?: string }> {
    let path = `/group/${groupId}/gadget/batch-upload/request/${requestId}`;

    let res = await this.apiCaller.post(
      path,
      {
        responseType: "text",
      },
      true
    );

    return res as any;
  }
}
