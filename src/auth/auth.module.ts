import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AUTH_CONFIG, AuthConfig } from "./auth-config.interface";
import { OAuthProvider } from "./provider";
import { ProviderKind } from "@prisma/client";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AUTH_CONFIG,
      useFactory: (configService: ConfigService) => {
        return {
          providers: [
            new OAuthProvider({
              kind: ProviderKind.GOOGLE,
              issuer: "https://accounts.google.com",
              clientId: "",
              clientSecret: "",
              checks: ["pkce"],
            }),
          ],
        } satisfies AuthConfig;
      },
      inject: [ConfigService],
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
