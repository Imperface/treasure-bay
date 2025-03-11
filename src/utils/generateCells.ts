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
  const countOfFields = rows * columns;

  const cells: {
    coordinates: [number, number];
    entity: string;
  }[] = [];

  for (let i = 0; i < countOfFields; i += 1) {
    const item: { coordinates: [number, number]; entity: string } = {
      coordinates: [i % rows, Math.floor(i / columns)],
      entity: getRandomReward(rewards),
    };

    cells.push(item);
  }

  return cells;
};
