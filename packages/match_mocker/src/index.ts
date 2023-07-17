import { calculate as calcElo } from "./elo-calc";
import { generateMatchResult } from "./generator";
import {
  init as initDb,
  getTwoRandomPlayers,
  updateRating as updateDb,
  getPlayer,
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

  // TODO: make all TS errors go away
  const eloGains = calcElo(
    getPlayer(matchRes.winner).rating,
    getPlayer(matchRes.loser).rating
  );

  updateDb(matchRes, eloGains);

  const newPlayers = {
    winner: getPlayer(matchRes.winner),
    loser: getPlayer(matchRes.loser),
  };

  const proof = await noirEloProver(
    {
      winner: player1.rating,
      loser: player2.rating,
    },
    {
      winner: newPlayers.winner.rating,
      loser: newPlayers.loser.rating,
    }
  );

  await registerMatch(matchRes, newPlayers.winner, newPlayers.loser, proof);
}

async function start() {
  initDb();
  await initChainIngestor();

  while (true) {
    await mock_match();
  }
}

start();
