import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtps://1537390855@qq.com:cetkvzdumywfgaab@smtp.qq.com',
      defaults: {
        from: '"梁先生" <1537390855@qq.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class MailModule {}
