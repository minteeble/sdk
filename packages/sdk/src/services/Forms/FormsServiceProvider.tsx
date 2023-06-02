import React from "react";
import { FormsServiceProviderProps } from "./FormsService.types";
import { formsServiceContext } from "./FormsServiceContext";
import { FormsService } from "./FormsService";
import { FormClientModel, GetFormResponseDto } from "@minteeble/utils";

const FormsServiceProvider = (props: FormsServiceProviderProps) => {
  const createForm = async (
    formName: string
  ): Promise<{ id: string } | null> => {
    return await FormsService.instance.createForm(formName);
  };

  const getForm = async (
    formId: string
  ): Promise<GetFormResponseDto | null> => {
    return await FormsService.instance.getForm(formId);
  };

  const getForms = async (): Promise<FormClientModel[]> => {
    return await FormsService.instance.getForms();
  };
  return (
    <formsServiceContext.Provider
      value={{
        createForm,
        getForm,
        getForms,
      }}
    >
      {props.children}
    </formsServiceContext.Provider>
  );
};

export default FormsServiceProvider;
