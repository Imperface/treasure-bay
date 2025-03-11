import { Module } from '@nestjs/common';
import { CellsController } from './cells.controller';
import { CellsService } from './cells.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cell, CellSchema } from 'src/schemas/Cell.schema';

@Module({
  controllers: [CellsController],
  providers: [CellsService],
  imports: [
    MongooseModule.forFeature([{ name: Cell.name, schema: CellSchema }]),
  ],
})
export class CellsModule {}
