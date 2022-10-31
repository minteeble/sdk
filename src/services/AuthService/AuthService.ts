/**
 * Copyright (c) Minteeble 2022. All Rights Reserved.
 * Node module: @minteeble/sdk
 * This file is licensed under the MIT License.
 * License text available at https://opensource.org/licenses/MIT
 *
 * Email:     minteeble@gmail.com
 * Website:   https://minteeble.com
 */

import { CognitoUser } from "amazon-cognito-identity-js";
import Amplify, { Auth } from "aws-amplify";

// @ts-ignore
import awsmobileDev from "./aws-exports-d1";

// @ts-ignore
import awsmobileProd from "./aws-exports-p1";
import { EnvironmentType, EnvManager } from "../../EnvManager";

/**
 * Service for Authentication and Authorization on Minteeble platform
 */
class AuthService {
  constructor() {
    console.log("Loading Auth configs. Env: ", EnvManager.environment);

    let awsmobile =
      EnvManager.environment === EnvironmentType.Dev
        ? awsmobileDev
        : awsmobileProd;
    Amplify.configure(awsmobile);
  }

  public signIn = async (walletAddress: string): Promise<CognitoUser> => {
    try {
      const cognitoUser: CognitoUser = await Auth.signIn(walletAddress);
      // setUser(cognitoUser);
      return cognitoUser;
    } catch (err) {
      //@ts-ignore
      if (err && err.message && err.message.includes("[404]")) {
        const params = {
          username: walletAddress,
          password: this.getRandomString(30),
        };
        await Auth.signUp(params);
        return this.signIn(walletAddress);
      } else {
        throw err;
      }
    }
  };

  public signOut = async (): Promise<void> => {
    await Auth.signOut();
  };

  public checkUser = async (): Promise<CognitoUser> => {
    return new Promise<CognitoUser>(async (resolve, reject) => {
      try {
        const user: CognitoUser = await Auth.currentAuthenticatedUser();
        resolve(user);
      } catch (err) {
        reject();
        console.error("checkUser error", err);
      }
    });
  };

  public sendChallengeAnswer = async (
    cognitoUser: CognitoUser,
    signature: any
  ): Promise<CognitoUser> => {
    return new Promise<CognitoUser>(async (resolve, reject) => {
      try {
        await Auth.sendCustomChallengeAnswer(cognitoUser, signature);
        let user = await this.checkUser();
        resolve(user);
      } catch (err) {
        reject();
        console.error("User challenge error", err);
      }
    });
  };

  private intToHex(nr: any) {
    return nr.toString(16).padStart(2, "0");
  }

  private getRandomString(bytes: any) {
    const randomValues = new Uint8Array(bytes);
    window.crypto.getRandomValues(randomValues);
    return Array.from(randomValues).map(this.intToHex).join("");
  }
}

export default AuthService;
