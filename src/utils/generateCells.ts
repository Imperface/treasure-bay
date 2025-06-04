const getRandomReward = (rewards: string[]) => {
  const randomIndex = Math.floor(Math.random() * rewards.length);
  return rewards[randomIndex];
};

export const generateCells = ({
  rows,
  columns,
  rewards,
}: {
  rows: number;
  columns: number;
  rewards: string[];
}) => {
  const countOfCells = rows * columns;

  const cells: {
    coordinates: [number, number];
    entity: string;
  }[] = [];

  for (let i = 0; i < countOfCells; i += 1) {
    const item: { coordinates: [number, number]; entity: string } = {
      coordinates: [i % rows, Math.floor(i / columns)],
      entity: 'empty',
    };

    cells.push(item);
  }

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
