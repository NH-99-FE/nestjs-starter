import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signin-user.dto';
import { CreateUserPipe } from './pipes/create-user.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  @Post('/signin')
  signin(@Body() dto: SigninUserDto){
    const { username, password } = dto
    return this.authService.signin(username, password)
  }
  @Post('/signup') 
  signup(@Body(CreateUserPipe) dto: SigninUserDto){
    const { username, password } = dto
    // return this.authService.signup(username, password)
    return dto
  }
}
