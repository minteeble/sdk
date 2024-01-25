/**
 * Types of environment
 */
export enum EnvironmentType {
  /**
   * Development
   */
  Dev,

  /**
   * Production
   */
  Prod,
}

/**
 * Manager class for handling envirnoment settings
 */
export class EnvManager {
  /**
   * Specifies the current env
   */
  private _environment: EnvironmentType;

  private static _instance: EnvManager;

  constructor() {
    this._environment = EnvironmentType.Dev;
  }

  public static get instance(): EnvManager {
    if (!this._instance) {
      this._instance = new EnvManager();
    }

    return this._instance;
  }

  public get environment(): EnvironmentType {
    return this._environment;
  }

  public set environment(value: EnvironmentType) {
    this._environment = value;
  }
}
