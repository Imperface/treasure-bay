import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class PasswordDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}
