import { DEFAULT_NUMBER_OF_PLAYERS, SKILL_CAP } from "./constants";
import { EloCalculationResult, GameId, MatchResult, Player } from "./types";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

const game_ids: GameId[] = [
  "Chess",
  "Poker",
  "Starcraft",
  //"Street Fighter",
];

const player_ids: Player["id"][] = [];
const player_db: Record<GameId, Record<Player["id"], Player>> = {};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
export function init(nbrOfPlayers: number = DEFAULT_NUMBER_OF_PLAYERS) {
  while (player_ids.length < nbrOfPlayers) {
    // TODO: get hardhat accounts
    const account = privateKeyToAccount(generatePrivateKey());
    player_ids.push(account.address);
  }
  console.log(player_ids);
  for (const gameId of game_ids) {
    player_db[gameId] = {};
    for (const id of player_ids) {
      const p = {
        id,
        skill: getRandomInt(SKILL_CAP),
        rating: 1500,
      };
      player_db[gameId][p.id] = p;
    }
  }
}

export function getPlayer(gameId: GameId, id: Player["id"]) {
  return { ...player_db[gameId][id] };
}

function generateGameId(): GameId {
  return game_ids[getRandomInt(game_ids.length)];
}

export function getMatchMaking() {
  const randomGameId = generateGameId();
  let index1 = getRandomInt(player_ids.length);
  let index2 = index1;
  while (index1 === index2) {
    index2 = getRandomInt(player_ids.length);
  }
  return {
    player1: getPlayer(randomGameId, player_ids[index1]),
    player2: getPlayer(randomGameId, player_ids[index2]),
    gameId: randomGameId,
  };
}

export function updateRating(
  matchResult: MatchResult,
  eloGains: EloCalculationResult
) {
  if (!player_db[matchResult.gameId][matchResult.winner])
    throw new Error(`Can't find winner ${matchResult.winner}`);
  if (!player_db[matchResult.gameId][matchResult.loser])
    throw new Error(`Can't find loser ${matchResult.loser}`);
  player_db[matchResult.gameId][matchResult.winner].rating += eloGains.winner;
  player_db[matchResult.gameId][matchResult.loser].rating += eloGains.loser;
}
