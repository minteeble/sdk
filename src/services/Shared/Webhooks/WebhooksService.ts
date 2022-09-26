import {
  ICreateWebhookListenerRequestDto,
  ICreateWebhookListenerResponseDto,
  IGetListenersResponseDto,
  WebhookListenerClientModel,
} from "@minteeble/utils";
import { API } from "aws-amplify";
import { BaseService } from "../../../shared/BaseService";

/**
 * Service class fro Webhooks
 */
class WebhooksService extends BaseService {
  constructor() {
    super("webhooks");
  }

  /**
   * Creates a new webhook listener
   *
   * @param name Webhook listener name
   * @returns Info about created listener
   */
  public createWebhookListener = async (
    name: string
  ): Promise<ICreateWebhookListenerResponseDto> => {
    let bodyPayload: ICreateWebhookListenerRequestDto = {
      name,
    };

    try {
      let data = await this.apiCaller.post(`/listener`, {
        responseType: "text",
        body: bodyPayload,
      });

      return data as any;
    } catch (err) {
      console.log("Error on creating Webhook Listener:", err);
      throw err;
    }
  };

  /**
   * Gets the list of webhook listeners owned by caller user
   * @returns List of owned webhooks listener
   */
  public getOwnedListeners = async (): Promise<IGetListenersResponseDto> => {
    try {
      let data = await this.apiCaller.get(`/listener`, {
        responseType: "text",
      });

      return data;
    } catch (err) {
      console.log("Error on getting Webhook Listener:", err);
      throw err;
    }
  };
}

export default WebhooksService;
