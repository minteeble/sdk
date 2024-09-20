import { useContext } from "react";
import { sharedResoucesServiceContext } from "./SharedResoucesServiceContext";

export const useSharedResoucesService = () => {
  const context = useContext(sharedResoucesServiceContext);

  if (!context) {
    throw new Error(
      "`useSharedResoucesService` must be used within a `SharedResoucesServiceProvider`"
    );
  }

  return context;
};
