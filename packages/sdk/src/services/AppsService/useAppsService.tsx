import { useContext } from "react";
import { appServiceContext } from "./AppsServiceContext";

const useAppsService = () => {
  const context = useContext(appServiceContext);

  if (typeof context === "undefined")
    throw new Error("`useAppsService` must be within a `AppsServiceProvider`");

  return context;
};

export default useAppsService;
