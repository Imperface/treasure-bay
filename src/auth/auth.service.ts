import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // get user by email
    const user = await this.usersService.getUserByEmail(email);

    // return null if user not found
    if (user === null || !user) {
      return null;
    }

    // compare password with hashed password
    const isPasswordMatching = await compare(String(pass), user.password);

    // return user if password is matching
    if (isPasswordMatching) {
      return user;
    }

    // return null if password is not matching
    return null;
  }

  async signIn(id: string, email: string) {
    // create payload
    const payload = { id, email };

    // create token with payloads
    const token = this.jwtService.sign(payload);

    // add token to user document in db
    const signInUser = await this.usersService.updateToken(id, token);

    // return user with updated token
    return signInUser;
  }
}
