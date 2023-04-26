import { createContext } from "react";

export interface RendererServiceContent {}

export const RendererServiceContext = createContext<RendererServiceContent>({});
