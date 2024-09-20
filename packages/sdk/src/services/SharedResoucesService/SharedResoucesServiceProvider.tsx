import { SharedResoucesService } from "./SharedResoucesService";
import { SharedResoucesServiceProviderProps } from "./SharedResoucesService.types";
import { sharedResoucesServiceContext } from "./SharedResoucesServiceContext";
import React from "react";

const SharedResoucesServiceProvider = (
  props: SharedResoucesServiceProviderProps
) => {
  //Methods
  const urlCaller = async (url: string): Promise<any | null> => {
    return SharedResoucesService.instance.urlCaller(url);
  };

  return (
    <sharedResoucesServiceContext.Provider value={{ urlCaller }}>
      {props.children}
    </sharedResoucesServiceContext.Provider>
  );
};

export default SharedResoucesServiceProvider;
