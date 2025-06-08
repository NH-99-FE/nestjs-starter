import { InjectRedis } from '@nestjs-modules/ioredis';
import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaClient } from '@prisma/client';


@Controller()
export class AppController {
  constructor(@Inject('PRISMA_DATABASE') private prismaService: PrismaClient){}

  @Get()
  async getHello():Promise<any> {
    const res = await this.prismaService.user.findMany({})
    return res
  }

  // constructor(
  //   @InjectRedis() private readonly redis: Redis
  // ) {}

  // @Get()
  // async getHello(@Query('token') token): Promise<any> {
  //   await this.redis.set('token', token || 'default token', 'EX', 60 * 10)
  //   const res = await this.redis.get('token')
  //   return {
  //     token: res
  //   };
  // }

  // constructor(
  //   private readonly mailerService: MailerService
  // ){}

  // @Get('mail')
  // async sendEmail():Promise<any> {
  //   this.mailerService
  //     .sendMail({
  //       to: '1537390855@qq.com',
  //       from: '1537390855@qq.com',
  //       subject: 'Testing Nest Mailermodule with template ✔',
  //       template: 'welcome', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
  //       context: {
  //         // Data to be sent to template engine.
  //         name: 'God Liang',
  //       },
  //     })
  //     .then(() => {
  //       console.log('sucess');
        
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

}
