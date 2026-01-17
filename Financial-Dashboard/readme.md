# Banking CLI Application

A simple **Command-Line Interface (CLI) banking system** built with Node.js. This project simulates a bank environment with multiple accounts, supporting financial operations like deposits, withdrawals, transaction tracking, and interest calculation for savings accounts.

---

## Features

- Create **Financial Accounts** and **Savings Accounts**.
- Deposit and withdraw money with validation.
- Track **transaction history** with date, type, description, and resulting balance.
- Generate **account statements** for a specific period.
- Calculate and accrue **interest** for savings accounts.
- View **bank details** including total accounts and total balance.
- Interactive CLI menu for easy usage.

---

## Classes Overview

### `FinancialAccount`
- Basic account with account number, holder, balance, and transaction history.
- Methods:
    - `deposit(amount, description)`
    - `withdraw(amount, description)`
    - `getStatement(startDate, endDate)`
    - `displayInfo()`

### `SavingsAccount` (extends `FinancialAccount`)
- Adds an `interestRate` property.
- Methods:
    - `calculateInterest(years)`
    - `accrueInterest(years)`

### `Bank`
- Stores and manages multiple accounts.
- Methods:
    - `createAccount(account)`
    - `getAccount(accountNumber)`
    - `listAllAccounts()`
    - `getBankDetails()`
    - `getTransactions(accountNumber)`
    - `getStatement(accountNumber, startDate, endDate)`

---

## Sample Data

- Preloaded with two banks (`Global Bank` and `Bank of India`) and multiple accounts.
- Example accounts:

| Bank | Account Number | Holder       | Type            | Balance | Interest Rate |
|------|----------------|-------------|----------------|---------|---------------|
| Global Bank | 6747 | JP           | FinancialAccount | 575     | N/A           |
| Global Bank | 6731 | Masoom       | SavingsAccount  | 1000    | 5%            |
| Global Bank | 6761 | Greeshmanth  | FinancialAccount | 2000    | N/A           |
| Global Bank | 6762 | Anurag       | FinancialAccount | 5000    | N/A           |
| Bank of India | 1234 | Alice      | FinancialAccount | 1500    | N/A           |
| Bank of India | 5678 | Bob        | SavingsAccount  | 3000    | 9%            |

---


========= BANK MENU =========
1. View Bank Details
2. View Account Details
3. Deposit
4. Withdraw
5. View Transactions
6. View Statement
7. Add Interest (Savings)
8. exit

Example Commands

**Deposit Money**

Choose an option: 3
Enter Account Number: 6747
Enter Amount: 200


**Withdraw Money**

Choose an option: 4
Enter Account Number: 6747
Enter Amount: 100


**View Account Transactions**

Choose an option: 5
Enter Account Number: 6747


**Accrue Interest (Savings Account)**

Choose an option: 7
Enter Savings Account Number: 6731
Enter Years: 2