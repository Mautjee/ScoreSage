import { newPublishedRating } from "../generated/ScoreSage/ScoreSage";
import { Player } from "../generated/schema";

export function handlePublishedRating(event: newPublishedRating): void {
  let senderString = event.params.player.toHexString();

  let player = Player.load(senderString.concat(event.params.gameId));

  if (player === null) {
    player = new Player(senderString.concat(event.params.gameId));
    player.address = event.params.player;
    player.createdAt = event.block.timestamp;
    player.rating = event.params.rating;
    //TODO: adapt player to have multiple game iD
    player.gameId = event.params.gameId;
    player.proof = event.params.proof;
    player.witness = event.params.witness;
    if (event.params.winner) {
      player.gamesWon = player.gamesWon = 1;
      player.gamesLost = player.gamesLost = 0;
    } else {
      player.gamesLost = player.gamesLost = 1;
      player.gamesWon = player.gamesWon = 0;
    }
  } else {
    player.rating = event.params.rating;
    player.proof = event.params.proof;
    player.witness = event.params.witness;
    if (event.params.winner) {
      player.gamesWon = player.gamesWon += 1;
    } else {
      player.gamesLost = player.gamesLost += 1;
    }
  }

  player.save();
}
