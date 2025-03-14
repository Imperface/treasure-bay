import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FieldsModule } from './fields/fields.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FieldsModule,
    MongooseModule.forRoot(`${process.env.DB_URI}`),
  ],
})
export class AppModule {}
