import {
  AddRedeemSystemProductRequestDto,
  ContactInformation,
  ICreateRedeemSystemInfoRequestDto,
  ICreateRedeemableRequestDto,
  IRedeemItemRequestDto,
  RedeemSystemConfigClientModel,
  RedeemSystemInfoClientModel,
  RedeemSystemInfoPreviewClientModel,
  RedeemType,
  ShippingInformation,
} from "@minteeble/utils";
import { JsonSerializer } from "typescript-json-serializer";
import { BaseService } from "../../models";
import axios from "axios";
import { RedeemItemRequestDto } from "@minteeble/utils";

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

  public getRedeemProductImageUrl = async (
    redeemSystemId: string,
    productId: string
  ): Promise<string> => {
    let url = await this.apiCaller.get(
      `/info/${redeemSystemId}/product/${productId}/image`,
      {},
      true
    );

    return url.url || "";
  };

  public updateRedeemSystemProduct = async (
    redeemSystemId: string,
    productId: string,
    name: string,
    description: string,
    supply?: number
  ): Promise<void> => {
    const body = {
      name,
      description,
      supply,
    };

    await this.apiCaller.put(`/info/${redeemSystemId}/product/${productId}`, {
      body,
    });
  };

  public updateRedeemSystemProductImage = async (
    url: string,
    imageString: string
  ) => {
    await axios.put(
      url,
      new Blob([Buffer.from(imageString.split(",").at(1) || "", "base64")])
    );
  };

  public deleteRedeemSystemProduct = async (
    redeemSystemId: string,
    productId: string
  ): Promise<void> => {
    await this.apiCaller.delete(
      `/info/${redeemSystemId}/product/${productId}`,
      {}
    );
  };

  public createRedeemSystemInfo = async (
    chainName: string,
    redeemType: RedeemType,
    collectionId: string,
    name: string
  ): Promise<string> => {
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
  };

  public getRedeemSystemInfo = async (
    redeemSystemId: string
  ): Promise<RedeemSystemInfoClientModel | null> => {
    let data = await this.apiCaller.get(`/info/${redeemSystemId}`, {}, true);

    let redeemSystemInfo =
      serializer.deserializeObject<RedeemSystemInfoClientModel>(
        data,
        RedeemSystemInfoClientModel
      );

    return redeemSystemInfo || null;
  };

  public getRedeemSystemsInfo =
    async (): Promise<Array<RedeemSystemInfoPreviewClientModel> | null> => {
      let data = await this.apiCaller.get(`/infos`, {}, true);

      console.log("DATA: ", data);

      let redeemSystemsInfo =
        (serializer.deserializeObjectArray<RedeemSystemInfoPreviewClientModel>(
          data.items,
          RedeemSystemInfoPreviewClientModel
        ) || []) as [];

      return redeemSystemsInfo || null;
    };

  public updateRedeemSystemInfo = async (
    name: string,
    collectionId: string,
    chainName: string,
    redeemSystemId: string,
    config: RedeemSystemConfigClientModel
  ): Promise<void> => {
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
  };

  public deleteRedeemSystemInfo = async (
    redeemSystemId: string
  ): Promise<void> => {
    let reqInit: any = {
      responseType: "text",
    };

    await this.apiCaller.delete(`/info/${redeemSystemId}/info`, reqInit);
  };

  public redeemItem = async (
    nftId: string,
    shippingInfo: ShippingInformation,
    contactInfo: ContactInformation,
    redeemSystemId: string,
    productId: string
  ): Promise<void> => {
    const body: IRedeemItemRequestDto = {
      nftId,
      shippingInfo,
      contactInfo,
      redeemSystemId,
      productId,
    };

    try {
      await this.apiCaller.post(`/redeem`, { body }, true);
    } catch (err) {
      console.log("Error on redeem item: ", err);
    }
  };

  public getRedeemableIds = async (
    redeemSystemId: string
  ): Promise<Array<number> | null> => {
    try {
      const res = await this.apiCaller.get(
        `/info/${redeemSystemId}/redeemable-ids`,
        {},
        true
      );

      const ids = (serializer.deserializeObjectArray<Array<number>>(
        res.ids,
        Array<number>
      ) || []) as [];

      return ids || null;
    } catch (err) {
      console.log("Error on get redeemable ids: ", err);
      return null;
    }
  };
}
