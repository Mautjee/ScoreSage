import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { readdir } from "fs/promises";

const contractTags: string[] = [];

const deployVerifiers: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const verifiers = await readdir("contracts/verifiers");

  for (const contractName of verifiers) {
    const name = "Verifier" + contractName.replace(".sol", "");
    await deploy(name, {
      from: deployer,
      args: [],
      contract: `contracts/verifiers/${contractName}:UltraVerifier`,
      log: true,
      autoMine: true,
    });
    contractTags.push(name);
  }
};

export default deployVerifiers;

deployVerifiers.tags = ["Verifiers", ...contractTags];
