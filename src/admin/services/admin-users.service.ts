import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { IdDto } from 'src/users/dto/id.dto';
import { UpdateUserStatusDto } from 'src/users/dto/update-user-status.dto';
import { UpdateUserRoleDto } from 'src/users/dto/update-user-role.dto';
import { UpdateUserAttemptsDto } from 'src/users/dto/update-user-attempts.dto';

@Injectable()
export class AdminUsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserById(idDto: IdDto): Promise<User> {
    // get id from dto
    const { id } = idDto;

    // get user by id
    const user = await this.userModel.findById(id);

    // return error if user not found
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // return user without password and activationLink
    return user;
  }

  async updateUserRole(updateUserRoleDto: UpdateUserRoleDto): Promise<User> {
    // get id and role from dto
    const { id, role } = updateUserRoleDto;

    // try to update user role
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { role },
      { new: true, select: '-password -activationLink' }
    );

    // return error if user not found
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // return user without password and activationLink
    return user;
  }

  async updateUserStatus(updateUserStatusDto: UpdateUserStatusDto) {
    // get id and status from dto
    const { id, status } = updateUserStatusDto;

    // try to update user status
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, select: '-password -activationLink' }
    );

    // return error if user not found
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // return user without password and activationLink
    return user;
  }

  async updateAttempt(updateUserAttemptsDto: UpdateUserAttemptsDto) {
    // get id and attempts from dto
    const { id, attempts } = updateUserAttemptsDto;

    // try to update user attempts
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { attempts },
      { new: true, select: '-password -activationLink' }
    );
    // return error if user not found
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // return user without password and activationLink
    return user;
  }
  getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }
}
