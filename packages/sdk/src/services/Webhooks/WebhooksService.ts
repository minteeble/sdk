import {
  ICreateWebhookListenerRequestDto,
  ICreateWebhookListenerResponseDto,
  IGetListenersResponseDto,
  IWebhookEventClientModel,
  IViewerUpdateRequestDto,
  WebhookListenerClientModel,
} from "@minteeble/utils";
import { API } from "aws-amplify";
import { BaseService } from "../../models";

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
      let data = await this.apiCaller.get(`/listeners`, {
        responseType: "text",
      });

      return data;
    } catch (err) {
      console.log("Error on getting Webhook Listener:", err);
      throw err;
    }
  };

  /**
   * Gets the list of events for a specified listener
   *
   * @param listenerId Listener ID
   * @returns List of events
   */
  public getListenerEvents = async (
    listenerId: string
  ): Promise<Array<IWebhookEventClientModel>> => {
    try {
      let data = await this.apiCaller.get(`/listener/${listenerId}/events`, {
        responseType: "text",
      });

      return data.events || [];
    } catch (err) {
      console.log("Error on getting Webhook Listener:", err);
      throw err;
    }
  };

  public addListenerViewer = async (
    listenerId: string,
    viewerAddress: string
  ): Promise<void> => {
    try {
      let bodyPayload: IViewerUpdateRequestDto = {
        listenerId: listenerId,
        viewerAddress: viewerAddress,
      } as IViewerUpdateRequestDto;

      await this.apiCaller.post(`/listener/${listenerId}/viewer`, {
        responseType: "text",
        body: bodyPayload,
      });
    } catch (err) {
      console.log("Error on adding listener viewer:", err);
      throw err;
    }
  };

  public removeListenerViewer = async (
    listenerId: string,
    viewerAddress: string
  ): Promise<void> => {
    try {
      let bodyPayload = {
        listenerId: listenerId,
      };

      await this.apiCaller.post(
        `/listener/${listenerId}/viewer/${viewerAddress}`,
        {
          responseType: "text",
          body: bodyPayload,
        }
      );
    } catch (err) {
      console.log("Error on adding listener viewer:", err);
      throw err;
    }
  };
}

export default WebhooksService;
