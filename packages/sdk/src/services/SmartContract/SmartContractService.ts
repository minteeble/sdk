import {
  ICreateSmartContractRequestDto,
  ISmartContractClientModel,
  SmartContractClientModel,
} from "@minteeble/utils";
import { JsonSerializer } from "typescript-json-serializer";
import { BaseService } from "../../models";
import { SmartContractInstance } from "./SmartContractInstance";

const serializer = new JsonSerializer();

/**
 * Smart contract service
 */
export class SmartContractService extends BaseService {
  private static _instance: SmartContractService;

  constructor() {
    super("smart-contract");
  }

  public static get instance(): SmartContractService {
    if (!this._instance) this._instance = new SmartContractService();

    return this._instance;
  }

  public async createSmartContract(
    chainName: string,
    address: string,
    abi: string
  ): Promise<ISmartContractClientModel> {
    let bodyPayload: ICreateSmartContractRequestDto = {
      chainName,
      address,
      abi,
    };

    let data = await this.apiCaller.post("/contract", {
      responseType: "text",
      body: bodyPayload,
    });

    return data as ISmartContractClientModel;
  }

  public async getSmartContractInfo(
    chainName: string,
    id: string
  ): Promise<SmartContractClientModel | null> {
    let reqInit: any = {
      responseType: "text",
    };

    let data = await this.apiCaller.get(
      `/contract/chain/${chainName}/id/${id}`,
      reqInit,
      false
    );

    let smartContract = serializer.deserializeObject<SmartContractClientModel>(
      data,
      SmartContractClientModel
    );

    return smartContract || null;
  }
}
