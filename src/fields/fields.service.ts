import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Field } from 'src/schemas/Field.schema';

@Injectable()
export class FieldsService {
  constructor(@InjectModel(Field.name) private fieldModel: Model<Field>) {}

  generateField({
    cells,
    createdAt,
  }: {
    cells: { coordinates: [number, number]; entity: string }[];
    createdAt: Date;
  }) {
    return this.fieldModel.create({ cells, createdAt });
  }

  getAllFieldsAdmin() {
    return this.fieldModel.find();
  }

  getFieldsById(id: string) {
    return this.fieldModel.findById(id);
  }
  
}
