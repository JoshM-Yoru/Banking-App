import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AccountContextState } from "../../Interfaces/Account";
import { AccountContext } from "../../Context/AccountContext";
import AccountHeader from "./AccountHeader";
import AccountBox from "./AccountBox";
import { axInst } from "../../Util/axInstance";
import { Transaction } from "../../Interfaces/Transaction";

const FilterBox = styled.div`
    border: 2px solid ${props => props.theme.primaryDark};
    border-radius: ${props => props.theme.borderRadius};
`;
const FilterTitle = styled.h3`
    text-align: center;
    margin: 2rem;
`;
const Table = styled.table`
    border: 2px solid ${props => props.theme.primaryDark};
    border-radius: ${props => props.theme.borderRadius};
    border-collapse: collapse;
    margin: 1rem 0;
    width: 100%;
`;
const TH = styled.th`
    border: 2px solid ${props => props.theme.primaryDark};
    border-collapse: collapse;
    text-align: left;
    color: ${props => props.theme.primaryDark};
    padding: 0.25rem;
`;
const TD = styled.td``;

const AccountHistory: React.FC = () => {
    const { currentAccount, currentAccountId, setCurrentTransactions, currentTransactions } = useContext(
        AccountContext
    ) as AccountContextState;

    const getAccountTransactions = async () => {
        try {
            const { data: transactions } = await axInst.get(
                `/transactions/account/${currentAccount.accountId}`
            );
            console.log(transactions);
            setCurrentTransactions(transactions);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAccountTransactions();
    }, []);

    return (
        <>
            <AccountHeader
                title="Account History"
                btnTitle="Account Summary"
                btnLink="/accounts/summary"
            />
            <AccountBox
                name={currentAccount.type}
                balance={currentAccount.balance}
                accountId={currentAccount.accountId}
            />
            <FilterBox>
                <FilterTitle>Filter Options</FilterTitle>
            </FilterBox>
            <Table>
                <thead>
                    <tr>
                        <TH scope="column">Date</TH>
                        <TH scope="column">Description</TH>
                        <TH scope="column">Amount</TH>
                        <TH scope="column">Type</TH>
                    </tr>
                </thead>
                <tbody>
                    {currentTransactions?.map(t => {
                        return (
                            <>
                                <tr key={t.account.accountId}>
                                    <TD>{t.date}</TD>
                                    <TD>{t.message}</TD>
                                    <TD>${t.amount}</TD>
                                    <TD>{t.type}</TD>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
};

export default AccountHistory;
