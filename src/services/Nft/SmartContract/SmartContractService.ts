import { SmartContractClientModel } from "@minteeble/utils";
import { JsonSerializer } from "typescript-json-serializer";
import { BaseService } from "../../../shared/BaseService";
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

    console.log("Raw smart contract", data);

    let smartContract = serializer.deserializeObject<SmartContractClientModel>(
      data,
      SmartContractClientModel
    );

    console.log("After:", smartContract);

    return smartContract || null;
  }
}
