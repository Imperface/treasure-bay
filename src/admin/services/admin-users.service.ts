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

  getUserById(idDto: IdDto) {
    const { id } = idDto;
    return this.userModel.findById(id);
  }

  updateUserRole(updateUserRoleDto: UpdateUserRoleDto) {
    const { id, role } = updateUserRoleDto;
    return this.userModel.findByIdAndUpdate(id, { role }, { new: true });
  }

  async updateUserStatus(updateUserStatusDto: UpdateUserStatusDto) {
    const { id, status } = updateUserStatusDto;
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, select: '-password' }
    );

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  getAllUsers() {
    return this.userModel.find();
  }

  updateAttempt(updateUserAttemptsDto: UpdateUserAttemptsDto) {
    const { id, attempts } = updateUserAttemptsDto;
    return this.userModel.findByIdAndUpdate(id, { attempts }, { new: true });
  }
}
