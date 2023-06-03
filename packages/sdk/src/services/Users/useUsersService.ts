import { useContext } from "react";
import { UsersServiceContext } from "./UsersServiceContext";

export const useUserService = () => {
  const context = useContext(UsersServiceContext);

  if (typeof context === undefined) {
    throw new Error(
      "`useUsersService` must be within a `UsersServiceProvider`"
    );
  }

  return context;
};
