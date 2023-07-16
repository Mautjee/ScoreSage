import { calculate as calcElo } from "./elo-calc";
import { generateMatchResult } from "./generator";
import {
  init as initDb,
  getTwoRandomPlayers,
  getPlayerRating,
  updateRating as updateDb,
} from "./player-db";
import { init as initChainIngestor, registerMatch } from "./chain-ingestor";
import { noirEloProver } from "./provers";
import { MatchResult } from "./types";

function getOldNewRating(
  matchRes: MatchResult,
  oldPlayers: any,
  newPlayers: any
) {
  if (matchRes.winner === newPlayers.player1.id) {
    return {
      winner: newPlayers.player1,
      winnerOldRating: oldPlayers.player1.rating,
      loser: newPlayers.player2,
      loserOldRating: oldPlayers.player2.rating,
    };
  } else {
    return {
      winner: newPlayers.player2,
      winnerOldRating: oldPlayers.player2.rating,
      loser: newPlayers.player1,
      loserOldRating: oldPlayers.player1.rating,
    };
  }
}

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

  const temp = getOldNewRating(matchRes, { player1, player2 }, newPlayers);

  await registerMatch(temp.winner, temp.loser, proof, {
    w: temp.winnerOldRating,
    l: temp.loserOldRating
  });
}

async function start() {
  initDb();
  await initChainIngestor();

  while (true) {
    await mock_match();
  }
}

start();
