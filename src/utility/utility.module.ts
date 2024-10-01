import { Module } from "@nestjs/common";
import { DatabaseModule } from "@/utility/database";

@Module({
  imports: [DatabaseModule],
})
export class UtilityModule {}
