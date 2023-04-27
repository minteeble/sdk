import { NftRendererType, RendererDataClientModel } from "@minteeble/utils";
import { createContext } from "react";

export interface RendererServiceContent {
  createRenderer(
    type: NftRendererType,
    attributes: { [key: string]: string }
  ): Promise<RendererDataClientModel | null>;

  getRenderer(rendererId: string): Promise<RendererDataClientModel | null>;

  getRenderers(): Promise<Array<RendererDataClientModel>>;
}

export const RendererServiceContext = createContext<RendererServiceContent>({
  createRenderer: () => new Promise(() => {}),

  getRenderer: () => new Promise(() => {}),

  getRenderers: () => new Promise(() => {}),
});
