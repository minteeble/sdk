// import { GetNavigationByGroupResponseDto } from "@minteeble/utils";
// import { API } from "aws-amplify";

/**
 * Service for handling Navigation info
 */
class NavigationService {
  constructor() {}

  // public getNavigationInfoForGroup = async (
  //   groupName: string
  // ): Promise<GetNavigationByGroupResponseDto> => {
  //   try {
  //     let data = await API.get(
  //       "ApiGatewayRestApi",
  //       `/navigation/group/${groupName}`,
  //       {
  //         responseType: "text",
  //       }
  //     );

  //     return data as GetNavigationByGroupResponseDto;
  //   } catch (err) {
  //     console.log("Error on getting Navigation info for group:", err);
  //     throw err;
  //   }
  // };

  // public getNavigationInfoForUser =
  //   async (): Promise<GetNavigationByGroupResponseDto> => {
  //     try {
  //       let data = await API.get("ApiGatewayRestApi", `/navigation`, {
  //         responseType: "text",
  //       });

  //       return data as GetNavigationByGroupResponseDto;
  //     } catch (err) {
  //       console.log("Error on getting Navigation info for user:", err);
  //       throw err;
  //     }
  //   };
}

export default NavigationService;
