import React from "react";
import { WebhooksServiceContext } from "./WebhooksServiceContext";

export const useWebhooksService = () => {
  const context = React.useContext(WebhooksServiceContext);

  if (typeof context === undefined) {
    throw new Error(
      "`useWebhooksService` must be within a `WebhooksServiceProvider`"
    );
  }

  return context;
};
