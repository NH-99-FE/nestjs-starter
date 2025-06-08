import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LogsModule } from './common/logger/logs.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { MailModule } from './common/mail/mail.module';
import { PrismaModule } from './database/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule, LogsModule,
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
      // options: {
      //   password:'example'
      // }
    }),
    MailModule,
    PrismaModule.forRoot({
      url:'mysql://root:example@localhost:3306/testdb',
      name: 'prisma1'
    })
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
