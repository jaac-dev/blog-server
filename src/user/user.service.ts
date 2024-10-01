import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { PrismaService } from "@/utility";

@Injectable()
export class UserService {
  constructor() {}

  async all(): Promise<User[]> {
    return [];
  }
}
