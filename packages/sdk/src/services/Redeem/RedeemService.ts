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
  RedeemType,
} from "@minteeble/utils";
import { JsonSerializer } from "typescript-json-serializer";
import { BaseService } from "../../models";

const serializer = new JsonSerializer();

export class RedeemService extends BaseService {
  private static _instance: RedeemService;

  constructor() {
    super("redeem");
  }

  public static get instance(): RedeemService {
    if (!this._instance) this._instance = new RedeemService();

    return this._instance;
  }

  public async addRedeemSystemProduct() {}

  public async createRedeemRequest(redeemConfigId: string): Promise<string> {
    let body: ICreateRedeemableRequestDto = {
      redeemConfigId: redeemConfigId,
    };

    let reqInit: any = {
      responseType: "text",
      body,
    };

    let res = await this.apiCaller.post(`/request`, reqInit, true);

    if (res && res.id && typeof res.id === "string") {
      return res.id;
    } else throw new Error("Fail on creating Redeem Request.");
  }

  public async createRedeemSystemInfo(
    chainName: string,
    redeemType: RedeemType,
    collectionId: string,
    name: string
  ): Promise<string> {
    let body: ICreateRedeemSystemInfoRequestDto = {
      chainName: chainName,
      redeemType: redeemType,
      collectionId: collectionId,
      name: name,
    };

    let reqInit: any = {
      responseType: "text",
      body,
    };

    let res = await this.apiCaller.post(`/info`, reqInit, true);

    if (res && res.id && typeof res.id === "string") {
      return res.id;
    } else throw new Error("Fail on creating Redeem System.");
  }

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

  public async updateRedeemSystemInfo(
    name: string,
    collectionId: string,
    chainName: string,
    id: string
  ): Promise<void> {
    let body = {
      name,
      collectionId,
      chainName,
    };

    let reqInit: any = {
      responseType: "text",
      body,
    };

    await this.apiCaller.put(`/info/${id}`, reqInit, true);
  }

  public async deleteRedeemSystemInfo(id: string): Promise<void> {
    let reqInit: any = {
      responseType: "text",
    };

    await this.apiCaller.delete(`/info/${id}/info`, reqInit);
  }
}
