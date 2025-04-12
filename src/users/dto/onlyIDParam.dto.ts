import { Transform } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';

export class OnlyIDParamDTO {
  @IsMongoId()
  id: string;
}
