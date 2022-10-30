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
  public static environment: EnvironmentType = EnvironmentType.Dev;
}
