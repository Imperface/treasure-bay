import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateAttemptsDto {
  @IsNotEmpty()
  @IsNumber()
  attempts: number;
}
