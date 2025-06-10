import { Inject } from '@nestjs/common';
import { PRISMA_DATABASE } from '@/database/databse.constants';
import { PrismaClient } from '@prisma/client';
import { UserAdapter } from '../user.interface';

export class UserPrismaRepository implements UserAdapter {
  constructor(@Inject(PRISMA_DATABASE) private prismaClient: PrismaClient) {}
  find(username: string): Promise<any[]> {
    return this.prismaClient.user.findMany({where: {username}});
  }
  create(userObj: any): Promise<any> {
    return this.prismaClient.user.create({ data: userObj });
  }
  update(userObj: any): Promise<any> {
    return this.prismaClient.user.update({
      where: { id: userObj.id },
      data: userObj,
    });
  }
  delete(id: number): Promise<any> {
    return this.prismaClient.user.delete({ where: { id } });
  }
}
