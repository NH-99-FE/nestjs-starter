import { Module } from '@nestjs/common';
import { PrismaCommonModule } from './prisma/prisma-common.module';

@Module({
  imports:[PrismaCommonModule],
})
export class DatabaseModule {}
