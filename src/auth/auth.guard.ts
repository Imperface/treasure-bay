import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// import {
//   CanActivate,
//   ExecutionContext,
//   HttpException,
//   HttpStatus,
//   Injectable,
//   NestMiddleware,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();

//     const token = this.extractTokenFromHeader(request);
//     if (!token) {
//       throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
//     }
//     try {
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret: process.env.JWT_SECRET,
//       });

//       request['user'] = payload;
//     } catch {
//       throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
//     }
//     return true;
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     console.log(request.headers);
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }
