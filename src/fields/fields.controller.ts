import { Body, Controller, Get, Post } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { GenerateFieldDto } from './dto/generateField.dto';
import { generateCells } from 'src/utils/generateCells';
import { rewards } from 'src/constants/rewards';

@Controller('fields')
export class CellsController {
  constructor(private fieldsService: FieldsService) {}

  @Post('generate')
  async generate(@Body() { rows, columns }: GenerateFieldDto) {
    const cells = generateCells({ rows, columns, rewards });
    // mock data. in future it was object with array of rewards and they count

    const field = { cells, createdAt: new Date() };

    const createdField = await this.fieldsService.generateField(field);
    return createdField;
  }
}
