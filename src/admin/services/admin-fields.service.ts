import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetFieldByIdDto } from 'src/fields/dto/get-field-by-id.dto';
import { Field } from 'src/schemas/Field.schema';

@Injectable()
export class AdminFieldsService {
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

  getFields() {
    return this.fieldModel.find();
  }

  getFieldById(getFieldByIdDto: GetFieldByIdDto) {
    const { id } = getFieldByIdDto;
    console.log(id);
    return this.fieldModel.findById(id);
  }
}
