import { Inject, Optional } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserPrismaRepository } from './repository/user.prisma.repository';
// import { UserAbstractRepository } from './user-abstract.repository';
import { UserAdapter } from './user.interface';

export class UserRepository implements UserAdapter {
  constructor(
    @Inject(REQUEST) private request: Request,
    @Optional() private userPrismaRepository: UserPrismaRepository,
  ) {}
  find(username:string): Promise<any[]> {
    const client = this.getRepository();
    return client.find(username);
  }
  create(userObj: any): Promise<any> {
    const client = this.getRepository();
    return client.create(userObj);
  }
  update(userObj: any): Promise<any> {
    const client = this.getRepository();
    return client.update(userObj);
  }
  delete(id: number): Promise<any> {
    const client = this.getRepository();
    return client.delete(id);
  }
  getRepository(): UserAdapter {
    // 根据tenant逻辑 或其他逻辑，获取数据库类型 -> 根据不同的类型访问不同的数据库
    const headers = this.request.headers;
    const tenantId = headers['x-tenant-id'] || 'default';
    // console.log('🚀 ~ UserRepository ~ getRepository ~ tenantId:', tenantId);
    // TODO
    if (tenantId === 'prisma1' || tenantId === 'prisma2') {
      return this.userPrismaRepository;
    } else {
      return this.userPrismaRepository;
    }
  }
}
