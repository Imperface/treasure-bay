import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  HttpException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { MongoExceptionFilter } from 'src/utils/mongoExceptionFilter';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { SignUpUserResponseDto } from './dto/sign-up-user-response.dto';
import { User } from 'src/schemas/User.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  @UseFilters(MongoExceptionFilter)
  signUpUser(@Body() signUpDto: SignUpUserDto): Promise<{ message: string }> {
    return this.usersService.signUpUser(signUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  async getCurrent(@Request() req) {
    return this.usersService.getUserById(req.user.id);
  }
}
