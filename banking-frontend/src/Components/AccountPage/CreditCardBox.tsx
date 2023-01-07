import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    border: 2px solid ${props => props.theme.primaryDark};
    border-radius: ${props => props.theme.borderRadius};
    margin: 1rem 0;
`;
const Top = styled.div`
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

type CreditCardBoxPropTypes = {
    creditLimit: number;
    balance: number;
};

const CreditCardBox: React.FC<CreditCardBoxPropTypes> = ({ creditLimit, balance }) => {
    return (
        <Container>
            <Top>
                <Link to={`/accounts/${creditLimit}`}>
                    <AccountName>CREDIT CARD</AccountName>
                </Link>
            </Top>
            <Bottom>
                <Data>Available: ${balance}</Data>
                <Data>Credit Limit: ${creditLimit}</Data>
                <Data />
            </Bottom>
        </Container>
    );
};

export default CreditCardBox;
