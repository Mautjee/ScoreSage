import { Client, createWalletClient, EIP1193RequestFn, Formatters, http, HttpTransport, parseEther, PrivateKeyAccount, PublicActions, publicActions, Serializers, Transport, WalletActions, WalletRpcSchema } from "viem";
import { Player } from "./types";
import { hardhat } from "viem/chains";
import { privateKeyToAccount } from 'viem/accounts';
import contracts from "../generated/deployedContracts";

let gameServerWallet: Client<HttpTransport, {readonly id: 31337; readonly name: "Hardhat"; readonly network: "hardhat"; readonly nativeCurrency: {readonly decimals: 18; readonly name: "Ether"; readonly symbol: "ETH";}; readonly rpcUrls: {readonly default: {readonly http: readonly ["http://127.0.0.1:8545"];}; readonly public: {readonly http: readonly ["http://127.0.0.1:8545"];};};} & {formatters: Formatters | undefined; serializers: Serializers<Formatters> | undefined;}, PrivateKeyAccount, WalletRpcSchema, WalletActions<{readonly id: 31337; readonly name: "Hardhat"; readonly network: "hardhat"; readonly nativeCurrency: {readonly decimals: 18; readonly name: "Ether"; readonly symbol: "ETH";}; readonly rpcUrls: {readonly default: {readonly http: readonly ["http://127.0.0.1:8545"];}; readonly public: {readonly http: readonly ["http://127.0.0.1:8545"];};};} & {formatters: Formatters | undefined; serializers: Serializers<Formatters> | undefined;}, PrivateKeyAccount> & PublicActions<Transport<string, Record<string, any>, EIP1193RequestFn<undefined>>, {readonly id: 31337; readonly name: "Hardhat"; readonly network: "hardhat"; readonly nativeCurrency: {readonly decimals: 18; readonly name: "Ether"; readonly symbol: "ETH";}; readonly rpcUrls: {readonly default: {readonly http: readonly ["http://127.0.0.1:8545"];}; readonly public: {readonly http: readonly ["http://127.0.0.1:8545"];};};} & {formatters: Formatters | undefined; serializers: Serializers<Formatters> | undefined;}, PrivateKeyAccount>>;

export async function init() {
  gameServerWallet = createWalletClient({
    account: privateKeyToAccount('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e'),
    chain: hardhat,
    transport: http(),
  }).extend(publicActions);
}

export async function registerMatch(player1: Player, player2: Player) {
  // TODO: actual chain
  const c = contracts[hardhat.id][0].contracts.ScoreSage;
  const { request } = await gameServerWallet.simulateContract({
    address: c.address,
    abi: c.abi,
    functionName: 'updatePlayerRating',
    args: [player1.id, player1.rating, player2.id, player2.rating],
    //value: parseEther('100', 'wei')
  });
    await gameServerWallet.writeContract(request);
}
