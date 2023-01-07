import { User } from "./User";
import { Transaction } from "./Transaction";

export interface Account {
    accountId: string;
    type: string;
    user: User;
    balance: number;
    transactions: Transaction[];
}

export interface AccountContextState {
    currentAccount: Account;
    setCurrentAccount: (account: Account) => void;
    currentAccountId: string;
    setCurrentAccountId: (accountId: string) => void;
    currentTransactions: Transaction[];
    setCurrentTransactions: (transactions: Transaction[]) => void;
}

export interface CreditCard {
    accountId: string;
    type: string;
    user: User;
    balance: number;
    transactions: Transaction[];
    creditLimit: number;
}
