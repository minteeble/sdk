import React, { useEffect, useState } from "react";
import AuthService from "./AuthService";
import { AuthServiceContext } from "./AuthServiceContext";
import { CognitoUser } from "amazon-cognito-identity-js";
import { useWalletService } from "../WalletService";
import { API, Auth, Signer } from "aws-amplify";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export interface AuthServiceProviderProps {
  /**
   * Custom AWS config object
   */
  customConfig?: any;

  /**
   * Provider children
   */
  children: any;
}

export const AuthServiceProvider = (props: AuthServiceProviderProps) => {
  const [authService, setAuthService] = useState<AuthService | null>(null);
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [wsClient, setWsClient] = useState<W3CWebSocket | null>(null);

  const {
    walletAddress,
    walletService,
    connectWallet,
    disconnectWallet,
    sign,
  } = useWalletService();

  useEffect(() => {
    let service = new AuthService(props.customConfig || null);

    setAuthService(service);

    (async () => {
      let user = await service.checkUser();
      setUser(user);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (walletAddress !== "" && !user && authService) {
        let signedInUser = await authService.signIn(walletAddress);

        const messageToSign = (signedInUser as any).challengeParam.message;

        const signature = await sign(messageToSign);

        setUser(
          await authService.sendChallengeAnswer!(signedInUser, signature)
        );
      }
    })();
  }, [walletAddress]);

  useEffect(() => {
    (async () => {
      let jwtToken = "NOAUTH";

      if (user) {
        const credentials = await Auth.currentCredentials();

        const currentSession = await Auth.currentSession();
        const idToken = currentSession.getIdToken();
        jwtToken = idToken.getJwtToken();
        // const accessInfo = {
        //   access_key: credentials.accessKeyId,
        //   secret_key: credentials.secretAccessKey,
        //   session_token: credentials.sessionToken,
        // };

        console.log("JwtToken:", jwtToken);
      }

      const wssUrl = `wss://websocket.minteeble.com/d1?idToken=${jwtToken}`;
      // const signedUrl = Signer.signUrl(wssUrl, accessInfo, {
      //   service: "execute-api",
      //   region: "eu-central-1",
      // });
      // console.log("Signed url:", signedUrl);

      if (wsClient) {
        wsClient.close();
      }

      let ws = new W3CWebSocket(wssUrl);
      setWsClient(ws);
    })();
  }, [user]);

  const signIn = async (): Promise<void> => {
    await connectWallet();
  };

  const signOut = async (): Promise<void> => {
    // console.log("Signing out");
    // const credentials = await Auth.currentCredentials();
    // const accessInfo = {
    //   access_key: credentials.accessKeyId,
    //   secret_key: credentials.secretAccessKey,
    //   session_token: credentials.sessionToken,
    // };
    // console.log("Acess info:", accessInfo);
    // console.log("Signing standard request");
    // const wssUrl = "wss://websocket.minteeble.com/d1";
    // const signedUrl = Signer.signUrl(wssUrl, accessInfo, {
    //   service: "execute-api",
    //   region: "eu-central-1",
    // });
    // console.log("Signer url", signedUrl);
  };

  return (
    <AuthServiceContext.Provider value={{ user, signIn, signOut, wsClient }}>
      {props.children}
    </AuthServiceContext.Provider>
  );
};
