// -------------------- ACCOUNTS --------------------

class FinancialAccount {
    constructor(accountNumber, accountHolder, balance = 0) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this._balance = balance;
        this.transactions = [];
        this.createdDate = new Date();
    }

    get balance() {
        return this._balance;
    }

    deposit(amount, description = "Deposit") {
        if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
            throw new Error("Deposit amount must be a positive number");
        }
        this._balance += amount;
        this.recordTransaction(amount, 'credit', description);
        return `Deposited $${amount}. Current balance: $${this._balance}`;
    }

    withdraw(amount, description = "Withdrawal") {
        if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
            throw new Error("Withdrawal amount must be a positive number");
        }
        if (amount > this._balance) {
            throw new Error("Insufficient funds");
        }
        this._balance -= amount;
        this.recordTransaction(amount, 'debit', description);
        return `Withdrew $${amount}. Current balance: $${this._balance}`;
    }

    recordTransaction(amount, type, description) {
        const transaction = {
            id: this.transactions.length + 1,
            date: new Date(),
            amount,
            type,
            description,
            balanceAfter: this._balance
        };
        this.transactions.push(transaction);
        return transaction;
    }

    getStatement(startDate, endDate = new Date()) {
        return this.transactions.filter(t =>
            t.date >= startDate && t.date <= endDate
        );
    }

    displayInfo() {
        return `${this.constructor.name} #${this.accountNumber} | ${this.accountHolder} | Balance: $${this.balance.toFixed(2)}`;
    }
}

class SavingsAccount extends FinancialAccount {
    constructor(accountNumber, accountHolder, balance = 0, interestRate = 0.01) {
        super(accountNumber, accountHolder, balance);
        this.interestRate = interestRate;
    }

    calculateInterest(years = 1) {
        return this._balance * this.interestRate * years;
    }

    accrueInterest(years = 1) {
        const interest = this.calculateInterest(years);
        if (interest > 0) {
            this._balance += interest;
            this.recordTransaction(interest, 'credit', `Interest (${years} yr)`);
        }
        return `Interest added: $${interest.toFixed(2)}`;
    }
}

// -------------------- BANK --------------------

class Bank {
    constructor(name) {
        this.name = name;
        this.accounts = new Map();
    }

    createAccount(account) {
        if (this.accounts.has(account.accountNumber)) {
            throw new Error("Account already exists");
        }
        this.accounts.set(account.accountNumber, account);
    }

    getAccount(accountNumber) {
        const acc = this.accounts.get(accountNumber);
        if (!acc) {
            throw new Error("Account not found");
        }
        return acc;
    }

    getBankDetails() {
        return {
            bankName: this.name,
            totalAccounts: this.accounts.size,
            totalBalance: this.getTotalBalance().toFixed(2)
        };
    }

    getTotalBalance() {
        let total = 0;
        for (const acc of this.accounts.values()) {
            total += acc.balance;
        }
        return total;
    }

    listAllAccounts() {
        return Array.from(this.accounts.values()).map(acc => ({
            accountNumber: acc.accountNumber,
            holder: acc.accountHolder,
            type: acc.constructor.name,
            balance: acc.balance.toFixed(2)
        }));
    }

    getAccountDetails(accountNumber) {
        return this.getAccount(accountNumber).displayInfo();
    }

    getTransactions(accountNumber) {
        return this.getAccount(accountNumber).transactions;
    }

    getStatement(accountNumber, startDate, endDate = new Date()) {
        return this.getAccount(accountNumber).getStatement(startDate, endDate);
    }
}

// -------------------- SAMPLE DATA --------------------

const bank = new Bank("Global Bank");

bank.createAccount(new FinancialAccount("6747", "JP", 575));
bank.createAccount(new SavingsAccount("6731", "Masoom", 1000, 0.05));
bank.createAccount(new FinancialAccount("6761", "Greeshmanth", 2000));
bank.createAccount(new FinancialAccount("6762", "Anurag", 5000));


const bank2 = new Bank("Bank of India");
bank2.createAccount(new FinancialAccount("1234", "Alice", 1500));
bank2.createAccount(new SavingsAccount("5678", "Bob", 3000, 0.09));


// -------------------- CLI --------------------

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log(`
========= BANK MENU =========
1. View Bank Details
2. View Account Details
3. Deposit
4. Withdraw
5. View Transactions
6. View Statement
7. Add Interest (Savings)
8. Exit
=============================
`);
    rl.question("Choose an option: ", handleMenu);
}

function handleMenu(choice) {
    switch (choice.trim()) {
        case "1":
            console.table(bank.getBankDetails());
            console.table(bank.listAllAccounts());
            showMenu();
            break;

        case "2":
            rl.question("Enter Account Number: ", accNo => {
                try {
                    console.log(bank.getAccountDetails(accNo.trim()));
                } catch (e) {
                    console.log(e.message);
                }
                showMenu();
            });
            break;

        case "3":
            rl.question("Enter Account Number: ", accNo => {
                rl.question("Enter Amount: ", amt => {
                    try {
                        const acc = bank.getAccount(accNo.trim());
                        console.log(acc.deposit(Number(amt)));
                    } catch (e) {
                        console.log(e.message);
                    }
                    showMenu();
                });
            });
            break;

        case "4":
            rl.question("Enter Account Number: ", accNo => {
                rl.question("Enter Amount: ", amt => {
                    try {
                        const acc = bank.getAccount(accNo.trim());
                        console.log(acc.withdraw(Number(amt)));
                    } catch (e) {
                        console.log(e.message);
                    }
                    showMenu();
                });
            });
            break;

        case "5":
            rl.question("Enter Account Number: ", accNo => {
                try {
                    console.table(bank.getTransactions(accNo.trim()));
                } catch (e) {
                    console.log(e.message);
                }
                showMenu();
            });
            break;

        case "6":
            rl.question("Enter Account Number: ", accNo => {
                rl.question("Enter Start Date (YYYY-MM-DD): ", dateStr => {
                    try {
                        const start = new Date(dateStr);
                        console.table(bank.getStatement(accNo.trim(), start));
                    } catch (e) {
                        console.log(e.message);
                    }
                    showMenu();
                });
            });
            break;

        case "7":
            rl.question("Enter Savings Account Number: ", accNo => {
                rl.question("Enter Years: ", y => {
                    try {
                        const acc = bank.getAccount(accNo.trim());
                        if (!(acc instanceof SavingsAccount)) {
                            throw new Error("Not a savings account");
                        }
                        console.log(acc.accrueInterest(Number(y)));
                    } catch (e) {
                        console.log(e.message);
                    }
                    showMenu();
                });
            });
            break;

        case "8":
            console.log("Exiting...");
            rl.close();
            break;

        default:
            console.log("Invalid option");
            showMenu();
    }
}

// Start
showMenu();
