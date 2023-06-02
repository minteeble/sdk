import { JsonObject, JsonSerializer } from "typescript-json-serializer";
import { BaseService } from "../../models";
import {
  CreateFormRequestDto,
  FormClientModel,
  GetFormRequestDto,
  GetFormResponseDto,
  GetFormsResponseDto,
  ICreateFormRequestDto,
  IGetFormRequestDto,
} from "@minteeble/utils";

const serializer = new JsonSerializer();

export class FormsService extends BaseService {
  private static _instance: FormsService;
  static apiCaller: any;

  constructor() {
    super("gadgets");
  }

  public static get instance(): FormsService {
    if (!this._instance) this._instance = new FormsService();

    return this._instance;
  }

  public createForm = async (
    formName: string
  ): Promise<{ id: string } | null> => {
    const body: ICreateFormRequestDto = {
      formName: formName,
    };

    const res: FormClientModel = await this.apiCaller.post(
      `/form`,
      {
        responseType: "text",
        body: body,
      },
      true
    );

    if (!res.id) return null;

    const form = new FormClientModel();

    form.createdAt = res.createdAt;
    form.formName = res.formName;
    form.id = res.id;
    form.resourceOwner = res.resourceOwner;

    return form;
  };

  public getForm = async (
    formId: string
  ): Promise<GetFormResponseDto | null> => {
    const res: FormClientModel = await this.apiCaller.get(
      `/form/${formId}/form`,
      {
        responseType: "text",
        body: {},
      },
      true
    );

    const form: FormClientModel | null =
      serializer.deserializeObject<FormClientModel>(res, FormClientModel) ||
      null;

    return form;
  };

  public getForms = async (): Promise<FormClientModel[]> => {
    const res: GetFormsResponseDto = await this.apiCaller.get(
      `/forms`,
      {
        responseType: "text",
        body: {},
      },
      true
    );

    const forms =
      ((serializer.deserializeObjectArray<FormClientModel>(
        res.forms || [],
        FormClientModel
      ) || []) as FormClientModel[]) || [];

    return forms;
  };
}
