import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { PlayerProfile } from "~~/components/profile";
import { GET_PLAYER_DATA, Players } from "~~/utils/subgraph";

const PlayerDashboard: NextPage = () => {
  const router = useRouter();

  const playerAddress = router.query.address as string;
  const { loading, data, error } = useQuery(GET_PLAYER_DATA, { variables: { playerAddress: playerAddress } });

  if (error) return <h1> Error </h1>;
  if (loading) return <h1> Loading </h1>;

  const playersObj = data as Players;
  console.log(playersObj);
  return (
    <div className="container mx-auto my-10">
      <div className="container align-center">
        <h2 className="font-bold text-center text-3xl">Profile: {playerAddress}</h2>
      </div>
      <PlayerProfile players={playersObj.players} isLoading={loading} />
    </div>
  );
};

export default PlayerDashboard;
