import { newPublishedRating } from "../generated/ScoreSage/ScoreSage";
import { Player } from "../generated/schema";

export function handlePublishedRating(event: newPublishedRating): void {
  let senderString = event.params.player.toHexString();

  let player = Player.load(senderString);

  if (player === null) {
    player = new Player(senderString);
    player.address = event.params.player;
    player.createdAt = event.block.timestamp;
    player.rating = event.params.rating;
    player.gamesWon = 0;
    player.gamesLost = 0;
  } else {
    if (event.params.winner) {
      player.gamesWon = player.gamesWon += 1;
    } else {
      player.gamesLost = player.gamesLost += 1;
    }
  }

  player.save();
}
