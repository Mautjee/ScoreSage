import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

// TODO: Get Leaderboard ID from GraphQL API
const Leaderboards: NextPage = () => {
  const leaderboarId_alpha = { id: "0x000", name: "Alpha", description: "The first leaderboard." };
  const leaderboarId_beta = { id: "0x001", name: "Beta", description: "The second leaderboard." };
  const leaderboardList = [leaderboarId_alpha, leaderboarId_beta];

  return (
    <>
      <MetaHeader title="Leaderboards" description="Available leaderboards by Game ID.">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Score Sage</span>
          </h1>
          <p className="text-center text-lg">Universal Verifiable Leaderboards for Games and Esports</p>
        </div>
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            {leaderboardList.map(leaderboard => (
              <Link key={leaderboard.id} href={`leaderboards/${leaderboard.id}`} passHref className="link">
                <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
                  <h2>{leaderboard.name}</h2>
                  <p>{leaderboard.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Leaderboards;
