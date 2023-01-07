import { Account } from "./Account";

export interface Transaction {
    transactionId: number;
    type: string;
    accountId: string;
    message: string;
    amount: number;
    date: string;
    account: Account;
}
