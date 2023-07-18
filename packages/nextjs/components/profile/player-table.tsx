import { PlayerLink } from "./player-link";

interface PlayersTableProps {
  players: string[];
  isLoading: boolean;
}

export const PlayersTable = ({ players, isLoading }: PlayersTableProps) => {
  return (
    <div className="flex justify-center">
      <table className="table table-zebra w-full shadow-lg">
        <thead>
          <tr>
            <th className="bg-primary">Players</th>
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
              return (
                <tr key={key} className="hover text-sm">
                  <td className="w-1/12">
                    <PlayerLink address={player} size="sm" format="long" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};
