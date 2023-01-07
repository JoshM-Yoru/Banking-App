import { useState, useContext, useMemo, useEffect } from "react";
import styled from "styled-components";
import AccountHeader from "./AccountHeader";
import AccountBox from "./AccountBox";
import { UserContext } from "../../Context/UserContext";
import { UserContextState } from "../../Interfaces/User";
import { Account, CreditCard } from "../../Interfaces/Account";
import CreditCardBox from "./CreditCardBox";

const Container = styled.div`
    border: 2px solid ${props => props.theme.primaryMed};
    border-radius: ${props => props.theme.borderRadius};
    margin-top: 1.5rem;
    padding: 1rem;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const Accounts = styled.div``;
const SummaryFooter = styled.div`
    background: ${props => props.theme.primaryMed};
    border-radius: ${props => props.theme.borderRadius};
`;
const FooterData = styled.h1`
    font-size: ${props => props.theme.fontSize.h1};
    color: white;
    padding: 0 1rem;
`;

const AccountSummary = () => {
    const [bankAccounts, setBankAccounts] = useState<Account[]>([]);
    const [creditCard, setCreditCard] = useState<CreditCard[]>([]);
    const [totalBalance, setTotalBalance] = useState<number>(0);
    const { getBankAccounts, currentUser } = useContext(UserContext) as UserContextState;

    useEffect(() => {
        getBankAccounts().then(accounts => {
            console.log(accounts);
            accounts[0] ? setBankAccounts(accounts[0]) : setBankAccounts([]);
            accounts[1] ? setCreditCard(accounts[1]) : setCreditCard([]);
        });
    }, []);

    useMemo(
        () => currentUser.accounts?.forEach(ba => setTotalBalance(prev => prev + ba.balance)),
        []
    );

    return (
        <>
            <AccountHeader
                title="Account Summary"
                btnTitle="Make a Transfer"
                btnLink="/accounts/transfer"
            />
            <Container>
                <Accounts>
                    {bankAccounts.map(ba => {
                        return (
                            <AccountBox
                                key={ba.accountId}
                                name={ba.type}
                                balance={ba.balance}
                                accountId={ba.accountId}
                            />
                        );
                    })}
                </Accounts>
                <Accounts>
                    {creditCard[0] &&
                        creditCard.map(cc => {
                            return (
                                <CreditCardBox
                                    key={cc.creditLimit}
                                    creditLimit={cc.creditLimit}
                                    balance={cc.balance}
                                />
                            );
                        })}
                </Accounts>
                <SummaryFooter>
                    <FooterData>Balance Total: $ {totalBalance}</FooterData>
                </SummaryFooter>
            </Container>
        </>
    );
};

export default AccountSummary;
