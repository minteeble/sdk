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
  public static readonly environment: EnvironmentType =
    process.env.ENVIRONMENT === "production"
      ? EnvironmentType.Prod
      : EnvironmentType.Dev;
}
