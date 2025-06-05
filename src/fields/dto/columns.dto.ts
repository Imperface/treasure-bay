import { IsNumber, Min } from 'class-validator';

export class ColumnsDto {
  @IsNumber()
  @Min(5)
  columns: number;
}
