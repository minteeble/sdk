import { createContext } from "react";
import {
  PredicateClientModel,
  PredicateParameter,
  PredicateParameterValue,
} from "@minteeble/utils";

export interface PredicatesServiceContent {
  createPredicate(
    code: string,
    parameters: Array<PredicateParameter>,
    name: string
  ): Promise<string>;
  getPredicate(id: string): Promise<PredicateClientModel | null>;
  getPredicates(): Promise<PredicateClientModel[] | null>;
  updatePredicate(predicate: PredicateClientModel): Promise<void>;
  deletePredicate(id: string): Promise<void>;
  executePredicate(
    id: string,
    parameters: PredicateParameterValue[]
  ): Promise<string | null>;
}

export const PredicatesServiceContext = createContext<PredicatesServiceContent>(
  {
    createPredicate: () => new Promise(() => {}),
    getPredicate: () => new Promise(() => {}),
    getPredicates: () => new Promise(() => {}),
    updatePredicate: () => new Promise(() => {}),
    deletePredicate: () => new Promise(() => {}),
    executePredicate: () => new Promise(() => {}),
  }
);
