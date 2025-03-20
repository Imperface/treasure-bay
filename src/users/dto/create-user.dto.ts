import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(48)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(48)
  name: string;

  // password: string;
  // role: string;
  // isActivated: boolean;
  // activationLink: string;
  // status: string;
}
