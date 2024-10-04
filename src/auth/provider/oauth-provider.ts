import { Identity, PrismaClient, ProviderKind } from "@prisma/client";
import { Issuer } from "openid-client";
import { Request, Response } from "express";

import { Provider, ProviderOptions } from "./provider";

export type OAuthProviderOptions = {
  issuer: string;
  checks?: Array<"pkce" | "state" | "none">;
  clientId: string;
  clientSecret: string;
} & ProviderOptions;

export class OAuthProvider implements Provider {
  private readonly options: OAuthProviderOptions;

  constructor(options: OAuthProviderOptions) {
    this.options = options;
  }

  getKind(): ProviderKind {
    return this.options.kind;
  }

  async handleUri(request: Request, response: Response): Promise<void> {
    const issuer = await Issuer.discover(this.options.issuer);

    const client = new issuer.Client({
      client_id: this.options.clientId,
      client_secret: this.options.clientSecret,
      response_types: ["id_token"],
      redirect_uris: [
        `http://localhost:5000/auth/${this.options.kind.toString().toLowerCase()}/callback`,
      ],
    });

    const uri = client.authorizationUrl({});

    response.status(200).send({
      ok: true,
      data: {
        uri,
      },
    });
  }
}
