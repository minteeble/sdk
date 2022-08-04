import {
  GetMetadataResponseDto,
  IAccesssConditionResult,
} from "@minteeble/utils";
import { API } from "aws-amplify";

class ReservedAreaService {
  constructor() {}

  public getAccessConditionsResult = async (
    areaUrlName: string
  ): Promise<Array<IAccesssConditionResult>> => {
    try {
      let data = await API.get(
        "ApiGatewayRestApi",
        `/reserved-area/${areaUrlName}/access-conditions-result`,
        {
          responseType: "text",
        }
      );

      return data as Array<IAccesssConditionResult>;
    } catch (err) {
      console.log("Error on getting Access Conditions Result:", err);
      throw err;
    }
  };

  public getMetadata = async (
    areaUrlName: string
  ): Promise<GetMetadataResponseDto> => {
    try {
      let data = await API.get(
        "ApiGatewayRestApi",
        `/reserved-area/${areaUrlName}/metadata`,
        {
          responseType: "text",
        }
      );

      return data as GetMetadataResponseDto;
    } catch (err) {
      console.log("Error on getting Access Conditions Result:", err);
      throw err;
    }
  };
}

export default ReservedAreaService;
