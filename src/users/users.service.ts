import {
  HttpException,
  HttpStatus,
  Injectable,
  UseFilters,
} from '@nestjs/common';
import { SignUpUserDto } from './dto/signUpUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { OnlyIDParamDTO } from './dto/onlyIDParam.dto';
import { genSalt, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signUpUser(signUpUserDto: SignUpUserDto): Promise<User> {
    const existingUser = await this.getUserByEmail(signUpUserDto.email);

    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }
    
    const salt = await genSalt();

    const hashedPassword = await hash(signUpUserDto.password, salt);

    const newUser = new this.userModel({
      ...signUpUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  updateToken(id: OnlyIDParamDTO, token: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      { token },
      { new: true, fields: '-password' }
    );
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
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
