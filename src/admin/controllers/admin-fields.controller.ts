import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { AdminFieldsService } from '../services/admin-fields.service';
import { GenerateFieldDto } from 'src/fields/dto/generateField.dto';

// import { rewards } from 'src/constants/rewards';
import { generateCells } from 'src/utils/generateCells';
import { GetFieldByIdDto } from 'src/fields/dto/get-field-by-id.dto';

@Controller('admin-fields')
export class AdminFieldsController {
  constructor(private readonly adminFieldsService: AdminFieldsService) {}

  @Post('generate')
  async generate(@Body() generateFieldDto: GenerateFieldDto) {
    return this.adminFieldsService.generateField(generateFieldDto);
    // const { errors } =
    const fields =
      await this.adminFieldsService.generateField(generateFieldDto);

    // if (errors) {
    //   throw new HttpException('Bad request', 400);
    // }
    console.log('Generated fields:', fields);
    return {
      message: 'Field generated',
      // field,
    };
  }

  @Get('')
  async getFields() {
    const fields = await this.adminFieldsService.getFields();

    if (!fields) {
      throw new HttpException('No fields found', 404);
    }

    return {
      message: 'Fields retrieved',
      fields,
    };
  }

  @Get(':id')
  async getFieldById(@Param() getFieldByIdDto: GetFieldByIdDto) {
    const field = await this.adminFieldsService.getFieldById(getFieldByIdDto);

    return {
      message: 'Field retrieved',
      field,
    };
  }
}
