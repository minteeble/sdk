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
 * Generation Service
 */
export class GenerationService extends BaseService {
  private static _instance: GenerationService;

  constructor() {
    super("generation");
  }

  public static get instance(): GenerationService {
    if (!this._instance) this._instance = new GenerationService();

    return this._instance;
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

    let res = await this.apiCaller.post(`/renderer`, {
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
