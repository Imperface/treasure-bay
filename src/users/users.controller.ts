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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoExceptionFilter } from 'src/utils/mongoExceptionFilter';
import { OnlyIDParamDTO } from './dto/id.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseFilters(MongoExceptionFilter)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('block/:id')
  @UseFilters(MongoExceptionFilter)
  async blockUser(@Param('id') id: OnlyIDParamDTO) {
    const a = await this.usersService.blockUser(id);
    console.log(a);
    if (a) {
      throw new HttpException('Bad request', 400);
    }
    return this.usersService.blockUser(id);
  }

  @Post('unblock/:id')
  @UseFilters(MongoExceptionFilter)
  unBlockUser(@Param('id') id: string) {
    return this.usersService.unBlockUser(id);
  }

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
