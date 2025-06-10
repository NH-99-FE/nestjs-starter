import { Controller, Get, Optional, ParseIntPipe, Query, UseGuards} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    @Optional() private readonly mailerService: MailerService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findUser(@Query('id', ParseIntPipe) id: number): Promise<any> {
    return {
      id
    };
  }
}
