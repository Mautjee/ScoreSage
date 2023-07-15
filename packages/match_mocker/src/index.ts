import { calculate as calcElo } from "./elo-calc";
import { generateMatchResult } from "./generator";
import {
  init as initDb,
  getTwoRandomPlayers,
  getPlayerRating,
  updateRating,
} from "./player-db";
const MATCH_FREQUENCY = 500;

async function start() {
  let prom;
  let resolve = (value?: unknown) => {};
  initDb();

  while (true) {
    prom = new Promise((r) => {
      resolve = r;
    });
    setTimeout(() => resolve(), MATCH_FREQUENCY);
    await prom;

    // TODO: maybe get the rating from chain?
    const { player1, player2 } = getTwoRandomPlayers();

    const matchRes = generateMatchResult(player1, player2);
    const eloGains = calcElo(
      getPlayerRating(matchRes.winner),
      getPlayerRating(matchRes.loser)
    );

    const newPlayers = updateRating(matchRes, eloGains);

    // TODO: put match on chain
    // TODO: verify ELO-rating calculation in circuit
  }
}

start();
