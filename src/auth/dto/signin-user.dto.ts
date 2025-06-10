import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator'
import { Transform } from 'class-transformer'

export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20, {message: '用户名长度必须是5-20个字符'})
  username: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: ({constraints}) => {
      return `密码长度必须是${constraints[0]}-${constraints[1]}个字符，不能是特殊字符起始`
    }
  })
  password: string

  @IsArray()
  @IsOptional()
  // @IsNumber({}, {each: true})
  // @Transform(({value}) => value.map(o => parseInt(o)))
  roles: number[]
}