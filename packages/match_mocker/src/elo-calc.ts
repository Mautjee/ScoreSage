import {EloCalculationResult} from "./types";

export function calculate(winnerRating: number, loserRating: number): EloCalculationResult {
  // TODO: actually calculating ELO https://github.com/pingwin-org/pingwin/blob/master/backend/src/elo.js
  return {
    winner: 1,
    loser: 1
  };
};
