import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CellsModule } from './cells/cells.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CellsModule,
    MongooseModule.forRoot(`${process.env.DB_URI}`),
  ],
})
export class AppModule {}
