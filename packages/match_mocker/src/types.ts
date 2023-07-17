export type Player = {
  id: `0x${string}`;
  skill: number;
  rating: number;
};

export type MatchResult = {
  gameId: GameId;
  winner: Player["id"];
  loser: Player["id"];
  timestamp: number;
  score: {
    player1: number;
    player2: number;
  };
};

export type EloCalculationResult = {
  winner: number;
  loser: number;
};

export type GameId = string;
export type Proof = `0x${string}`;
