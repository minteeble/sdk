import {
  CreateRendererRequestDto,
  ICreateRendererRequestDto,
  NftRendererType,
  RendererDataClientModel,
} from "@minteeble/utils";
import { JsonSerializer } from "typescript-json-serializer";
import { BaseService } from "../../../shared/BaseService";

const serializer = new JsonSerializer();

/**
 * Renderer Service
 */
export class RendererService extends BaseService {
  private static _instance: RendererService;

  constructor() {
    super("renderer");
  }

  public static get instance(): RendererService {
    if (!this._instance) this._instance = new RendererService();

    return this._instance;
  }

  /**
   * Creates a renderer
   *
   * @param type Renderer type
   * @param attributes Renderer attributes
   * @returns Created renderer object
   */
  public async createRenderer(
    type: NftRendererType,
    attributes: { [key: string]: string }
  ): Promise<RendererDataClientModel | null> {
    let body: ICreateRendererRequestDto = {
      type: type,
      attributes: attributes,
    };

    let res = await this.apiCaller.post(`/renderers`, {
      responseType: "text",
      body: body,
    });

    let id = res.id;

    if (!id) return null;

    let renderer = new RendererDataClientModel();
    renderer.id = id;
    renderer.attributes = attributes;
    renderer.type = type;

    return renderer;
  }

  /**
   * Gets a renderer by specifying its id
   *
   * @param rendererId Renderer ID
   * @returns Renderer object if found, null otherwise
   */
  public async getRenderer(
    rendererId: string
  ): Promise<RendererDataClientModel | null> {
    let res = await this.apiCaller.get(`/renderer/${rendererId}`, {
      responseType: "text",
    });

    let renderer: RendererDataClientModel | null =
      serializer.deserializeObject<RendererDataClientModel>(
        res,
        RendererDataClientModel
      ) || null;

    return renderer;
  }

  /**
   * Get user renderers
   *
   * @returns User renderers
   */
  public async getRenderers(): Promise<Array<RendererDataClientModel>> {
    let res = await this.apiCaller.get(`/renderers`, {
      responseType: "text",
    });

    let renderers: RendererDataClientModel[] =
      (serializer.deserializeObjectArray<RendererDataClientModel>(
        res,
        RendererDataClientModel
      ) || []) as RendererDataClientModel[];

    return renderers;
  }
}
