import { HttpException, HttpStatus } from '@nestjs/common';

export const generateCells = ({
  rows,
  columns,
  rewards,
}: {
  rows: number;
  columns: number;
  rewards: string[];
}) => {
  // get the total number of cells
  const countOfCells = rows * columns;

  // create empty array for cells
  const cells: {
    xCoordinate: number;
    yCoordinate: number;
    entity: string;
  }[] = [];

  // generate cells with coordinates and empty entity
  for (let i = 0; i < countOfCells; i += 1) {
    const item: { xCoordinate: number; yCoordinate: number; entity: string } = {
      xCoordinate: i % rows,
      yCoordinate: Math.floor(i / columns),
      entity: 'empty',
    };

    cells.push(item);
  }

  // return error if the number of rewards is greater than the number of cells
  if (rewards.length > countOfCells) {
    throw new HttpException(
      'Generation failed. The number of rewards is greater than the number of cells',
      HttpStatus.BAD_REQUEST
    );
  }

  // put rewards in random cells
  rewards.forEach((reward) => {
    let placed = false;
    while (!placed) {
      const randomIndex = Math.floor(Math.random() * countOfCells);

      if (cells[randomIndex].entity === 'empty') {
        cells[randomIndex].entity = reward;
        placed = true;
      }
    }
  });

  return cells;
};
