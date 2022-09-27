import {
  ICreateWebhookListenerResponseDto,
  IGetListenersResponseDto,
  WebhookEventClientModel,
} from "@minteeble/utils";
import { createContext } from "react";
import WebhooksService from "./WebhooksService";

export interface WebhooksServiceContent {
  webhooksService: WebhooksService | null;

  createWebhookListener: (
    name: string
  ) => Promise<ICreateWebhookListenerResponseDto>;

  getOwnedListeners: () => Promise<IGetListenersResponseDto>;

  getListenerEvents: (
    listenerId: string
  ) => Promise<Array<WebhookEventClientModel>>;
}

export const WebhooksServiceContext = createContext<WebhooksServiceContent>({
  webhooksService: null,

  //@ts-ignore
  createWebhookListener: (name: string) => new Promise(() => {}),

  getOwnedListeners: () => new Promise(() => {}),

  getListenerEvents: () => new Promise(() => {}),
});
