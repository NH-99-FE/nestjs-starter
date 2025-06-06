import { InjectRedis } from '@nestjs-modules/ioredis';
import { Controller, Get, Query } from '@nestjs/common';
import Redis from 'ioredis';


@Controller()
export class AppController {
  constructor(
    @InjectRedis() private readonly redis: Redis
  ) {}

  @Get()
  async getHello(@Query('token') token): Promise<any> {
    await this.redis.set('token', token || 'default token', 'EX', 60 * 10)
    const res = await this.redis.get('token')
    return {
      token: res
    };
  }
}
