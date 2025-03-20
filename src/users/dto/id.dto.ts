import { Transform } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';
import { SafeMongoIdTransform } from 'src/utils/safeMongoIdTransform';

export class OnlyIDParamDTO {
  @IsMongoId()
  // @Transform((value) => SafeMongoIdTransform(value))
  id: string;
}
