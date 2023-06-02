import { FormClientModel, GetFormResponseDto } from "@minteeble/utils";
import { createContext } from "react";

export interface FormsServiceContent {
  createForm: (formName: string) => Promise<{ id: string } | null>;
  getForm: (formId: string) => Promise<GetFormResponseDto | null>;
  getForms: () => Promise<FormClientModel[]>;
}

export const formsServiceContext = createContext<FormsServiceContent>({
  createForm: () => new Promise(() => {}),
  getForm: () => new Promise(() => {}),
  getForms: () => new Promise(() => {}),
});
