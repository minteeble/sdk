import { useContext } from "react";
import { formsServiceContext } from "./FormsServiceContext";

const useFormsService = () => {
  const context = useContext(formsServiceContext);

  if (typeof context === "undefined")
    throw new Error(
      "`useFormsService` must be within a `FormsServiceProvider`"
    );

  return context;
};

export default useFormsService;
