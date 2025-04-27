import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { IdDto } from './dto/id.dto';
import { genSalt, hash } from 'bcrypt';
import { SignUpUserResponseDto } from './dto/sign-up-user-response.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signUpUser(signUpUserDto: SignUpUserDto): Promise<{ message: string }> {
    const existingUserEmail = await this.getUserByEmail(signUpUserDto.email);

    const existingUserNickname = await this.getUserByNickname(
      signUpUserDto.nickname
    );

    if (existingUserEmail || existingUserNickname) {
      throw new HttpException(
        'Email or nickname already in use.',
        HttpStatus.CONFLICT
      );
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(signUpUserDto.password, salt);
    const newUser = new this.userModel({
      ...signUpUserDto,
      password: hashedPassword,
    });
    const user = await newUser.save();
    console.log('user', user);

    return { message: 'User created successfully' };
  }

  getUserByNickname(nickname: string) {
    return this.userModel.findOne({ nickname });
  }

  getUserByEmail(email: string) {
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
}
