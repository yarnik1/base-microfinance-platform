// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Microfinance {
    struct Loan {
        address payable borrower;
        uint amount;
        uint interestRate;
        uint dueDate;
        bool repaid;
    }

    Loan[] public loans;
    mapping(address => uint[]) public borrowerLoans;

    event LoanCreated(address borrower, uint loanId, uint amount, uint interestRate, uint dueDate);
    event LoanRepaid(address borrower, uint loanId);

    function createLoan(uint _amount, uint _interestRate, uint _duration) public {
        uint dueDate = block.timestamp + _duration;
        loans.push(Loan({
            borrower: payable(msg.sender),
            amount: _amount,
            interestRate: _interestRate,
            dueDate: dueDate,
            repaid: false
        }));
        uint loanId = loans.length - 1;
        borrowerLoans[msg.sender].push(loanId);
        emit LoanCreated(msg.sender, loanId, _amount, _interestRate, dueDate);
    }

    function repayLoan(uint _loanId) public payable {
        Loan storage loan = loans[_loanId];
        require(msg.sender == loan.borrower, "Only borrower can repay the loan");
        require(!loan.repaid, "Loan already repaid");
        require(block.timestamp <= loan.dueDate, "Loan is overdue");
        require(msg.value >= loan.amount + (loan.amount * loan.interestRate / 100), "Insufficient repayment amount");

        loan.repaid = true;
        loan.borrower.transfer(msg.value);
        emit LoanRepaid(loan.borrower, _loanId);
    }

    function getLoansCount() public view returns (uint) {
        return loans.length;
    }

    function getLoan(uint _loanId) public view returns (address, uint, uint, uint, bool) {
        Loan storage loan = loans[_loanId];
        return (loan.borrower, loan.amount, loan.interestRate, loan.dueDate, loan.repaid);
    }
}
