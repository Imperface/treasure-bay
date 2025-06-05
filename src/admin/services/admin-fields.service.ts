import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenerateFieldDto } from 'src/fields/dto/generateField.dto';
import { GetFieldByIdDto } from 'src/fields/dto/get-field-by-id.dto';
import { Field } from 'src/schemas/Field.schema';
import { generateCells } from 'src/utils/generateCells';

@Injectable()
export class AdminFieldsService {
  constructor(@InjectModel(Field.name) private fieldModel: Model<Field>) {}

  generateField(generateFieldDto: GenerateFieldDto) {
    const { rows, columns, rewards } = generateFieldDto;

    const cells = generateCells({ rows, columns, rewards });

    if (!cells || cells.length === 0) {
      throw new HttpException(
        'Generation failed. Please check your parameters.',
        HttpStatus.BAD_REQUEST
      );
    }

  const field = { cells, createdAt: new Date() };

    // if()

    return this.fieldModel.create(field);
    return { success: 'Field generated successfully', field };
    // return this.fieldModel.create({ cells, createdAt });
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

// {
// cells,
// createdAt,
// }: {
// cells: { coordinates: [number, number]; entity: string }[];
// createdAt: Date;
// }
