import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dto/signUpUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { IdDto } from './dto/id.dto';
import { genSalt, hash } from 'bcrypt';

import { UpdateRoleDto } from './dto/update-role.dto';
import { EmailDto } from './dto/email.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signUpUser(signUpUserDto: SignUpUserDto): Promise<User> {
    const existingUser = await this.getUserByEmail({
      email: signUpUserDto.email,
    });

    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }
    
    const salt = await genSalt(10);
    const hashedPassword = await hash(signUpUserDto.password, salt);
    const newUser = new this.userModel({
      ...signUpUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  getUserByEmail(email: EmailDto) {
    return this.userModel.findOne({ email });
  }

  updateToken(id: IdDto, token: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      { token },
      {
        new: true,
        fields: '-password',
      }
    );
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  updateRole({ id, role }: UpdateRoleDto) {
    return this.userModel.findByIdAndUpdate(
      id,
      { role },
      { new: true, fields: '-password' }
    );
  }

  // blockUser(id: string) {
  //   return this.userModel.findByIdAndUpdate(
  //     id,
  //     {
  //       status: false,
  //       isActivated: false,
  //     },
  //     { new: true }
  //   );
  // }

  // unBlockUser(id: string) {
  //   return this.userModel.findByIdAndUpdate(
  //     id,
  //     {
  //       status: true,
  //       isActivated: true,
  //     },
  //     { new: true }
  //   );
  // }

  // async findAll() {
  //   return this.userModel.find();
  // }

  // updateAttempts(id: string, attempts: number) {
  //   return this.userModel.findByIdAndUpdate(id, { attempts }, { new: true });
  // }
}
