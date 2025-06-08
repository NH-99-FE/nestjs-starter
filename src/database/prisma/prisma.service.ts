import { Inject, Injectable } from '@nestjs/common';
import { PrismaModuleOptions, PrismaOptionsFactory } from './prisma-options.interface';
import {REQUEST} from '@nestjs/core'
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService implements PrismaOptionsFactory {
  constructor(
    @Inject(REQUEST) private request: Request,
    private configService: ConfigService
  ){
  }
  createPrismaModuleOptions(): PrismaModuleOptions | Promise<PrismaModuleOptions> {
    const headers = this.request.headers
    const tenantId = headers['x-tenant-id'] || 'default'
    console.log(tenantId);
    
    if (tenantId === 'default1') {
      return {url:'mysql://root:example@localhost:3306/testdb'}
    } 
    // else if (tenantId === 'default2'){
    //   return {url:'mysql://root:example@localhost:3307/testdb'}
    // }
    else {
      return { url: this.configService.get('DATABASE_URL') };
    }

  }
  async onModuleInit() { }
}
