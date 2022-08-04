import {
  IAccesssConditionResult,
  IGetMetadataResponseDto,
} from "@minteeble/utils";
import { createContext } from "react";
import ReservedAreaService from "./ReservedAreaService";

export interface ReservedAreaServiceContent {
  reservedAreaService: ReservedAreaService | null;
  authorized: boolean | null;
  accessConditionsResult: Array<IAccesssConditionResult> | null;
  metadata: IGetMetadataResponseDto | null;
  loadArea: (areaUrlName: string) => Promise<void>;
}

export const ReservedAreaServiceContext =
  createContext<ReservedAreaServiceContent>({
    reservedAreaService: null,
    authorized: null,
    accessConditionsResult: null,
    metadata: null,

    // @ts-ignore
    loadArea: (areaUrlName: string) => new Promise(() => {}),
  });
