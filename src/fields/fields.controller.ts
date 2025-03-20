import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { FieldsService } from './fields.service';
import { GenerateFieldDto } from './dto/generateField.dto';
import { generateCells } from 'src/utils/generateCells';
import { rewards } from 'src/constants/rewards';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post('generate')
  async generate(@Body() { rows, columns }: GenerateFieldDto) {
    const cells = generateCells({ rows, columns, rewards });
    // mock data. in future it was object with array of rewards and they count

    const field = { cells, createdAt: new Date() };

    const { errors } = await this.fieldsService.generateField(field);

    if (errors) {
      throw new HttpException('Bad request', 400);
    }

    return {
      message: 'Field generated',
      field,
    };
  }

  @Get()
  async getAllFieldsAdmin() {
    return await this.fieldsService.getAllFieldsAdmin();
  }

  @Get(':id')
  async getFieldsById(@Param('id') id: string) {
    return await this.fieldsService.getFieldsById(id);
  }
}
