import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AccountContext } from "../../Context/AccountContext";
import { UserContext } from "../../Context/UserContext";
import { AccountContextState } from "../../Interfaces/Account";
import { UserContextState } from "../../Interfaces/User";

const Container = styled.div`
    border: 2px solid ${props => props.theme.primaryDark};
    border-radius: ${props => props.theme.borderRadius};
    margin: 1rem 0;
`;
const Top = styled.div`
    display: flex;
    & a {
        text-decoration: none;
    }
`;
const AccountName = styled.p`
    font-size: ${props => props.theme.fontSize.h1};
    font-weight: bold;
    margin: 0.25rem 1rem;
    color: ${props => props.theme.color};
`;
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    background: ${props => props.theme.primaryLightest};
`;
const Data = styled.p`
    font-size: ${props => props.theme.fontSize.h2};
    font-weight: bold;
    margin-left: 1rem;
    color: ${props => props.theme.primaryDark};
    margin: 1rem 0 0.5rem 1rem;
`;

type AccountBoxPropTypes = {
    name: string;
    balance: number;
    accountId: string;
};

const AccountBox: React.FC<AccountBoxPropTypes> = ({ name, balance, accountId }) => {
    const { setCurrentAccountId, setCurrentAccount, currentTransactions } = useContext(
        AccountContext
    ) as AccountContextState;
    const { currentUser } = useContext(UserContext) as UserContextState;

    const handleAccountUpdate = () => {
        setCurrentAccount({
            accountId: accountId,
            type: name,
            user: currentUser,
            balance: balance,
            transactions: currentTransactions,
        });
    };

    return (
        <Container>
            <Top>
                <Link
                    style={{ flex: "1" }}
                    to={`/accounts/${name.toLowerCase()}`}
                    onClick={handleAccountUpdate}
                >
                    <AccountName>{name}</AccountName>
                </Link>
                <AccountName>Account #: {accountId}</AccountName>
            </Top>
            <Bottom>
                <Data>Available: ${balance}</Data>
                <Data>Current: ${balance}</Data>
                <Data />
            </Bottom>
        </Container>
    );
};

export default AccountBox;
