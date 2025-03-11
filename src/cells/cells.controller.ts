import { Body, Controller, Get, Post } from '@nestjs/common';
import { SelectCellDto } from './dto/selectCell.dto';
import { CellsService } from './cells.service';
import { GenerateCellsDto } from './dto/generateCells.dto';
import { generateCells } from 'src/utils/generateCells';
import { rewards } from 'src/constants/rewards';

@Controller('cells')
export class CellsController {
  constructor(private cellsService: CellsService) {}

  @Post('generate')
  async generate(@Body() generateCellsDto: GenerateCellsDto) {
    const cells = generateCells({
      rows: generateCellsDto.rows,
      columns: generateCellsDto.columns,
      rewards, // mock data. in future it was object with array of rewards and they count
    });

    const createdCells = await this.cellsService.generateCells(cells);

    console.log(createdCells);

    return createdCells;
  }

  // selectField(@Body() selectFieldDto: SelectFieldDto) {
  //   const countOfRow = 3;
  //   const countOfColumn = 3;

  //   const countOfFields = countOfRow * countOfColumn;

  //   const field: [{ coordinates: [number, number] }, entity: number] | any[] =
  //     [];
  //   for (let i = 0; i < countOfFields; i += 1) {
  //     const item = {
  //       coordinates: [i % countOfRow, Math.floor(i / countOfColumn)],
  //       entity: i,
  //     };
  //     field.push({ ...item });
  //   }

  //   const cell = field.find(
  //     (item) =>
  //       item.coordinates[0] === selectFieldDto.coordinates[0] &&
  //       item.coordinates[1] === selectFieldDto.coordinates[1]
  //   );

  //   if (!cell) {
  //     return { error: 'Cell not found' };
  //   }

  //   return cell;
  // }
}
