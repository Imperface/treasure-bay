import { Module } from '@nestjs/common';
import { CellsController } from './fields.controller';
import { FieldsService } from './fields.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Field, FieldSchema } from 'src/schemas/Field.schema';

@Module({
  controllers: [CellsController],
  providers: [FieldsService],
  imports: [
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
  ],
})
export class FieldsModule {}
