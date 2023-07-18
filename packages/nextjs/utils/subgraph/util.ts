import { Player } from "../../../subgraph/generated/schema";

export interface Players {
  players: Player[];
}
export const reduceArray = (data: Players, filterKey: "gameId" | "address"): string[] => {
  const newData = new Set<string>();
  data.players.forEach(player => newData.add(player[filterKey].toString()));

  return Array.from(newData);
};
