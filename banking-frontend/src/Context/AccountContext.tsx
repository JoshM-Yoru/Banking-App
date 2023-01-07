import React, { useState } from "react";
import { Account, AccountContextState } from "../Interfaces/Account";
import { ProviderProps } from "../Interfaces/ProviderProps";
import { initUser } from "./UserContext";
import { Transaction } from "../Interfaces/Transaction";

export const AccountContext = React.createContext<AccountContextState | null>(null);

const initAccount = {
    accountId: "",
    type: "",
    user: initUser,
    balance: 0,
    transactions: [],
};

const AccountProvider: React.FC<ProviderProps> = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState<Account>(initAccount);
    const [currentAccountId, setCurrentAccountId] = useState<string>("");
    const [currentTransactions, setCurrentTransactions] = useState<Transaction[]>([]);

    return (
        <AccountContext.Provider
            value={{
                currentAccount,
                setCurrentAccount,
                currentAccountId,
                setCurrentAccountId,
                currentTransactions,
                setCurrentTransactions,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
