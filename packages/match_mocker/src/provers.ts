import { EloCalculationResult, MatchResult } from "./types";
import { spawn } from "child_process";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const CIRCUITS_PATH = path.join(__dirname, "../circuits/noir");

async function spawnChild(name: string, args?: any, options?: any) {
  const child = spawn(name, args, options);

  let data = "";
  for await (const chunk of child.stdout) {
    console.log("stdout chunk: " + chunk);
    data += chunk;
  }
  let error = "";
  for await (const chunk of child.stderr) {
    console.error("stderr chunk: " + chunk);
    error += chunk;
  }
  const exitCode = await new Promise(resolve => {
    child.on("close", resolve);
  });

  if (exitCode) {
    throw new Error(`subprocess error exit ${exitCode}, ${error}`);
  }
  return data;
}

const getProverToml = (parsedArgs: any) => {
  let toml = "";
  for (const [key, value] of Object.entries(parsedArgs)) {
    toml += `${key} = ${JSON.stringify(value)}\n`;
  }
  return toml;
};

async function logProof(proof: string) {
  console.log("✅ here is the proof in byte32...\n0x" + proof);
}

async function logPublicInputs(circuitName: string) {
  const p = path.join(CIRCUITS_PATH, `${circuitName}/Verifier.toml`);
  const verifierToml = await readFile(p, "utf-8");
  const publicInputs = [];
  for (const line of verifierToml.split("\n")) {
    const input = line.split(" = ")[1];
    if (input) {
      publicInputs.push(JSON.parse(input));
    }
  }
  console.log("🔍 public inputs\n" + JSON.stringify(publicInputs));
}

async function generateProof(circuitName: string, parsedArgs?: any) {
  const cwd = path.join(CIRCUITS_PATH, `${circuitName}`);
  const p = path.join(cwd, "Prover.toml");
  console.log("📝 writing to: ", p);
  await writeFile(p, getProverToml(parsedArgs));
  console.log("🧠 generating proof...");
  const res = await spawnChild("nargo", ["prove"], {
    cwd,
  });
  logProof(res);
  logPublicInputs(circuitName);
  return res;
}

export function noirEloProver(
  oldRatings: {
    p1: number;
    p2: number;
  },
  newRatings: {
    p1: number;
    p2: number;
  }
) {
  return generateProof("ValidEloCalculation", {
    oldWinnerRating: oldRatings.p1,
    newWinnerRating: newRatings.p1,
    oldLoserRating: oldRatings.p2,
    newLoserRating: newRatings.p2,
  });
}
