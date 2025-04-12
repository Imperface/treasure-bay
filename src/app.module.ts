import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FieldsModule } from './fields/fields.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FieldsModule,
    UsersModule,
    MongooseModule.forRoot(`${process.env.DB_URI}`),
    AuthModule,
  ],
})
export class AppModule {}
