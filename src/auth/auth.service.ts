import { UserRepository } from '@/user/user.repository';
import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userResportory:UserRepository, private jwt: JwtService){}
  async signin(username: string, password: string) {
    const user = await this.userResportory.find(username)
    if (!user) {
      throw new ForbiddenException('用户不存在')
    }

    const isPasswordValid = user.length && user[0].password === password
    if (!isPasswordValid) {
      throw new ForbiddenException('用户名或密码错误')
    }

    return this.jwt.signAsync({
      username: user[0].username
    })
  }

  signup(username: string, password: string) {
    if(!username || !password){
      throw new HttpException('Username and password are required',400)
    }
    return this.userResportory.create({username,password})
  }
}
