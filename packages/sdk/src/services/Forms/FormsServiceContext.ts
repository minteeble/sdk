import {
  FormAnswerClientModel,
  FormClientModel,
  GetFormResponseDto,
} from "@minteeble/utils";
import { createContext } from "react";

export interface FormsServiceContent {
  createForm: (formName: string) => Promise<{ id: string } | null>;
  getForm: (formId: string) => Promise<FormClientModel | null>;
  getForms: () => Promise<FormClientModel[]>;
  deleteForm: (formId: string) => Promise<void>;
  getFormAnswers: (formId: string) => Promise<Array<FormAnswerClientModel>>;
  sendFormAnswer: (
    formId: string,
    fields: { [key: string]: any }
  ) => Promise<void>;
}

export const formsServiceContext = createContext<FormsServiceContent>({
  createForm: () => new Promise(() => {}),
  getForm: () => new Promise(() => {}),
  getForms: () => new Promise(() => {}),
  deleteForm: () => new Promise(() => {}),
  getFormAnswers: () => new Promise(() => {}),
  sendFormAnswer: () => new Promise(() => {}),
});
