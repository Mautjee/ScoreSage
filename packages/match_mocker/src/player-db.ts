import * as crypto from "crypto";
import { EloCalculationResult, MatchResult, Player } from "./types";

const DEFAULT_NUMBER_OF_PLAYERS = 10;
const SKILL_CAP = 25;

const player_ids: Player["id"][] = [];
const player_db: Record<Player["id"], Player> = {};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function init(nbrOfPlayers: number = DEFAULT_NUMBER_OF_PLAYERS) {
  while (player_ids.length < nbrOfPlayers) {
    const p = {
      // TODO: actually using hardhat addresses for player ids
      id: crypto.randomUUID(),
      skill: getRandomInt(SKILL_CAP),
      rating: 1500,
    };
    player_ids.push(p.id);
    player_db[p.id] = p;
  }
}

export function getPlayerRating(id: Player["id"]) {
  return player_db[id].rating;
};


export function getTwoRandomPlayers() {
  return {
    player1: player_db[player_ids[getRandomInt(player_ids.length)]],
    player2: player_db[player_ids[getRandomInt(player_ids.length)]],
  };
};

export function updateRating(matchResult: MatchResult, eloGains: EloCalculationResult) {
  if (!player_db[matchResult.winner]) throw new Error(`Can't find winner ${matchResult.winner}`);
  if (!player_db[matchResult.loser]) throw new Error(`Can't find loser ${matchResult.loser}`);
  player_db[matchResult.winner].rating += eloGains.winner;
  player_db[matchResult.loser].rating += eloGains.loser;
  return {
    player1: player_db[matchResult.winner],
    player2: player_db[matchResult.loser],
  };
};
