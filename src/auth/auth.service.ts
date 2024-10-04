import { Inject, Injectable } from "@nestjs/common";
import { Request, Response } from "express";

import { AuthError, AuthErrorKind } from "./auth.error";
import { AUTH_CONFIG, AuthConfig } from "./auth-config.interface";
import { Provider, toProviderKind } from "./provider";

@Injectable()
export class AuthService {
  private readonly providers: Array<Provider>;

  constructor(@Inject(AUTH_CONFIG) config: AuthConfig) {
    this.providers = config.providers;
  }

  async oauthUri(providerName: string, request: Request, response: Response) {
    const providerKind = toProviderKind(providerName);
    if (!providerKind) throw new AuthError(AuthErrorKind.INVALID_PROVIDER);

    const provider = this.providers.find((p) => p.getKind() == providerKind);
    if (!provider) throw new AuthError(AuthErrorKind.INVALID_PROVIDER);

    await provider.handleUri(request, response);
  }
}
