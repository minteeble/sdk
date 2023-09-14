import {
  GenerationDataClientModel,
  ICreateGenerationRequestDto,
  ICreateRendererRequestDto,
  NftGenerationType,
  NftRendererType,
  RendererDataClientModel,
  NftGenerationItemInfoClientModel,
  ITriggerCustomActionRequestDto,
  TriggerCustomActionResponseDto,
  ConfirmPremintItemsUploadedActionRequestDto,
  ConfirmPremintItemsUploadedActionResponseDto,
  CustomActionRequestDTO,
  CustomActionResponseDTO,
  RegisterPremintUploadRequestDto,
  RegisterPremintUploadResponseDto,
  ConfirmNftMintedActionRequestDto,
  ConfirmPostmintItemsUploadedRequestDto,
  RegisterPostmintUploadRequestDto,
  ConfirmNftMintedActionResponseDto,
  RegisterPostmintUploadRepsonseDto,
  ConfirmPostmintItemsUploadedRepsonseDto,
  UploadRendererCustomActionNames,
  TriggerCustomActionRequestDto,
  CustomActionResourceType,
  IRendererDataClientModel,
  UploadRendererDataClientModel,
  IConfirmNftMintedActionResponseDto,
  IConfirmPostmintItemsUploadedRepsonseDto,
  IConfirmPremintItemsUploadedActionResponseDto,
  IRegisterPremintUploadResponseDto,
  IRegisterPostmintUploadRepsonseDto,
} from "@minteeble/utils";
import { JsonSerializer } from "typescript-json-serializer";
import { BaseService } from "../../models";

export type RendererActionRequest<
  RT extends NftRendererType,
  AT extends UploadRendererCustomActionNames | never
> = RT extends NftRendererType.UPLOAD
  ? AT extends UploadRendererCustomActionNames.RegisterPremintUpload
    ? RegisterPremintUploadRequestDto
    : AT extends UploadRendererCustomActionNames.ConfirmPremintItemsUploaded
    ? ConfirmPremintItemsUploadedActionRequestDto
    : AT extends UploadRendererCustomActionNames.ConfirmItemsMinted
    ? ConfirmNftMintedActionRequestDto
    : AT extends UploadRendererCustomActionNames.RegisterPostmintUpload
    ? RegisterPostmintUploadRequestDto
    : AT extends UploadRendererCustomActionNames.ConfirmPostmintItemsUploaded
    ? ConfirmPostmintItemsUploadedRequestDto
    : CustomActionRequestDTO
  : any;

export type RendererActionResponse<
  RT extends NftRendererType,
  AT extends UploadRendererCustomActionNames | never
> = RT extends NftRendererType.UPLOAD
  ? AT extends UploadRendererCustomActionNames.RegisterPremintUpload
    ? IRegisterPremintUploadResponseDto
    : AT extends UploadRendererCustomActionNames.ConfirmPremintItemsUploaded
    ? IConfirmPremintItemsUploadedActionResponseDto
    : AT extends UploadRendererCustomActionNames.ConfirmItemsMinted
    ? IConfirmNftMintedActionResponseDto
    : AT extends UploadRendererCustomActionNames.RegisterPostmintUpload
    ? IRegisterPostmintUploadRepsonseDto
    : AT extends UploadRendererCustomActionNames.ConfirmPostmintItemsUploaded
    ? IConfirmPostmintItemsUploadedRepsonseDto
    : CustomActionResponseDTO
  : any;

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
   * Deserializes and instantiates a RendererClientModel based on its type
   *
   * @param rawRenderer Raw renderer client object to be deserialized. It can be either json-string or object
   * @returns Specific RendererClientModel instance based on its type
   */
  public static rendererClientModelFactory(
    rawRenderer: object | string
  ): RendererDataClientModel | null {
    let rawObj: object | null = null;
    let deserializedObject: RendererDataClientModel | null = null;

    try {
      if (typeof rawRenderer === "string") rawObj = JSON.parse(rawRenderer);
      if (typeof rawRenderer === "object") rawObj = rawRenderer;
    } catch {}

    switch ((rawObj as IRendererDataClientModel).type) {
      case NftRendererType.UPLOAD:
        deserializedObject =
          serializer.deserializeObject<UploadRendererDataClientModel>(
            rawObj as any,
            UploadRendererDataClientModel
          ) || null;
        break;
    }

    return deserializedObject;
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
    let customAttributes = {};

    Object.keys(renderer.attributes).forEach((key) => {
      customAttributes[key] = renderer.attributes[key];
    });

    let body = {
      attributes: {
        ...customAttributes,
        baseUri: renderer.baseUri,
        variables: renderer.variables,
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
      [key: string]: any;
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

  /**
   * Gets information about specific generation items
   *
   * @param generationId generation's id
   * @param nftGenerationItems a string with integers separated by commas, (eg: 1,2,3,5)
   * @returns an array containing information about all the items
   */
  public async getNftGenerationItemsInfo(
    generationId: string,
    nftGenerationItems: string
  ): Promise<Array<NftGenerationItemInfoClientModel>> {
    let res = await this.apiCaller.get(
      `/generation/${generationId}/items?nftGenerationItems=${nftGenerationItems}`,
      {
        responseType: "text",
      },
      true
    );

    let itemsInfo: NftGenerationItemInfoClientModel[] =
      (serializer.deserializeObjectArray<NftGenerationItemInfoClientModel>(
        res.itemsInfo,
        NftGenerationItemInfoClientModel
      ) || []) as NftGenerationItemInfoClientModel[];

    return itemsInfo;
  }

  public async updateGeneration(
    generationId: string,
    attributes: {
      [key: string]: any;
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

  /**
   * Mutates as NFT item
   *
   * @param chainName Network chain name
   * @param collectionId Collection ID
   * @param nftId NFT number ID
   */
  public async mutateItem(
    chainName: string,
    collectionId: string,
    nftId: number,
    mutationVariantName: string
  ): Promise<void> {
    let body = {
      mutationVariantName,
    };

    await this.apiCaller.post(
      `/chain/${chainName}/collection/${collectionId}/id/${nftId}/mutate`,
      {
        responseType: "text",
        body,
      }
    );
  }

  /**
   * Sets mutation status for an item
   *
   * @param nftGenerationId ID of the Generation containing the item to mutate
   * @param nftNumberId: number ID of the NFT to mutate
   * @param mutationStatus status of the mutation
   */
  public async setMutationStatus(
    collectionId: string,
    chainName: string,
    nftId: number,
    mutationStatus: boolean
  ): Promise<void> {
    let body = {
      mutationStatus,
    };

    await this.apiCaller.post(
      `/chain/${chainName}/collection/${collectionId}/id/${nftId}/mutation-status`,
      {
        responseType: "text",
        body,
      }
    );
  }

  /**
   * Triggers the execution of a `CustomAction`
   *
   * @param params CustomAction parameters
   * @param authenticated Specififes if request has to be authenticated or not
   */
  public async triggerCustomAction(
    params: ITriggerCustomActionRequestDto,
    authenticated: boolean = false
  ): Promise<TriggerCustomActionResponseDto | null> {
    const body = {
      requestBody: params.requestBody,
    };

    let endpointUrl = `/custom-action/${params.actionName}/chain/${params.chainName}/collection/${params.collectionId}/type/${params.resourceType}/resource/${params.resourceId}/`;

    if (authenticated) endpointUrl += "auth";
    else endpointUrl += "no-auth";

    const res = await this.apiCaller.post(endpointUrl, {
      responseType: "text",
      body,
      authenticated,
    });

    const decodedRes =
      serializer.deserializeObject<TriggerCustomActionResponseDto>(
        res,
        TriggerCustomActionResponseDto
      ) || null;

    return decodedRes;
  }

  public async triggerRendererAction<
    RT extends NftRendererType,
    AT extends UploadRendererCustomActionNames | never
  >(params: {
    rendererType: RT;
    chainName: string;
    collectionId: string;
    rendererId: string;
    actionName: AT;
    requestBody: RendererActionRequest<RT, AT>;
    authenticated?: boolean;
  }): Promise<{
    responseBody: RendererActionResponse<RT, AT> | null;

    success: boolean;

    errorMessage?: string;
  }> {
    let requestDto: ITriggerCustomActionRequestDto = {
      requestBody: JSON.stringify(serializer.serialize(params.requestBody)),
      chainName: params.chainName,
      collectionId: params.collectionId,
      resourceType: CustomActionResourceType.RENDERER,
      resourceId: params.rendererId,
      actionName: params.actionName,
    };

    let res = await this.triggerCustomAction(
      requestDto,
      !!params.authenticated
    );

    let decodedBody = null;

    try {
      decodedBody = JSON.parse(res?.responseBody) || null;
    } catch {}

    return {
      success: res?.success || false,
      errorMessage: res?.errorMessage,
      responseBody: decodedBody,
    };
  }
}

// triggerRendererAction(NftRendererType.UPLOAD, UploadRendererCustomActionNames.ConfirmPremintItemsUploaded,)
