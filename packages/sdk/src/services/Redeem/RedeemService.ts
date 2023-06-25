import { createContext } from "react";
import {
  ICreateRedeemSystemInfoRequestDto,
  ICreateRedeemableRequestDto,
  IRedeemItemRequestDto,
  RedeemProductClientModel,
  RedeemRequestClientModel,
  RedeemSystemConfigClientModel,
  RedeemSystemInfoClientModel,
  RedeemSystemInfoPreviewClientModel,
} from "@minteeble/utils";
import { JsonSerializer } from "typescript-json-serializer";
import { BaseService } from "../../models";

const serializer = new JsonSerializer();

export class RedeemService extends BaseService {
  private static _instance: RedeemService;

  constructor() {
    super("predicates");
  }

  public static get instance(): RedeemService {
    if (!this._instance) this._instance = new RedeemService();

    return this._instance;
  }

  public async addRedeemSystemProduct() {}

  public async createRedeemRequest() {}

  public async createRedeemSystemInfo() {}

  public async getRedeemRequest(
    id: string,
    redeemConfigId: string
  ): Promise<RedeemRequestClientModel | null> {
    let data = await this.apiCaller.get(
      `/info/${redeemConfigId}/request/${id}/request`,
      {},
      true
    );

    let redeemRequest = serializer.deserializeObject<RedeemRequestClientModel>(
      data,
      RedeemRequestClientModel
    );

    return redeemRequest || null;
  }

  public async getRedeemSystemInfo(
    id: string
  ): Promise<RedeemSystemInfoClientModel | null> {
    let data = await this.apiCaller.get(`/info/${id}`, {}, true);

    let redeemSystemInfo =
      serializer.deserializeObject<RedeemSystemInfoClientModel>(
        data,
        RedeemSystemInfoClientModel
      );

    return redeemSystemInfo || null;
  }

  public async getRedeemSystemsInfo(): Promise<Array<RedeemSystemInfoPreviewClientModel> | null> {
    let data = await this.apiCaller.get(`/infos`, {}, true);

    let redeemSystemsInfo =
      (serializer.deserializeObjectArray<RedeemSystemInfoPreviewClientModel>(
        data,
        RedeemSystemInfoPreviewClientModel
      ) || []) as [];

    return redeemSystemsInfo || null;
  }

  public async updateRedeemSystemInfo() {}

  public async deleteRedeemRequest() {}

  public async deleteRedeemSystemInfo() {}
}
