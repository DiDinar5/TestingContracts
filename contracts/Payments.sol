// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.25;

contract Payments{
    struct Payment {
        uint amount;
        uint time;
        address from;
        string message;
    }

    struct Balance {
        uint totalBalance; // Total Ether balance
        uint paymentCount; // Number of payments
        mapping(uint => Payment) payments;
    }

    mapping(address => Balance) public balance;

    event PaymentMade(address indexed from, uint amount, string message, uint time);

    function getPayment(address addr, uint index) public view returns (Payment memory) {
        require(msg.sender == addr, "Access denied"); // Restrict access
        return balance[addr].payments[index];
    }

    function currentBalance()  public view returns(uint) {
        return address(this).balance;
    }

    function pay(string memory message) public payable {
        require(msg.value > 0, "Payment value must be greater than zero");

        // Update balance
        balance[msg.sender].totalBalance += msg.value;

        // Record payment
        uint paymentNum = balance[msg.sender].paymentCount;
        balance[msg.sender].payments[paymentNum] = Payment({
            amount: msg.value,
            time: block.timestamp,
            from: msg.sender,
            message: message
        });

        // Increment payment count
        balance[msg.sender].paymentCount++;

        // Emit event
        emit PaymentMade(msg.sender, msg.value, message, block.timestamp);
    }
}