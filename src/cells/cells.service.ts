import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cell } from 'src/schemas/Cell.schema';

@Injectable()
export class CellsService {
  constructor(@InjectModel(Cell.name) private cellModel: Model<Cell>) {}

  generateCells(
    cells: {
      coordinates: number[];
      entity: string;
    }[]
  ) {
    return this.cellModel.create(cells);
  }
}
