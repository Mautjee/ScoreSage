import { MATCH_FREQUENCY } from "./constants";
import { calculate as calcElo } from "./elo-calc";
import { generateMatchResult } from "./generator";
import {
  init as initDb,
  getTwoRandomPlayers,
  getPlayerRating,
  updateRating,
} from "./player-db";

import {
  init as initChainIngestor,
  registerMatch
} from "./chain-ingestor";

async function start() {
  let prom;
  let resolve = (value?: unknown) => {};
  initDb();
  await initChainIngestor();

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
    await registerMatch(newPlayers.player1, newPlayers.player2);

    // TODO: verify ELO-rating calculation in circuit
  }
}

start();
