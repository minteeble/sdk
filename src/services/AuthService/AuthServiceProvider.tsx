import React, { useEffect, useState } from "react";
import AuthService from "./AuthService";
import { AuthServiceContext } from "./AuthServiceContext";
import { CognitoUser } from "amazon-cognito-identity-js";
import { useWalletService } from "../WalletService";

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
      if (walletAddress !== "" && authService) {
        console.log("Auth service is ready for signing");
        let signedInUser = await authService.signIn(walletAddress);

        const messageToSign = (signedInUser as any).challengeParam.message;

        const signature = await sign(messageToSign);

        console.log("Signing done.");

        await authService.sendChallengeAnswer!(signedInUser, signature);
      }
    })();
  }, [walletAddress]);

  const signIn = async (): Promise<void> => {
    await connectWallet();
  };

  const signOut = async (): Promise<void> => {};

  return (
    <AuthServiceContext.Provider value={{ user, signIn, signOut }}>
      {props.children}
    </AuthServiceContext.Provider>
  );
};
