import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { SignOutUserDto } from './dto/sign-out-user.dto';
import { User } from 'src/schemas/User.schema';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
    // private readonly emailService: EmailService
  ) {}

  @Post('sign-up')
  signUpUser(@Body() signUpDto: SignUpUserDto): Promise<{ message: string }> {
    return this.usersService.signUpUser(signUpDto);
  }

  @Post('sign-out/:id')
  @UseGuards(JwtAuthGuard)
  signOut(@Param() signOutDto: SignOutUserDto): Promise<{ message: string }> {
    return this.usersService.signOut(signOutDto);
  }

  @Get('current')
  @UseGuards(JwtAuthGuard)
  async getCurrent(@Request() req): Promise<User> {
    return this.usersService.getCurrentUser(req.user.id);
  }
}
