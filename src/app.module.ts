import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './common/config/config.module';
import { LogsModule } from './common/logger/logs.module';
import { CacheCommonModule } from './common/cache/cache-common.module';
import { MailModule } from './common/mail/mail.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule, 
    LogsModule,
    CacheCommonModule,
    MailModule,
    DatabaseModule,
    UserModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
