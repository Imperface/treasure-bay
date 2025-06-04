import { IsNumber, Min } from 'class-validator';

export class ColumnsDto {
  @IsNumber()
  @Min(10)
  columns: number;
}
