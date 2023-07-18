import { gql } from "@apollo/client";

export const GET_GAMES = gql`
  query getGames {
    players {
      gameId
    }
  }
`;

export const GET_LEADERBOARD = gql`
  query getLeaderboard($gameId: String!) {
    players(orderBy: rating, orderDirection: desc, where: { gameId: $gameId }) {
      gameId
      address
      rating
      gamesWon
      gamesLost
    }
  }
`;

export const GET_PLAYER_DATA = gql`
  query getPlayers($playerAddress: String!) {
    players(where: { address: $playerAddress }) {
      gameId
      address
      rating
      gamesLost
      gamesWon
    }
  }
`;

export const GET_PLAYERS = gql`
  query getPlayers($playerAmount: Int!) {
    players(first: $playerAmount) {
      address
    }
  }
`;
