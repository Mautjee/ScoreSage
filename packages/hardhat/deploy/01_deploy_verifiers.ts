import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const contractTags: string[] = [];

const deployVerifiers: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const contract = await deploy("UltraVerifier", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  await deploy("ScoreSage", {
    from: deployer,
    args: [contract.address],
    log: true,
    autoMine: true,
  });
};

export default deployVerifiers;

deployVerifiers.tags = ["Verifiers", ...contractTags];
