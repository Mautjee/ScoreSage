import { PlayerRank } from "./player-rank";
import { Player } from "~~/../subgraph/generated/schema";

interface PlayerProfileProps {
  players: Player[];
  isLoading: boolean;
}

export const PlayerProfile = ({ players, isLoading }: PlayerProfileProps) => {
  return (
    <div className="flex justify-center">
      <table className="table table-zebra w-full shadow-lg">
        <thead>
          <tr>
            <th className="bg-primary">Game</th>
            <th className="bg-primary">Rank</th>
            <th className="bg-primary">Rating</th>
            <th className="bg-primary">Games won</th>
            <th className="bg-primary">Games lost</th>
          </tr>
        </thead>
        {isLoading ? (
          <tbody>
            {[...Array(10)].map((_, rowIndex) => (
              <tr key={rowIndex} className="bg-base-200 hover:bg-base-300 transition-colors duration-200 h-12">
                {[...Array(4)].map((_, colIndex) => (
                  <td className="w-1/12" key={colIndex}>
                    <div className="h-2 bg-gray-200 rounded-full animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {players.map((player, key) => {
              return <PlayerRank player={player} key={key} />;
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};
