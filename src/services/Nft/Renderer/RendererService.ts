export class RendererService {
  private static _instance: RendererService;

  constructor() {}

  public static get instance(): RendererService {
    if (!this._instance) this._instance = new RendererService();

    return this._instance;
  }
}
