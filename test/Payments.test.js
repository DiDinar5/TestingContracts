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

    it("should be possible to send funds", async function() {
        const sum = 100
        const message = "message from hardhat"
        
        const tx = await payments.connect(acc2).pay(message, { value: sum });

        await expect(() => tx).to.changeEtherBalances([acc2, payments], [-sum, sum]);

        await tx.wait();

        const contractAddressNew = await payments.getAddress();
               expect(contractAddressNew).to.be.properAddress;


        const newPayment = await payments.getPayment(contractAddressNew, 0); 
        
        console.log("Payment details:", newPayment);
        expect(newPayment.amount).to.eq(0);
    });
    
});
