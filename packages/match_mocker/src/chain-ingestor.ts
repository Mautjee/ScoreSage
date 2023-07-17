import {
  Client,
  createWalletClient,
  EIP1193RequestFn,
  Formatters,
  http,
  HttpTransport,
  PrivateKeyAccount,
  PublicActions,
  publicActions,
  Serializers,
  toHex,
  Transport,
  WalletActions,
  WalletRpcSchema,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { hardhat } from "viem/chains";
import contracts from "../generated/deployedContracts";
import { MatchResult, Player, Proof } from "./types";

// TODO: better type
let gameServerWallet: Client<HttpTransport, {readonly id: 31337; readonly name: "Hardhat"; readonly network: "hardhat"; readonly nativeCurrency: {readonly decimals: 18; readonly name: "Ether"; readonly symbol: "ETH";}; readonly rpcUrls: {readonly default: {readonly http: readonly ["http://127.0.0.1:8545"];}; readonly public: {readonly http: readonly ["http://127.0.0.1:8545"];};};} & {formatters: Formatters | undefined; serializers: Serializers<Formatters> | undefined;}, PrivateKeyAccount, WalletRpcSchema, WalletActions<{readonly id: 31337; readonly name: "Hardhat"; readonly network: "hardhat"; readonly nativeCurrency: {readonly decimals: 18; readonly name: "Ether"; readonly symbol: "ETH";}; readonly rpcUrls: {readonly default: {readonly http: readonly ["http://127.0.0.1:8545"];}; readonly public: {readonly http: readonly ["http://127.0.0.1:8545"];};};} & {formatters: Formatters | undefined; serializers: Serializers<Formatters> | undefined;}, PrivateKeyAccount> & PublicActions<Transport<string, Record<string, any>, EIP1193RequestFn<undefined>>, {readonly id: 31337; readonly name: "Hardhat"; readonly network: "hardhat"; readonly nativeCurrency: {readonly decimals: 18; readonly name: "Ether"; readonly symbol: "ETH";}; readonly rpcUrls: {readonly default: {readonly http: readonly ["http://127.0.0.1:8545"];}; readonly public: {readonly http: readonly ["http://127.0.0.1:8545"];};};} & {formatters: Formatters | undefined; serializers: Serializers<Formatters> | undefined;}, PrivateKeyAccount>>;

export async function init() {
  // TODO: not hardcoding server wallet
  gameServerWallet = createWalletClient({
    account: privateKeyToAccount(
      "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"
    ),
    chain: hardhat,
    transport: http(),
  }).extend(publicActions);
}

export async function registerMatch(
  matchRes: MatchResult,
  winner: Player,
  loser: Player,
  proof: Proof,
) {
  // TODO: configurable actual chain
  const c = contracts[hardhat.id][0].contracts.ScoreSage;
  const { request } = await gameServerWallet.simulateContract({
    address: c.address,
    abi: c.abi,
    functionName: "updatePlayerRating",
    args: [matchRes.gameId, winner.id, loser.id, winner.rating, loser.rating, proof],
  });
  await gameServerWallet.writeContract(request);
}
