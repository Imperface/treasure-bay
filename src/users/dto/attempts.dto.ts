import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AttemptsDto {
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  attempts: number;
}
