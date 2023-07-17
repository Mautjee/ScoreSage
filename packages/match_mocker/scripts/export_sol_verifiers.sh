echo "=== exporting sol verifiers ==="
rm ../hardhat/contracts/verifiers/*
for d in circuits/noir/*/ ; do
  echo $d
  cd $d
  nargo codegen-verifier
  mv contract/plonk_vk.sol ../../../../hardhat/contracts/verifiers/$(basename $d).sol
  cd ../../..
done
