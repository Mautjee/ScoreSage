import {EloCalculationResult} from "./types";

const K_FACTOR = 32;

function probabilityOfWinning(p1: number, p2: number) {
  const diff = p1 - p2;
  const probability = 1 / (1 + Math.pow(10, -diff/400));
  return probability;
}

export function calculate(winnerRating: number, loserRating: number): EloCalculationResult {
  const prob = probabilityOfWinning(winnerRating, loserRating);
  const gain = Math.round((1 - prob) * K_FACTOR);

  return {
    winner: gain,
    loser: -gain
  };
};
