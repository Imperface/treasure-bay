import { Injectable, UseFilters } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { OnlyIDParamDTO } from './dto/id.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  blockUser(id: OnlyIDParamDTO) {
    return this.userModel.findByIdAndUpdate(id, {
      status: false,
      isActivated: false,
    });
  }

  unBlockUser(id: string) {
    return this.userModel.findByIdAndUpdate(id, {
      status: true,
      isActivated: true,
    });
  }

  async findAll() {
    return this.userModel.find();
  }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  // findAll() {
  //   return `This action returns all users`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
