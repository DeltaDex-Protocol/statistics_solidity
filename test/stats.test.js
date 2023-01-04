const { expect, assert } = require("chai");
require("@nomiclabs/hardhat-waffle");
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

describe("Deploy Statistics", () => {
  let statistics;

  const a = 0.59;

  beforeEach(async () => {
    /*     const Statistics = await ethers.getContractFactory("Statistics");
    statistics = await Statistics.deploy(); */
  });

  it("Should deploy", async () => {
    const Statistics = await ethers.getContractFactory("Statistics");
    statistics = await Statistics.deploy();
    await statistics.deployed();
  });

  it("Should calculate probability density function", async () => {
    const result_js = pdfNormal(a);

    const input = ethers.utils.parseEther(a.toString());

    const output = await statistics.pdf(input);

    const out = ethers.utils.formatUnits(
      ethers.BigNumber.from(output),
      "ether"
    );

    console.log("pdf() accuraccy: ", result_js / out);

    expect(result_js).to.be.closeTo(parseFloat(out), 0.00000005);
  });

  it("Should calculate cumulative distribution function", async () => {
    const result_js = cdfNormal(a, 0, 1);

    const input = ethers.utils.parseEther(a.toString());

    const output = await statistics.cdf(input);

    const out = ethers.utils.formatUnits(
      ethers.BigNumber.from(output),
      "ether"
    );

    console.log("cdf() accuraccy: ", result_js / out);

    expect(result_js).to.be.closeTo(parseFloat(out), 0.00000005);
  });

  it("Should calculate error function", async () => {
    const result_js = mathjs.erf(a);

    const input = ethers.utils.parseEther(a.toString());

    const output = await statistics.erf(input);

    const out = ethers.utils.formatUnits(
      ethers.BigNumber.from(output),
      "ether"
    );

    console.log("err() accuraccy: ", result_js / out);

    expect(result_js).to.be.closeTo(parseFloat(out), 0.0000005);
  });
});
