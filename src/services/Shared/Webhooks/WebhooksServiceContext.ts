import { ICreateWebhookListenerResponseDto } from "@minteeble/utils";
import { createContext } from "react";
import WebhooksService from "./WebhooksService";

export interface WebhooksServiceContent {
  webhooksService: WebhooksService | null;

  createWebhookListener: (
    name: string
  ) => Promise<ICreateWebhookListenerResponseDto>;
}

export const WebhooksServiceContext = createContext<WebhooksServiceContent>({
  webhooksService: null,

  //@ts-ignore
  createWebhookListener: (name: string) => new Promise(() => {}),
});
