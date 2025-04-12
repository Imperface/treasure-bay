import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(48)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(48)
  nickname: string;

  @IsString()
  password: string;
}
