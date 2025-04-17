import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { EmailDto } from './email.dto';
import { PasswordDto } from './password.dto';
import e from 'express';

export class SignUpUserDto extends EmailDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(48)
  nickname: string;

  @IsString()
  password: string;
}
