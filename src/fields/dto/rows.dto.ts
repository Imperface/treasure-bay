import { IsNumber, Min } from 'class-validator';

export class RowsDto {
  @IsNumber()
  @Min(10)
  rows: number;
}
