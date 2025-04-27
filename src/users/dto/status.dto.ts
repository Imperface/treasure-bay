import { IsBoolean, IsNotEmpty } from 'class-validator';

export class StatusDto {
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
