import * as crypto from "crypto";

const DEFAULT_NUMBER_OF_PLAYERS = 10;
const SCORE_CAP = 100;
const SKILL_CAP = 25;

export type Player = {
  id: string;
  skill: number;
};

export type MatchResult = {
  winner: Player["id"];
  loser: Player["id"];
  timestamp: number;
  score: {
    player1: number;
    player2: number;
  };
};

const players: Player[] = [];

export function getPlayers() {
  return players;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function init(nbrOfPlayers: number = DEFAULT_NUMBER_OF_PLAYERS) {
  while (players.length < nbrOfPlayers) {
    players.push({
      id: crypto.randomUUID(),
      skill: getRandomInt(SKILL_CAP),
    });
  }
}

function generateScore(p: Player): number {
  return getRandomInt(SCORE_CAP) + p.skill;
}

export function generateMatch(): MatchResult {
  const player1 = players[getRandomInt(players.length)];
  const player2 = players[getRandomInt(players.length)];

  const score = {
    player1: generateScore(player1),
    player2: generateScore(player2),
  };
  // TODO: no draws, player1 will win those...
  const p1IsWinner = score.player1 >= score.player2;

  const result: MatchResult = {
    score,
    timestamp: Date.now(),
    winner: p1IsWinner ? player1.id : player2.id,
    loser: p1IsWinner ? player2.id : player1.id,
  };
  return result;
}

async function start() {
  let prom;
  let resolve = (value?: unknown) => {};
  init();

  while (true) {
    prom = new Promise((r) => {
      resolve = r;
    });
    setTimeout(() => resolve(), 500);
    await prom;
    const matchRes = generateMatch();
    console.log(JSON.stringify(matchRes));
  }
}

start();
