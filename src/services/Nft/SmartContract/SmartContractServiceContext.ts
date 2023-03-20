import { createContext } from "react";
import React from "react";

export interface SmartContractServiceContent {}

export const SmartContractServiceContext =
  createContext<SmartContractServiceContent>({});
