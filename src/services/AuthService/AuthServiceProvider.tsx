import React, { useEffect, useState } from "react";
import AuthService from "./AuthService";
import { AuthServiceContext } from "./AuthServiceContext";
import { CognitoUser } from "amazon-cognito-identity-js";
import { useWalletService } from "../WalletService";
import { API, Auth, Signer } from "aws-amplify";

export interface AuthServiceProviderProps {
  children: any;
}

export const AuthServiceProvider = (props: AuthServiceProviderProps) => {
  const [authService, setAuthService] = useState<AuthService | null>(null);
  const [user, setUser] = useState<CognitoUser | null>(null);
  const {
    walletAddress,
    walletService,
    connectWallet,
    disconnectWallet,
    sign,
  } = useWalletService();

  useEffect(() => {
    let service = new AuthService();

    setAuthService(service);

    (async () => {
      let user = await service.checkUser();
      setUser(user);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (walletAddress !== "" && !user && authService) {
        console.log("Auth service is ready for signing");
        let signedInUser = await authService.signIn(walletAddress);

        const messageToSign = (signedInUser as any).challengeParam.message;

        const signature = await sign(messageToSign);

        console.log("Signing done.");

        setUser(
          await authService.sendChallengeAnswer!(signedInUser, signature)
        );
      }
    })();
  }, [walletAddress]);

  const signIn = async (): Promise<void> => {
    await connectWallet();
  };

  const signOut = async (): Promise<void> => {
    console.log("Signing out");
    const credentials = await Auth.currentCredentials();

    const accessInfo = {
      access_key: credentials.accessKeyId,
      secret_key: credentials.secretAccessKey,
      session_token: credentials.sessionToken,
    };

    console.log("Acess info:", accessInfo);

    console.log("Signing standard request");

    const wssUrl = "wss://websocket.minteeble.com/d1";

    const signedUrl = Signer.signUrl(wssUrl, accessInfo, {
      service: "execute-api",
      region: "eu-central-1",
    });

    console.log("Signer url", signedUrl);
  };

  return (
    <AuthServiceContext.Provider value={{ user, signIn, signOut }}>
      {props.children}
    </AuthServiceContext.Provider>
  );
};
