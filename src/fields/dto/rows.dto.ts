import { IsNumber, Min } from 'class-validator';

export class RowsDto {
  @IsNumber()
  @Min(5)
  rows: number;
}
