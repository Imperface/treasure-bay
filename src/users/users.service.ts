import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import { SignOutUserDto } from './dto/sign-out-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signUpUser(signUpUserDto: SignUpUserDto): Promise<{ message: string }> {
    // get user by email
    const existingUserEmail = await this.getUserByEmail(signUpUserDto.email);

    // get user by nickname
    const existingUserNickname = await this.getUserByNickname(
      signUpUserDto.nickname
    );

    // return error if user with the same email or nickname already exists
    if (existingUserEmail || existingUserNickname) {
      throw new HttpException(
        'Email or nickname already in use.',
        HttpStatus.CONFLICT
      );
    }

    // get salt
    const salt = await genSalt(10);

    // hash password
    const hashedPassword = await hash(signUpUserDto.password, salt);

    // create new user
    const newUser = new this.userModel({
      ...signUpUserDto,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // return to client success message
    return { message: 'User created successfully' };
  }

  async getCurrentUser(id: string): Promise<User> {
    // get user by id
    const user = await this.getUserById(id);

    // return error if user not found
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // return user without password and activation link
    return user;
  }

  async signOut(signOutUserDto: SignOutUserDto): Promise<{ message: string }> {
    const { id } = signOutUserDto;
    const user = await this.updateToken(id, '');

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // return success message
    return { message: 'User signed out successfully' };
  }

  getUserByNickname(nickname: string): Promise<User | null> {
    return this.userModel.findOne({ nickname });
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  updateToken(id: string, token: string): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, { token }, { new: true })
      .select('-password -activationLink');
  }

  getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password -activationLink');
  }
}
