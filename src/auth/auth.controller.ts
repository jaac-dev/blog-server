import { Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

import { AuthService } from "./auth.service";
import { AuthError } from "@/auth/auth.error";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("oauth/:provider/callback")
  async oauthCallback(
    @Param("provider") provider: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {}

  @Get("oauth/:provider/uri")
  async oauthUri(
    @Param("provider") providerName: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.authService.oauthUri(providerName, req, res);
    } catch (err) {
      let data;
      if (err instanceof AuthError)
        data = {
          ok: false,
          statusCode: err.statusCode,
          message: err.message,
        };
      else
        data = {
          ok: false,
          statusCode: 500,
          message: "An internal server error has occurred.",
        };

      console.error(err);
      res.status(500).send(data);
    }
  }
}
