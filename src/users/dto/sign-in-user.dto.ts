import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IntersectionType } from '@nestjs/mapped-types';
import { EmailDto } from './email.dto';
import { PasswordDto } from './password.dto';
import { NicknameDto } from './nickname.dto';

export class SignInUserDto extends IntersectionType(EmailDto, PasswordDto) {}
