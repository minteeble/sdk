import {
  GadgetGroupClientModel,
  GadgetInfoClientModel,
  ICreateGadgetGroupRequestDto,
  ICreateGadgetImageRequestDto,
  ICreateGadgetRequestDto,
} from "@minteeble/utils";
import { BaseService } from "../../../shared/BaseService";
import { JsonSerializer } from "typescript-json-serializer";

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
    name: string
  ): Promise<GadgetGroupClientModel | null> {
    let body: ICreateGadgetGroupRequestDto = {
      name: name,
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
    let body: ICreateGadgetImageRequestDto = {
      groupId: groupId,
      tokenId: tokenId,
      imageString: imageString,
    };

    await this.apiCaller.post(
      `/group/${groupId}/token/${tokenId}`,
      {
        responseType: "text",
        body: body,
      },
      true
    );
  }

  public async getGadgetImage(
    groupId: string,
    tokenId: string
  ): Promise<string | null> {
    let image = await this.apiCaller.get(
      `/group/${groupId}/token/${tokenId}`,
      {},
      true
    );

    return image || null;
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
}
