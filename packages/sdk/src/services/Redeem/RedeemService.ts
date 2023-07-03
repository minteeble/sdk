import {
  AddRedeemSystemProductRequestDto,
  ICreateRedeemSystemInfoRequestDto,
  ICreateRedeemableRequestDto,
  RedeemSystemConfigClientModel,
  RedeemSystemInfoClientModel,
  RedeemSystemInfoPreviewClientModel,
  RedeemType,
} from "@minteeble/utils";
import { JsonSerializer } from "typescript-json-serializer";
import { BaseService } from "../../models";
import axios from "axios";

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

  public addRedeemSystemProduct = async (
    redeemSystemId: string,
    name: string,
    description: string,
    supply?: number
  ): Promise<void> => {
    const body = {
      name,
      description,
      supply,
    };

    await this.apiCaller.post(
      `/info/${redeemSystemId}/product`,
      { body },
      true
    );
  };

  public async getRedeemProductImageUrl(
    redeemSystemId: string,
    productId: string
  ): Promise<string> {
    let url = await this.apiCaller.get(
      `/info/${redeemSystemId}/product/${productId}/image`,
      {},
      true
    );

    return url.url || "";
  }

  public async updateRedeemSystemProduct(
    redeemSystemId: string,
    productId: string,
    name: string,
    description: string,
    supply?: number
  ): Promise<void> {
    const body = {
      name,
      description,
      supply,
    };

    await this.apiCaller.put(`/info/${redeemSystemId}/product/${productId}`, {
      body,
    });
  }

  public async updateRedeemSystemProductImage(
    url: string,
    imageString: string
  ) {
    await axios.put(
      url,
      new Blob([Buffer.from(imageString.split(",").at(1) || "", "base64")])
    );
  }

  public async deleteRedeemSystemProduct(
    redeemSystemId: string,
    productId: string
  ): Promise<void> {
    await this.apiCaller.delete(
      `/info/${redeemSystemId}/product/${productId}`,
      {}
    );
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

  public async getRedeemSystemInfo(
    redeemSystemId: string
  ): Promise<RedeemSystemInfoClientModel | null> {
    let data = await this.apiCaller.get(`/info/${redeemSystemId}`, {}, true);

    let redeemSystemInfo =
      serializer.deserializeObject<RedeemSystemInfoClientModel>(
        data,
        RedeemSystemInfoClientModel
      );

    return redeemSystemInfo || null;
  }

  public async getRedeemSystemsInfo(): Promise<Array<RedeemSystemInfoPreviewClientModel> | null> {
    let data = await this.apiCaller.get(`/infos`, {}, true);

    console.log("DATA: ", data);

    let redeemSystemsInfo =
      (serializer.deserializeObjectArray<RedeemSystemInfoPreviewClientModel>(
        data.items,
        RedeemSystemInfoPreviewClientModel
      ) || []) as [];

    return redeemSystemsInfo || null;
  }

  public async updateRedeemSystemInfo(
    name: string,
    collectionId: string,
    chainName: string,
    redeemSystemId: string,
    config: RedeemSystemConfigClientModel
  ): Promise<void> {
    let body = {
      name,
      collectionId,
      chainName,
      config,
    };

    let reqInit: any = {
      responseType: "text",
      body,
    };

    await this.apiCaller.put(`/info/${redeemSystemId}`, reqInit, true);
  }

  public async deleteRedeemSystemInfo(redeemSystemId: string): Promise<void> {
    let reqInit: any = {
      responseType: "text",
    };

    await this.apiCaller.delete(`/info/${redeemSystemId}/info`, reqInit);
  }
}
