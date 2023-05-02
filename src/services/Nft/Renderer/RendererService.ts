import {
  CreateRendererRequestDto,
  GenerationDataClientModel,
  ICreateGenerationRequestDto,
  ICreateRendererRequestDto,
  NftGenerationType,
  NftRendererType,
  RendererDataClientModel,
  UpdateRendererRequestDto,
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

    let res = await this.apiCaller.post(`/renderer`, {
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

  /**
   * Updates a renderer
   *
   * @param renderer Renderer client model object to be updated
   */
  public async updateRenderer(
    renderer: RendererDataClientModel
  ): Promise<void> {
    let body = {
      attributes: renderer.attributes,
    };

    await this.apiCaller.put(`/renderer/${renderer.id}`, {
      responseType: "text",
      body,
    });
  }

  /**
   * Creates a Generation
   *
   * @param type Generation type
   * @param attributes Generation attributes
   * @returns Created Generation object
   */
  public async createGeneration(
    type: NftGenerationType,
    maxSupply: number
  ): Promise<GenerationDataClientModel | null> {
    let body: ICreateGenerationRequestDto = {
      type: type,
      maxSupply: maxSupply,
    };

    let res = await this.apiCaller.post(`/generation`, {
      responseType: "text",
      body: body,
    });

    let id = res.id;

    if (!id) return null;

    let generation = new GenerationDataClientModel();
    // generation.id = id;
    // generation.ma = attributes;
    // generation.type = type;

    return generation;
  }

  /**
   * Gets a Generation by specifying its id
   *
   * @param generationId Generation ID
   * @returns Generation object if found, null otherwise
   */
  public async getGeneration(
    generationId: string
  ): Promise<GenerationDataClientModel | null> {
    let res = await this.apiCaller.get(`/renderer/${generationId}`, {
      responseType: "text",
    });

    let generation: GenerationDataClientModel | null =
      serializer.deserializeObject<GenerationDataClientModel>(
        res,
        GenerationDataClientModel
      ) || null;

    return generation;
  }

  /**
   * Get user renderers
   *
   * @returns User renderers
   */
  // public async getRenderers(): Promise<Array<RendererDataClientModel>> {
  //   let res = await this.apiCaller.get(`/renderers`, {
  //     responseType: "text",
  //   });

  //   let renderers: RendererDataClientModel[] =
  //     (serializer.deserializeObjectArray<RendererDataClientModel>(
  //       res,
  //       RendererDataClientModel
  //     ) || []) as RendererDataClientModel[];

  //   return renderers;
  // }

  /**
   * Updates a renderer
   *
   * @param renderer Renderer client model object to be updated
   */
  // public async updateRenderer(
  //   renderer: RendererDataClientModel
  // ): Promise<void> {
  //   let body = {
  //     attributes: renderer.attributes,
  //   };

  //   await this.apiCaller.put(`/renderer/${renderer.id}`, {
  //     responseType: "text",
  //     body,
  //   });
  // }
}
