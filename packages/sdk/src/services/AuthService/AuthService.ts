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
import { EnvironmentType, EnvManager } from "../../models/EnvManager";

/**
 * Service for Authentication and Authorization on Minteeble platform
 */
class AuthService {
  constructor(customConfig: any | null = null) {
    console.log("Loading Auth configs. Env: ", EnvManager.environment);

    let awsmobile =
      EnvManager.environment === EnvironmentType.Dev
        ? awsmobileDev
        : awsmobileProd;

    console.log("Cosnifguring with:", customConfig || awsmobile);

    // If customConfig is provided then use them as AWS config
    Amplify.configure(customConfig || awsmobile);
  }

  public signIn = async (walletAddress: string): Promise<CognitoUser> => {
    try {
      // console.log("Request sign in", {
      //   param1: "AAAAA",
      // });
      const cognitoUser: CognitoUser = await Auth.signIn(walletAddress, "", {
        param1: "AAAAA",
      });

      // setUser(cognitoUser);
      return cognitoUser;
    } catch (err) {
      //@ts-ignore
      if (err && err.message && err.message.includes("[404]")) {
        // console.log("Request sign up");
        const params = {
          username: walletAddress,
          password: this.getRandomString(30),
          // validationData: {
          //   param2: "BBBB",
          // },
          // clientMetadata: {
          //   param3: "CCCC",
          // },
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

  public static get apiBaseUrl(): string {
    let url = "";

    if (EnvManager.environment === EnvironmentType.Dev) {
      url = awsmobileDev.aws_cloud_logic_custom[0].endpoint;
    } else if (EnvManager.environment === EnvironmentType.Prod) {
      url = awsmobileProd.aws_cloud_logic_custom[0].endpoint;
    }

    return url;
  }
}

export default AuthService;
