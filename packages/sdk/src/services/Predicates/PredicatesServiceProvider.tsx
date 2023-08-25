import {
  PredicateClientModel,
  PredicateParameter,
  PredicateParameterValue,
} from "@minteeble/utils";
import React from "react";
import { PredicatesService } from "./PredicatesService";
import { PredicatesServiceProviderProps } from "./PredicatesService.types";
import { PredicatesServiceContext } from "./PredicatesServiceContext";

export const PredicatesServiceProvider = (
  props: PredicatesServiceProviderProps
) => {
  const createPredicate = async (
    code: string,
    parameters: Array<PredicateParameter>,
    name: string
  ): Promise<PredicateClientModel> => {
    return PredicatesService.instance.createPredicate(code, parameters, name);
  };

  const getPredicate = async (
    id: string
  ): Promise<PredicateClientModel | null> => {
    return PredicatesService.instance.getPredicate(id);
  };

  const getPredicates = async (): Promise<PredicateClientModel[] | null> => {
    return PredicatesService.instance.getPredicates();
  };

  const updatePredicate = async (
    predicate: PredicateClientModel
  ): Promise<void> => {
    return PredicatesService.instance.updatePredicate(predicate);
  };

  const deletePredicate = async (id: string): Promise<void> => {
    return PredicatesService.instance.deletePredicate(id);
  };

  const executePredicate = async (
    id: string,
    parameters: PredicateParameterValue[]
  ): Promise<any> => {
    return PredicatesService.instance.executePredicate(id, parameters);
  };

  return (
    <PredicatesServiceContext.Provider
      value={{
        createPredicate,
        getPredicate,
        getPredicates,
        updatePredicate,
        deletePredicate,
        executePredicate,
      }}
    >
      {props.children}
    </PredicatesServiceContext.Provider>
  );
};
