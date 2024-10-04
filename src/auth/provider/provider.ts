import { ProviderKind } from "@prisma/client";
import { Request, Response } from "express";

export function toProviderKind(value: string): ProviderKind | null {
  switch (value) {
    case "github":
      return ProviderKind.GITHUB;
    case "google":
      return ProviderKind.GOOGLE;
    default:
      return null;
  }
}

export type ProviderOptions = {
  kind: ProviderKind;
};

export interface Provider {
  getKind(): ProviderKind;

  handleUri(request: Request, response: Response): Promise<void> | void;
}
