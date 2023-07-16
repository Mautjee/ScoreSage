import { MatchResult, Player } from "./types";

const SCORE_CAP = 100;

const players: Player[] = [];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function generateScore(p: Player): number {
  return getRandomInt(SCORE_CAP) + p.skill;
}

export function generateMatchResult(p1: Player, p2: Player): MatchResult {
  const score = {
    player1: generateScore(p1),
    player2: generateScore(p2),
  };
  // TODO: no draws, player1 will win those...
  const p1IsWinner = score.player1 >= score.player2;

  const result: MatchResult = {
    gameId: getRandomInt(5),
    score,
    timestamp: Date.now(),
    winner: p1IsWinner ? p1.id : p2.id,
    loser: p1IsWinner ? p2.id : p1.id,
  };
  return result;
}
