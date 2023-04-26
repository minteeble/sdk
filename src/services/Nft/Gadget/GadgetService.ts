import {
  GadgetGroupClientModel,
  ICreateGadgetGroupRequestDto,
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

    let res = await this.apiCaller.post(`gadgets`, {
      name: name,
    });

    let id = res.id;

    if (!id) return null;

    let group = new GadgetGroupClientModel();
    group.id = id;
    group.name = name;

    return group;
  }

  public async getGadgetGroup(
    groupId: string
  ): Promise<GadgetGroupClientModel | null> {
    let data = await this.apiCaller.get(`/group/${groupId}/gadgets`, {}, true);

    let group = serializer.deserializeObject<GadgetGroupClientModel>(
      data,
      GadgetGroupClientModel
    );

    return group || null;
  }
}
