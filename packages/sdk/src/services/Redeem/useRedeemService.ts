import React from "react";
import { RedeemServiceContext } from "./RedeemServiceContext";

export const useRedeemService = () => {
  const context = React.useContext(RedeemServiceContext);

  if (typeof context === undefined) {
    throw new Error(
      "`useRedeemService` must be within a `RedeemServiceProvider`"
    );
  }

  return context;
};
