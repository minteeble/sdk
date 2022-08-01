import { createContext } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";

export interface AuthServiceContent {
  user: CognitoUser | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthServiceContext = createContext<AuthServiceContent>({
  user: null,
  signIn: () => new Promise<void>(() => {}),
  signOut: () => new Promise<void>(() => {}),
});
