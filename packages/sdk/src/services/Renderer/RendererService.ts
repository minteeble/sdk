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
import { BaseService } from "../../models";

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
    name: string,
    attributes: { [key: string]: string }
  ): Promise<RendererDataClientModel | null> {
    let body: ICreateRendererRequestDto = {
      type: type,
      name: name,
      attributes: attributes,
    };

    let res = await this.apiCaller.post(
      `/renderer`,
      {
        responseType: "text",
        body: body,
      },
      true
    );

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
      attributes: {
        attributes: renderer.attributes,
        cacheable: renderer.cacheable,
        renderingCondition: renderer.renderingCondition,
      },
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
    name: string,
    attributes: {
      [key: string]: string;
    }
  ): Promise<GenerationDataClientModel | null> {
    let body: ICreateGenerationRequestDto = {
      type: type,
      name: name,
      attributes: attributes,
    };

    let res = await this.apiCaller.post(
      `/generation`,
      {
        responseType: "text",
        body: body,
      },
      true
    );

    let id = res.id;

    if (!id) return null;

    let generation = new GenerationDataClientModel();
    generation.id = id;
    generation.attributes = attributes;
    generation.type = type;
    generation.resourceOwner = res.resourceOwner;

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
    let res = await this.apiCaller.get(`/generation/${generationId}`, {
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
   * Get user generations
   *
   * @returns User generations
   */
  public async getGenerations(): Promise<Array<GenerationDataClientModel>> {
    let res = await this.apiCaller.get(`/generations`, {
      responseType: "text",
    });

    let generations: GenerationDataClientModel[] =
      (serializer.deserializeObjectArray<GenerationDataClientModel>(
        res,
        GenerationDataClientModel
      ) || []) as GenerationDataClientModel[];

    return generations;
  }

  public async updateGeneration(
    generationId: string,
    attributes: {
      [key: string]: string;
    }
  ): Promise<void> {
    let body = {
      attributes: attributes,
    };

    await this.apiCaller.put(`/generation/${generationId}`, {
      responseType: "text",
      body,
    });
  }

  public async deleteGeneration(generationId: string): Promise<void> {
    await this.apiCaller.delete(`/generation/${generationId}`, {});
  }

  public async deleteRenderer(rendererId: string): Promise<void> {
    await this.apiCaller.delete(`/renderer/${rendererId}`, {});
  }

  /**
   * Reveals as NFT item
   *
   * @param chainName Network chain name
   * @param collectionId Collection ID
   * @param nftId NFT number ID
   */
  public async revealItem(
    chainName: string,
    collectionId: string,
    nftId: number
  ): Promise<void> {
    await this.apiCaller.post(
      `/chain/${chainName}/collection/${collectionId}/id/${nftId}/reveal`,
      {
        responseType: "text",
      }
    );
  }
}
