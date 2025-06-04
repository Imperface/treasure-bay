import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Field } from 'src/schemas/Field.schema';

@Injectable()
export class FieldsService {
  constructor(@InjectModel(Field.name) private fieldModel: Model<Field>) {}

  getAllFieldsAdmin() {
    return this.fieldModel.find();
  }

  getFieldsById(id: string) {
    return this.fieldModel.findById(id);
  }
}
