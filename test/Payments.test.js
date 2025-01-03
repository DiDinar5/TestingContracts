const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Payments", function () {
    let acc1, acc2, payments;

    beforeEach(async function () {
        [acc1, acc2] = await ethers.getSigners();
        const Payments = await ethers.getContractFactory("Payments");
        payments = await Payments.deploy();
        await payments.waitForDeployment(); 
    });

    it("should be deployed", async function () {
        const contractAddress = await payments.getAddress();
                expect(contractAddress).to.be.properAddress;
    });

    it("should have 0 ether by default", async function () {
        const balance = await payments.currentBalance();
        console.log(balance)
        expect(balance).to.eq(0)
    });
});
