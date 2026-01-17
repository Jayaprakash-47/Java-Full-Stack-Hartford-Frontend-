class FinancialAccount {
    constructor(accountNumber, accountHolder, balance = 0) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this._balance = balance; // Encapsulated with underscore convention
        this.transactions = [];
        this.createdDate = new Date();
    }

    // Getter for balance (encapsulation)
    get balance() {
        return this._balance;
    }

    // Method to deposit money
    deposit(amount, description = "Deposit") {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive");
        }
        this._balance += amount;
        this.recordTransaction(amount, 'credit', description);
        return this._balance;
    }

    // Method to withdraw money
    withdraw(amount, description = "Withdrawal") {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive");
        }
        if (amount > this._balance) {
            throw new Error("Insufficient funds");
        }
        this._balance -= amount;
        this.recordTransaction(amount, 'debit', description);
        return this._balance;
    }

    // Private method (convention with underscore)
    _validateAmount(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) {
            throw new Error("Invalid amount");
        }
        return true;
    }

    // Record transaction
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

    // Get account statement
    getStatement(startDate, endDate = new Date()) {
        return this.transactions.filter(transaction =>
            transaction.date >= startDate && transaction.date <= endDate
        );
    }

    // Calculate interest (to be overridden by child classes)
    calculateInterest() {
        return 0; // Base class returns 0 interest
    }

    // Display account info
    displayInfo() {
        return `${this.constructor.name} #${this.accountNumber}: ${this.accountHolder} - Balance: $${this.balance.toFixed(2)}`;
    }
}
// Savings Account inheriting from FinancialAccount
class SavingsAccount extends FinancialAccount {
    constructor(accountNumber, accountHolder, balance = 0, interestRate = 0.02) {
        super(accountNumber, accountHolder, balance);
        this.interestRate = interestRate;
        this.minimumBalance = 100; // Minimum balance requirement
        this.accountType = "Savings";
    }

    // Override withdraw to enforce minimum balance
    withdraw(amount, description = "Savings Withdrawal") {
        if (this._balance - amount < this.minimumBalance) {
            throw new Error(`Cannot withdraw below minimum balance of $${this.minimumBalance}`);
        }
        return super.withdraw(amount, description);
    }

    // Implement interest calculation
    calculateInterest() {
        const monthlyInterest = (this._balance * this.interestRate) / 12;
        return monthlyInterest;
    }

    // Add interest to account
    applyMonthlyInterest() {
        const interest = this.calculateInterest();
        this.deposit(interest, "Monthly Interest");
        return interest;
    }

    // Override display info
    displayInfo() {
        return `${super.displayInfo()} | Interest Rate: ${(this.interestRate * 100).toFixed(2)}%`;
    }
}

// Checking Account inheriting from FinancialAccount
class CheckingAccount extends FinancialAccount {
    constructor(accountNumber, accountHolder, balance = 0, overdraftLimit = 500) {
        super(accountNumber, accountHolder, balance);
        this.overdraftLimit = overdraftLimit;
        this.accountType = "Checking";
        this.transactionFee = 0.50; // Fee per transaction after limit
        this.freeTransactionLimit = 10;
        this.transactionCount = 0;
    }

    // Override withdraw to allow overdraft
    withdraw(amount, description = "Checking Withdrawal") {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive");
        }

        // Check if withdrawal exceeds available balance including overdraft
        const availableBalance = this._balance + this.overdraftLimit;
        if (amount > availableBalance) {
            throw new Error(`Exceeds overdraft limit. Available: $${availableBalance.toFixed(2)}`);
        }

        // Apply transaction fee if over limit
        this.transactionCount++;
        let fee = 0;
        if (this.transactionCount > this.freeTransactionLimit) {
            fee = this.transactionFee;
            this._balance -= fee;
            this.recordTransaction(fee, 'debit', "Transaction Fee");
        }

        this._balance -= amount;
        this.recordTransaction(amount, 'debit', description);
        return { newBalance: this._balance, feeCharged: fee };
    }

    // Reset monthly transaction count
    resetTransactionCount() {
        this.transactionCount = 0;
    }

    // Override display info
    displayInfo() {
        return `${super.displayInfo()} | Overdraft: $${this.overdraftLimit.toFixed(2)}`;
    }
}

// Investment Account with multiple inheritance-like composition
class InvestmentAccount extends SavingsAccount {
    constructor(accountNumber, accountHolder, balance = 0, interestRate = 0.04, riskLevel = "Medium") {
        super(accountNumber, accountHolder, balance, interestRate);
        this.riskLevel = riskLevel;
        this.investments = [];
        this.accountType = "Investment";
    }

    // Add investment
    addInvestment(instrument, amount, expectedReturn) {
        const investment = {
            id: this.investments.length + 1,
            instrument,
            amount,
            purchaseDate: new Date(),
            expectedReturn,
            status: "Active"
        };
        this.investments.push(investment);
        this.withdraw(amount, `Investment in ${instrument}`);
        return investment;
    }

    // Calculate portfolio value
    getPortfolioValue() {
        return this.investments.reduce((total, inv) => total + inv.amount, 0);
    }

    // Override display info
    displayInfo() {
        return `${super.displayInfo()} | Risk: ${this.riskLevel} | Investments: ${this.investments.length}`;
    }
}
// Bank System using polymorphism
class Bank {
    constructor(name) {
        this.name = name;
        this.accounts = [];
        this.totalDeposits = 0;
    }

    // Open new account (polymorphic)
    openAccount(accountType, ...args) {
        let account;

        switch(accountType.toLowerCase()) {
            case 'savings':
                account = new SavingsAccount(...args);
                break;
            case 'checking':
                account = new CheckingAccount(...args);
                break;
            case 'investment':
                account = new InvestmentAccount(...args);
                break;
            default:
                throw new Error("Unknown account type");
        }

        this.accounts.push(account);
        this.totalDeposits += account.balance;
        return account;
    }

    // Apply interest to all accounts (polymorphic behavior)
    applyMonthlyInterests() {
        const interestReport = [];

        this.accounts.forEach(account => {
            if (account.calculateInterest && typeof account.calculateInterest === 'function') {
                try {
                    const interest = account.calculateInterest();
                    if (interest > 0) {
                        account.deposit(interest, "Monthly Interest");
                        interestReport.push({
                            account: account.accountNumber,
                            interest: interest,
                            newBalance: account.balance
                        });
                    }
                } catch (error) {
                    console.error(`Error applying interest to account ${account.accountNumber}:`, error);
                }
            }
        });

        return interestReport;
    }

    // Generate bank report
    generateReport() {
        let report = `=== ${this.name} Bank Report ===\n`;
        report += `Total Accounts: ${this.accounts.length}\n`;
        report += `Total Deposits: $${this.totalDeposits.toFixed(2)}\n\n`;

        this.accounts.forEach(account => {
            report += `${account.displayInfo()}\n`;
        });

        return report;
    }

    // Find account by number
    findAccount(accountNumber) {
        return this.accounts.find(acc => acc.accountNumber === accountNumber);
    }

    // Transfer between accounts
    transfer(fromAccountNumber, toAccountNumber, amount) {
        const fromAccount = this.findAccount(fromAccountNumber);
        const toAccount = this.findAccount(toAccountNumber);

        if (!fromAccount || !toAccount) {
            throw new Error("One or both accounts not found");
        }

        fromAccount.withdraw(amount, `Transfer to ${toAccountNumber}`);
        toAccount.deposit(amount, `Transfer from ${fromAccountNumber}`);

        return {
            success: true,
            fromBalance: fromAccount.balance,
            toBalance: toAccount.balance
        };
    }
}
// Usage Example
class FinancialSystemDemo {
    static run() {
        console.log("=== Financial System Demo ===\n");

        // Create a bank
        const myBank = new Bank("Global Finance Bank");

        // Open different types of accounts
        const savings1 = myBank.openAccount(
            'savings',
            'SAV001',
            'John Doe',
            5000,
            0.03  // 3% interest
        );

        const checking1 = myBank.openAccount(
            'checking',
            'CHK001',
            'John Doe',
            2000,
            1000  // $1000 overdraft
        );

        const investment1 = myBank.openAccount(
            'investment',
            'INV001',
            'Jane Smith',
            10000,
            0.05,  // 5% interest
            'High' // Risk level
        );

        // Helper to format accounts for console.table
        const formatAccountForTable = acc => ({
            accountNumber: acc.accountNumber,
            accountHolder: acc.accountHolder,
            accountType: acc.accountType || acc.constructor.name,
            balance: Number(acc.balance).toFixed(2),
            interestRate: acc.interestRate ? (acc.interestRate * 100).toFixed(2) + '%' : '',
            overdraftLimit: acc.overdraftLimit ? Number(acc.overdraftLimit).toFixed(2) : '',
            riskLevel: acc.riskLevel || '',
            investments: acc.investments ? acc.investments.length : 0
        });

        console.log("1. Initial Account Setup:");
        console.table([
            formatAccountForTable(savings1),
            formatAccountForTable(checking1),
            formatAccountForTable(investment1)
        ]);
        console.log("\n");

        // Demonstrate transactions
        console.log("2. Performing Transactions:");

        // Savings account operations
        savings1.deposit(1000, "Salary");
        console.log(`After deposit: ${savings1.displayInfo()}`);
        console.table(savings1.transactions);

        try {
            savings1.withdraw(4900); // Should fail due to minimum balance
        } catch (error) {
            console.log(`Savings withdrawal failed: ${error.message}`);
        }
        // Show transactions again (no withdrawal should have been recorded)
        console.table(savings1.transactions);

        // Checking account with overdraft
        const withdrawalResult = checking1.withdraw(2500);
        console.log(`Checking withdrawal: New balance: $${checking1.balance.toFixed(2)}, Fee: $${withdrawalResult.feeCharged}`);
        console.table(checking1.transactions);

        // Investment account
        investment1.addInvestment("Tech Stocks", 3000, 0.10);
        console.log(`Investment portfolio value: $${investment1.getPortfolioValue().toFixed(2)}`);
        console.table(investment1.investments);

        console.log("\n");

        // Demonstrate interest calculation
        console.log("3. Interest Calculation:");
        console.table([
            { account: savings1.accountNumber, monthlyInterest: Number(savings1.calculateInterest()).toFixed(2) },
            { account: investment1.accountNumber, monthlyInterest: Number(investment1.calculateInterest()).toFixed(2) }
        ]);

        // Apply all interests
        console.log("\n4. Applying Monthly Interests:");
        const interestReport = myBank.applyMonthlyInterests();
        // Show as table for clearer output
        console.table(interestReport.map(r => ({
            account: r.account,
            interest: Number(r.interest).toFixed(2),
            newBalance: Number(r.newBalance).toFixed(2)
        })));

        console.log("\n");

        // Demonstrate transfer
        console.log("5. Account Transfer:");
        const transferResult = myBank.transfer('SAV001', 'CHK001', 500);
        console.log(`Transfer successful: From balance $${transferResult.fromBalance.toFixed(2)}, To balance $${transferResult.toBalance.toFixed(2)}`);

        // Show updated account summary
        console.log("\nUpdated accounts:");
        console.table(myBank.accounts.map(formatAccountForTable));

        console.log("\n");

        // Generate final report
        console.log("6. Bank Summary Report:");
        console.log(myBank.generateReport());

        // Demonstrate polymorphism
        console.log("7. Polymorphism Example - All accounts using displayInfo():");
        console.table(myBank.accounts.map(acc => ({ account: acc.accountNumber, info: acc.displayInfo() })));
    }
}

// Run the demo
FinancialSystemDemo.run();