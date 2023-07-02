import { JsonObject, JsonSerializer } from "typescript-json-serializer";
import { BaseService } from "../../models";
import {
  FormClientModel,
  FormAnswerClientModel,
  GetFormsResponseDto,
  ICreateFormRequestDto,
  GetFormAnswersResponseDto,
} from "@minteeble/utils";

const serializer = new JsonSerializer();

export class FormsService extends BaseService {
  private static _instance: FormsService;
  static apiCaller: any;

  constructor() {
    super("form");
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

  public getForm = async (formId: string): Promise<FormClientModel | null> => {
    const res: FormClientModel = await this.apiCaller.get(
      `/form/${formId}`,
      {
        responseType: "text",
      },
      true
    );

    const form: FormClientModel | null =
      serializer.deserializeObject<FormClientModel>(res, FormClientModel) ||
      null;

    return form;
  };

  public getCsvFormAnswers = async (formId: string): Promise<string | null> => {
    try {
      const csv = await this.apiCaller.get(
        `/form/${formId}/csv`,
        {
          responseType: "text",
        },
        true
      );

      if (csv.success === false) {
        return null;
      }

      return csv || null;
    } catch (err) {
      return null;
    }
  };

  public getForms = async (): Promise<FormClientModel[]> => {
    const res: GetFormsResponseDto = await this.apiCaller.get(
      `/forms`,
      {
        responseType: "text",
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

  public deleteForm = async (formId: string): Promise<void> => {
    await this.apiCaller.delete(`/form/${formId}`, {
      responseType: "text",
      body: {},
    });
  };

  public getFormAnswers = async (
    formId: string
  ): Promise<Array<FormAnswerClientModel>> => {
    const res: GetFormAnswersResponseDto = await this.apiCaller.get(
      `/form/${formId}/answers`,
      {
        responseType: "text",
      },
      true
    );

    const answers =
      ((serializer.deserializeObjectArray<FormAnswerClientModel>(
        res.answers || [],
        FormAnswerClientModel
      ) || []) as FormAnswerClientModel[]) || [];

    return answers;
  };

  public async sendAnswer(
    formId: string,
    fields: { [key: string]: any },
    authenticated: boolean
  ) {
    await this.apiCaller.post(
      `/form/${formId}/answer${authenticated ? "" : "/noauth"}`,
      {
        responseType: "text",
        body: {
          fields: fields,
        },
      },
      authenticated
    );
  }
}
