import { useQuery } from "@apollo/client";
import { Player } from "~~/../subgraph/generated/schema";
import { GET_LEADERBOARD, Players, reduceArray } from "~~/utils/subgraph";

interface PlayerRankProps {
  player: Player;
  key: number;
}

export const PlayerRank = ({ player, key }: PlayerRankProps) => {
  const { data, loading } = useQuery(GET_LEADERBOARD, { variables: { gameId: player.gameId } });
  if (loading) return <h1> Loading </h1>;
  const playersObj = data as Players;
  const addressArray = reduceArray(playersObj, "address");
  const rank = addressArray.indexOf(player.address.toString()) + 1;
  return (
    <tr key={key} className="hover text-sm">
      <td className="w-1/12">{player.gameId}</td>
      <td className="w-1/12">{rank}</td>
      <td className="w-1/12">{player.rating}</td>
      <td className="w-1/12">{player.gamesWon}</td>
      <td className="w-2/12">{player.gamesLost}</td>
    </tr>
  );
};
