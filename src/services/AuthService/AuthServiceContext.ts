import { createContext } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export interface AuthServiceContent {
  user: CognitoUser | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  wsClient: W3CWebSocket | null;
}

export const AuthServiceContext = createContext<AuthServiceContent>({
  user: null,
  signIn: () => new Promise<void>(() => {}),
  signOut: () => new Promise<void>(() => {}),
  wsClient: null,
});
