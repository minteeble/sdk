import { ICreateWebhookListenerResponseDto } from "@minteeble/utils";
import { useEffect, useState } from "react";
import WebhooksService from "./WebhooksService";
import { WebhooksServiceContext } from "./WebhooksServiceContext";
import React from "react";

export interface WebhooksServiceProviderProps {
  children: any;
}

export const WebhooksServiceProvider = (
  props: WebhooksServiceProviderProps
) => {
  const [webhooksService, setWebhooksService] =
    useState<WebhooksService | null>(null);

  useEffect(() => {
    let service = new WebhooksService();

    setWebhooksService(service);
  }, []);

  const createWebhookListener = async (
    name: string
  ): Promise<ICreateWebhookListenerResponseDto> => {
    return new Promise<ICreateWebhookListenerResponseDto>(
      async (resolve, reject) => {
        try {
          let data = await webhooksService?.createWebhookListener(name);

          resolve(data!);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      }
    );
  };

  return (
    <WebhooksServiceContext.Provider
      value={{ webhooksService, createWebhookListener }}
    >
      {props.children}
    </WebhooksServiceContext.Provider>
  );
};
