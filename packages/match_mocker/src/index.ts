import { calculate as calcElo } from "./elo-calc";
import { generateMatchResult } from "./generator";
import {
  init as initDb,
  getMatchMaking,
  updateRating as updateDb,
  getPlayer,
} from "./player-db";
import { init as initChainIngestor, registerMatch } from "./chain-ingestor";
import { noirEloProver } from "./provers";

async function mock_match() {
  // TODO: maybe get the rating from chain?
  const { player1, player2, gameId } = getMatchMaking();

  const matchRes = generateMatchResult(gameId, player1, player2);

  // TODO: make all TS errors go away
  const eloGains = calcElo(
    getPlayer(gameId, matchRes.winner).rating,
    getPlayer(gameId, matchRes.loser).rating
  );

  updateDb(matchRes, eloGains);

  const newPlayers = {
    winner: getPlayer(gameId, matchRes.winner),
    loser: getPlayer(gameId, matchRes.loser),
  };

  const proof = await noirEloProver(
    {
      winner: newPlayers.winner.id === player1.id ? player1.rating : player2.rating,
      loser: newPlayers.loser.id === player1.id ? player1.rating : player2.rating,
    },
    {
      winner: newPlayers.winner.rating,
      loser: newPlayers.loser.rating,
    },
  );
  console.log(JSON.stringify({ player1, player2 }));
  console.log(JSON.stringify(newPlayers));

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
