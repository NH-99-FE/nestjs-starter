import { Module } from '@nestjs/common';
import { PrismaCommonModule } from './prisma/prisma-common.module';

@Module({
  imports:[PrismaCommonModule],
  providers: [],
  exports: []
})
export class DatabaseModule {}
