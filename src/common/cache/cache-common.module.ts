import { CacheModule } from '@nestjs/cache-manager';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const cacheType = configService.get<string>('CACHE_TYPE', 'redis');
        console.log('🚀 ~ useFactory: ~ cacheType:', cacheType);

        if (cacheType === 'redis') {
          return {
            store: await redisStore({
              host: configService.get<string>('REDIS_HOST', 'localhost'),
              port: configService.get<number>('REDIS_PORT', 6379),
              // password: configService.get<string>('REDIS_PASSWORD', 'example'),
              db: configService.get<number>('REDIS_DB', 0),
              // 这里 ttl 单位是秒
              ttl: configService.get<number>('CACHE_TTL', 30),
            }),
          };
        } else {
          return {
            store: 'memory',
            ttl: configService.get<number>('CACHE_TTL', 30 * 1000), // milliseconds
            max: configService.get<number>('CACHE_MAX_ITEMS', 100), // maximum number of items in cache
          };
        }
      },
    }),
  ],
  exports: [CacheModule],
})
export class CacheCommonModule {}
