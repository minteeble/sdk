import {
  ICreatePredicateRequestDto,
  PredicateClientModel,
  PredicateParameter,
  PredicateParameterValue,
} from "@minteeble/utils";
import { BaseService } from "../../models";
import { JsonSerializer } from "typescript-json-serializer";

const serializer = new JsonSerializer();

class PredicatesService extends BaseService {
  private static _instance: PredicatesService;

  constructor() {
    super("predicates");
  }

  public static get instance(): PredicatesService {
    if (!this._instance) this._instance = new PredicatesService();

    return this._instance;
  }

  public async createPredicate(
    code: string,
    parameters: Array<PredicateParameter>,
    name: string
  ): Promise<string> {
    let body: ICreatePredicateRequestDto = {
      code: code,
      parameters: parameters,
      name: name,
    };

    let reqInit: any = {
      responseType: "text",
      body,
    };

    let res = await this.apiCaller.post(`/predicate`, reqInit, true);

    if (res && res.id && typeof res.id === "string") {
      return res.id;
    } else throw new Error("Fail on creating predicate.");
  }

  public async getPredicate(id: string): Promise<PredicateClientModel | null> {
    let data = await this.apiCaller.get(`/predicate/${id}/predicate`, {}, true);

    let predicate = serializer.deserializeObject<PredicateClientModel>(
      data,
      PredicateClientModel
    );

    return predicate || null;
  }

  public async getPredicates(): Promise<PredicateClientModel[] | null> {
    let data = await this.apiCaller.get(`/predicates`, {}, true);

    let predicates = (serializer.deserializeObjectArray<PredicateClientModel>(
      data.items,
      PredicateClientModel
    ) || []) as [];

    return predicates || null;
  }

  public async updatePredicate(
    id: string,
    code: string,
    parameters: Array<PredicateParameter>,
    name: string
  ) {
    let body = {
      code: code,
      parameters: parameters,
      name: name,
    };

    let reqInit: any = {
      responseType: "text",
      body,
    };

    await this.apiCaller.put(`/predicate/${id}/predicate`, reqInit, true);
  }

  public async deletePredicate(id: string): Promise<void> {
    let reqInit: any = {
      responseType: "text",
    };
    await this.apiCaller.delete(`/predicate/${id}/predicate`, reqInit);
  }

  public async executePredicate(
    id: string,
    parameters: PredicateParameterValue[]
  ): Promise<string | null> {
    let reqInit: any = {
      parameters: parameters,
      responseType: "text",
    };
    let result = await this.apiCaller.post(
      `predicate/${id}/predicate`,
      reqInit
    );

    return result || null;
  }
}

export { PredicatesService };
