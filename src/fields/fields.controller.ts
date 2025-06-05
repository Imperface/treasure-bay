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

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Get()
  async getAllFieldsAdmin() {
    return await this.fieldsService.getAllFieldsAdmin();
  }

  @Get(':id')
  async getFieldsById(@Param('id') id: string) {
    return await this.fieldsService.getFieldsById(id);
  }

  // @Post("open")
  // async openCell(@Body() ) {

  // }
}
