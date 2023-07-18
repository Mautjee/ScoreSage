# Score Sage

Leaderboards are at the heart of every competitive game. It's the place that validate the hard effort of dedicated players. It can also be used as source of truth for organising events like tournaments where only the top players are allowed to participate.

We propose a **Universal Verifiable Leaderboard Oracle**.

**Universal**: the system is capable of ingesting match outcome information from different sources as long as the game engine generating the results of a match can provide a zk proof of that computation.

**Verifiable**: at ingestion time the system will verify the provided proof using the same verification system that the given game engine uses. Only verified information will be stored on-chain. Ultimately we can store the proof accompanying every transaction to be audited at any given time.

**Oracle**: we rely on zk verification to ensure the soundness of the data provided by the leaderboard. The rating information lives on-chain so it can be consumed by any smart contract. can be consumed on-chain

**ScoreSage** also stores verifiable information off-chain. A graphQL API layer provide a scalable solution to consume verified player rating information without incurring in high costs.

Independent communities can consume rating information for their own needs at low cost with out loosing the trust in the data they are querying.

---
## About the project and how to run it

This  project is bootstraped using "[🏗 Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2/tree/main)", to see our own additions refer to [the diff to `v0.0.0` here](https://github.com/Mautjee/score-sage/compare/v0.0.0...develop).


### Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [docker-compose](https://docs.docker.com/compose/install/)

### Running
The project requires three processes to run. They are referred to as terminals below.

```bash
# terminal 1 (Hardhat)
yarn
yarn chain
```
```bash
# terminal 2 (Docker-containers for The Graph)
yarn run-graph-node
```
*If you have docker-compose installed as a standalone, you'll need to change `packages/services/package.json` to use `docker-compose` instead of `docker compose`.*


Before running terminal 3, make sure that The Graph has finished its' set-up.
```bash
# terminal 3 (Nextjs)
yarn graph-create-local # requires local chain and The Graph to be running
yarn deploy-and-graph   # requires local chain and The Graph to be running
yarn start
```
*When starting The Graph you will be prompted to fill in a version. v0.0.1 will do fine.*
