const {expect} = require("chai")
const {ethers} = require("hardhat")

describe("TestFunc", function(){
    let owner
    let other_addr
    let demo

    beforeEach(async function(){
        [owner, other_addr] = await ethers.getSigners()

        const DemoContract = await ethers.getContractFactory("TestFunc", owner);
        demo = await DemoContract.deploy();
        await demo.waitForDeployment();
    })

    async function sendMoney(sender) {
        const amount = 100
        const contrAddr = await demo.getAddress();
        const txData = {
            to: contrAddr,
            value: ethers.parseEther("0.1")
        };

        const tx = await sender.sendTransaction(txData);
        await tx.wait();
        return [tx, amount]
    }

    it("should allow to send money", async function () {
        const [sendMoneyTx, amount] = await sendMoney(other_addr)
        console.log("transaction details",sendMoneyTx)
    
        const contractBalance = await ethers.provider.getBalance(other_addr, "finalized")
        // expect(contractBalance).to.equal(amount);
    })
})