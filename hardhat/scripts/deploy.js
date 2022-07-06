const { ethers } = require("hardhat");
const { WORLDCUPBALLS_NFT_CONTRACT_ADDRESS } = require("../constants/constants");

async function main() {
  // Deploy the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await ethers.getContractFactory(
    "FakeNFTMarketplace"
  );
  const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
  await fakeNftMarketplace.deployed();

  console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

  // Now deploy the WorldCupBallsDAO contract
  const WorldCupBallsDAO = await ethers.getContractFactory("WorldCupBallsDAO");
  const worldCupBallsDAO = await WorldCupBallsDAO.deploy(
    fakeNftMarketplace.address,
    WORLDCUPBALLS_NFT_CONTRACT_ADDRESS,
    {
      // This assumes your account has at least 1 ETH in it's account
      // Change this value as you want
      value: ethers.utils.parseEther("1"),
    }
  );
  await worldCupBallsDAO.deployed();

  console.log("WorldCupBallsDAO deployed to: ", worldCupBallsDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });