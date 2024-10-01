import { Controller, Get } from "@nestjs/common";

import { UserService } from "./user.service";

/**
 * GET /user (user.all)
 *   - Returns all registered users.
 */
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/")
  async all() {
    return {
      data: this.userService.all(),
    };
  }
}
