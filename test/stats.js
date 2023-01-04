// require("@nomiclabs/hardhat-waffle");
const { parseUnits } = require("ethers/lib/utils");
const { ethers, network } = require("hardhat");
const mathjs = require("mathjs");

function cdfNormal(x, mean, standardDeviation) {
  return (1 - mathjs.erf((mean - x) / (Math.sqrt(2) * standardDeviation))) / 2;
}

function pdfNormal(x) {
  return (
    (1 / mathjs.sqrt(2 * mathjs.pi)) * mathjs.e ** ((-1 * mathjs.pow(x, 2)) / 2)
  );
}

async function main() {
  let statistics;

  //   const signers = await ethers.getSigners();
  //   let currentAddresses = Addresses.LoadAddresses();

  const Statistics = await ethers.getContractFactory("Statistics");
  statistics = await Statistics.deploy();
  await statistics.deployed();

  let a = 0.1;

  // probability density function
  for (let i = 0; i < 100; i++) {
    let result_js = pdfNormal(a);
    let input = ethers.utils.parseEther(a.toString());

    let output = await statistics.pdf(input);

    let out = ethers.utils.formatUnits(ethers.BigNumber.from(output), "ether");

    console.log("pdf accuracy:", out / result_js);

    a += 0.01;
  }

  a = 0.1;
  // cumulative density function
  for (let i = 0; i < 100; i++) {
    let result_js = cdfNormal(a, 0, 1);
    let input = ethers.utils.parseEther(a.toString());

    let output = await statistics.cdf(input);

    let out = ethers.utils.formatUnits(ethers.BigNumber.from(output), "ether");

    // console.log("output", output);
    // console.log("out", out);

    console.log("cdf accuracy:", out / result_js);

    a += 0.01;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
