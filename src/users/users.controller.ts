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
import { SignUpUserDto } from './dto/signUpUser.dto';
import { MongoExceptionFilter } from 'src/utils/mongoExceptionFilter';
import { OnlyIDParamDTO } from './dto/onlyIDParam.dto';
import { UpdateAttemptsDto } from './dto/updateAttempts.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  @UseFilters(MongoExceptionFilter)
  signUpUser(@Body() signUpUserDto: SignUpUserDto) {
    return this.usersService.signUpUser(signUpUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserById(@Request() req) {
    console.log('getUserById', req.user);

    return this.usersService.getUserById(req.user.id);
  }

  // @Post('block/:id')
  // @UseFilters(MongoExceptionFilter)
  // async blockUser(@Param() { id }: OnlyIDParamDTO) {
  //   const user = await this.usersService.blockUser(id);

  //   if (user === null || !user) {
  //     throw new HttpException('Not found', 404);
  //   }

  //   return { message: `User blocked` };
  // }

  // @Post('unblock/:id')
  // @UseFilters(MongoExceptionFilter)
  // async unBlockUser(@Param() { id }: OnlyIDParamDTO) {
  //   const user = await this.usersService.unBlockUser(id);

  //   if (user === null || !user) {
  //     throw new HttpException('Not found', 404);
  //   }

  //   return { message: `User unblocked` };
  // }

  // @Patch('attempts/:id')
  // @UseFilters(MongoExceptionFilter)
  // async updateAttempts(
  //   @Param() { id }: OnlyIDParamDTO,
  //   @Body() updateAttempts: UpdateAttemptsDto
  // ) {
  //   const user = await this.usersService.updateAttempts(
  //     id,
  //     updateAttempts.attempts
  //   );

  //   return user;
  //   console.log(id);
  //   console.log(updateAttempts);
  //   return { success: 'success' };
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
