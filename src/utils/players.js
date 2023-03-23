const ANIMALS = [
  "🐶",
  "🐱",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
];

// FUNCTION getRandom Players returns and object with two random different animals from array ANIMALS:
export const getRandomPlayers = () => {
  const playerOne = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];

  const animalsWithoutPlayerOne = ANIMALS.filter(
    (element) => element !== playerOne
  );

  const playerTwo =
    animalsWithoutPlayerOne[
      Math.floor(Math.random() * animalsWithoutPlayerOne.length)
    ];

  return { playerOne, playerTwo };
};
