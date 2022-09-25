import {
  ICreateWebhookListenerRequestDto,
  ICreateWebhookListenerResponseDto,
} from "@minteeble/utils";
import { API } from "aws-amplify";

class WebhooksService {
  constructor() {}

  public createWebhookListener = async (
    name: string
  ): Promise<ICreateWebhookListenerResponseDto> => {
    let bodyPayload: ICreateWebhookListenerRequestDto = {
      name,
    };

    try {
      let data = await API.post(
        "ApiGatewayRestApi",
        `/webhooks/${"default"}/listener`,
        {
          responseType: "text",
          body: bodyPayload,
        }
      );

      return data as any;
    } catch (err) {
      console.log("Error on creating Webhook Listener:", err);
      throw err;
    }
  };
}

export default WebhooksService;
