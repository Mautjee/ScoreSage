import { MATCH_FREQUENCY } from "./constants";
import { calculate as calcElo } from "./elo-calc";
import { generateMatchResult } from "./generator";
import {
  init as initDb,
  getTwoRandomPlayers,
  getPlayerRating,
  updateRating as updateDb,
} from "./player-db";
import {
  init as initChainIngestor,
  registerMatch
} from "./chain-ingestor";
import { noirEloProver } from "./provers";

async function mock_match() {
    // TODO: maybe get the rating from chain?
    const { player1, player2 } = getTwoRandomPlayers();

    const matchRes = generateMatchResult(player1, player2);
    const eloGains = calcElo(
      getPlayerRating(matchRes.winner),
      getPlayerRating(matchRes.loser)
    );
    const newPlayers = updateDb(matchRes, eloGains);

    const proof = await noirEloProver(
      {
        p1: player1.rating,
        p2: player2.rating,
      },
      {
        p1: newPlayers.player1.rating,
        p2: newPlayers.player2.rating,
      }
    );

    // TODO: send proof to chain
    await registerMatch(newPlayers.player1, newPlayers.player2);
}

async function start() {
  initDb();
  await initChainIngestor();

  while (true) {
      await mock_match();
  }
}

start();
