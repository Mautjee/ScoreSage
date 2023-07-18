import { useRouter } from "next/router";
import { LeaderboardTable } from "../../components/leaderboard/leaderboard-table";
import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { PlayerSearchBar } from "~~/components/leaderboard";
import { GET_LEADERBOARD, Players } from "~~/utils/subgraph";

const LeaderBoardGame: NextPage = () => {
  const router = useRouter();
  const leaderboardId = router.query.leaderboardId as string;

  const { loading, data, error } = useQuery(GET_LEADERBOARD, { variables: { gameId: leaderboardId } });

  if (error) return <h1> Error </h1>;
  if (loading) return <h1> Loading </h1>;
  const playersObj = data as Players;

  return (
    <div className="container mx-auto my-10">
      <div className="container align-center">
        <h2 className="font-bold text-center text-3xl">Board: {leaderboardId}</h2>
      </div>
      <PlayerSearchBar />
      <LeaderboardTable players={playersObj.players} isLoading={loading} />
    </div>
  );
};

export default LeaderBoardGame;
