import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(48)
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class SignInPasswordDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}
