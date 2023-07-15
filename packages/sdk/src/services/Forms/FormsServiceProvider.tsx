import React from "react";
import { FormsServiceProviderProps } from "./FormsService.types";
import { formsServiceContext } from "./FormsServiceContext";
import { FormsService } from "./FormsService";
import {
  FormAnswerClientModel,
  FormClientModel,
  GetFormResponseDto,
} from "@minteeble/utils";

const FormsServiceProvider = (props: FormsServiceProviderProps) => {
  const createForm = async (
    formName: string
  ): Promise<{ id: string } | null> => {
    return await FormsService.instance.createForm(formName);
  };

  const getForm = async (formId: string): Promise<FormClientModel | null> => {
    return await FormsService.instance.getForm(formId);
  };

  const getForms = async (): Promise<FormClientModel[]> => {
    return await FormsService.instance.getForms();
  };

  const deleteForm = async (formId: string): Promise<void> => {
    return await FormsService.instance.deleteForm(formId);
  };

  const getFormAnswers = async (
    formId: string
  ): Promise<Array<FormAnswerClientModel>> => {
    return await FormsService.instance.getFormAnswers(formId);
  };

  const getCsvFormAnswers = async (formId: string): Promise<string | null> => {
    return await FormsService.instance.getCsvFormAnswers(formId);
  };

  const sendFormAnswer = async (
    formId: string,
    fields: { [key: string]: any },
    authenticated: boolean
  ): Promise<void> => {
    return FormsService.instance.sendAnswer(formId, fields, authenticated);
  };

  return (
    <formsServiceContext.Provider
      value={{
        createForm,
        getForm,
        getForms,
        deleteForm,
        getFormAnswers,
        getCsvFormAnswers,
        sendFormAnswer,
      }}
    >
      {props.children}
    </formsServiceContext.Provider>
  );
};

export default FormsServiceProvider;
