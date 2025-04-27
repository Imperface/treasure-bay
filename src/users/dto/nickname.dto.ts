import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NicknameDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  nickname: string;
}
