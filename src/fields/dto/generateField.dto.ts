import { IsNumber } from 'class-validator';

export class GenerateFieldDto {
  @IsNumber()
  rows: number;

  @IsNumber()
  columns: number;
  // coordinates: [number, number];
  // rewards: string; // mock data. in future it was object with array of rewards and they count
}
