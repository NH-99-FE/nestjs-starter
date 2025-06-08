import { Module } from '@nestjs/common';
import { UserPrismaRepository } from './repository/user.prisma.repository';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

@Module({
  providers: [UserPrismaRepository, UserRepository],
  controllers: [UserController]
})
export class UserModule {}
