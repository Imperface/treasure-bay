import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FieldsModule } from './fields/fields.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FieldsModule,
    UsersModule,
    MongooseModule.forRoot(`${process.env.DB_URI}`),
  ],
})
export class AppModule {}
