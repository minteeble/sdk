import { useEffect, useState } from "react";
import ReservedAreaService from "./ReservedAreaService";
import {
  ReservedAreaServiceContent,
  ReservedAreaServiceContext,
} from "./ReservedAreaServiceContext";
import React from "react";
import {
  IAccesssConditionResult,
  IGetMetadataResponseDto,
} from "@minteeble/utils";

export interface ReservedAreaServiceProviderProps {
  children: any;
}

export const ReservedAreaServiceProvider = (
  props: ReservedAreaServiceProviderProps
) => {
  const [reservedAreaService, setReservedAreaService] =
    useState<ReservedAreaService | null>(null);

  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [accessConditionsResult, setAccessConditionsResult] =
    useState<Array<IAccesssConditionResult> | null>(null);
  const [metadata, setMetadata] = useState<IGetMetadataResponseDto | null>(
    null
  );

  useEffect(() => {
    let service = new ReservedAreaService();

    setReservedAreaService(service);
  }, []);

  const loadArea = async (areaUrlName: string): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        if (reservedAreaService) {
          let [accessResult, metadata] = await Promise.all([
            reservedAreaService.getAccessConditionsResult(areaUrlName),
            reservedAreaService.getMetadata(areaUrlName),
          ]);

          setAccessConditionsResult(accessResult);
          setMetadata(metadata);

          resolve();
        }
      } catch (err) {
        setAuthorized(null);
        setAccessConditionsResult(null);
        setMetadata(null);

        console.log(err);
        reject(err);
      }
    });
  };

  return (
    <ReservedAreaServiceContext.Provider
      value={{
        authorized,
        accessConditionsResult,
        metadata,
        loadArea,
        reservedAreaService,
      }}
    >
      {props.children}
    </ReservedAreaServiceContext.Provider>
  );
};
