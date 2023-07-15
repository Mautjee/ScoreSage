import fs from "fs";
import chalk from "chalk";
const graphDir = "../subgraph";
const deploymentsDir = "./deployments";

function publishContract(contractName: string, networkName: string) {
  try {
    const contractUri = fs.readFileSync(`${deploymentsDir}/${networkName}/${contractName}.json`).toString();
    const contract = JSON.parse(contractUri);
    const graphConfigPath = `${graphDir}/networks.json`;
    let graphConfigString = "";
    try {
      if (fs.existsSync(graphConfigPath)) {
        graphConfigString = fs.readFileSync(graphConfigPath).toString();
      } else {
        graphConfigString = "{}";
      }
    } catch (e) {
      console.log(e);
    }

    const graphConfig = JSON.parse(graphConfigString);
    if (!(networkName in graphConfig)) {
      graphConfig[networkName] = {};
    }
    if (!(contractName in graphConfig[networkName])) {
      graphConfig[networkName][contractName] = {};
    }
    graphConfig[networkName][contractName].address = contract.address;

    fs.writeFileSync(graphConfigPath, JSON.stringify(graphConfig, null, 2));
    if (!fs.existsSync(`${graphDir}/abis`)) fs.mkdirSync(`${graphDir}/abis`);
    fs.writeFileSync(`${graphDir}/abis/${networkName}_${contractName}.json`, JSON.stringify(contract.abi, null, 2));

    // Hardhat Deploy writes a file with all ABIs in react-app/src/contracts/contracts.json
    // If you need the bytecodes and/or you want one file per ABIs, un-comment the following block.
    // Write the contracts ABI, address and bytecodes in case the front-end needs them
    // fs.writeFileSync(
    //   `${publishDir}/${contractName}.address.js`,
    //   `module.exports = "${contract.address}";`
    // );
    // fs.writeFileSync(
    //   `${publishDir}/${contractName}.abi.js`,
    //   `module.exports = ${JSON.stringify(contract.abi, null, 2)};`
    // );
    // fs.writeFileSync(
    //   `${publishDir}/${contractName}.bytecode.js`,
    //   `module.exports = "${contract.bytecode}";`
    // );

    return true;
  } catch (e) {
    console.log("Failed to publish " + chalk.red(contractName) + " to the subgraph.");
    console.log(e);
    return false;
  }
}

async function main() {
  const directories = fs.readdirSync(deploymentsDir);
  directories.forEach(function (directory) {
    const files = fs.readdirSync(`${deploymentsDir}/${directory}`);
    files.forEach(function (file) {
      if (file.indexOf(".json") >= 0) {
        const contractName = file.replace(".json", "");
        publishContract(contractName, directory);
      }
    });
  });
  console.log("✅  Published contracts to the subgraph package.");
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
