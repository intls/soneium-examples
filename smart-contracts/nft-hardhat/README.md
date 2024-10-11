# Sample NFT Smart-Contract Project

This project demonstrates a basic Hardhat use case with a sample NFT contract, a test for that contract, and a Hardhat Ignition module configured to deploy the contract on Soneium Minato.

## Install Packages

```bash
pnpm i
```

## Compile the Contract

```bash
npx hardhat compile
```

## Set the Private Key for Deployer
Use Hardhat’s configuration variables manager to set the private key:

```bash
npx hardhat vars set PRIVATE_KEY
```

## Test the Contract

Deploy the contract on the local Hardhat network before testing:

```bash
npx hardhat ignition deploy ./ignition/modules/NFT.ts --network hardhat
npx hardhat test ./test/NFT.ts --network hardhat
```

## Deploy the Contract
Due to inconsistencies in the deployed environments (e.g., inconsistencies with the deployer account), you might need to manually delete the `ignition/deployments` folder before deploying contract.

```bash
npx hardhat ignition deploy ./ignition/modules/NFT.ts
```

## Verify the Contract

```bash
npx hardhat verify [CONTRACT_ADDRESS] [DEPLOYER_ADDRESS]
```