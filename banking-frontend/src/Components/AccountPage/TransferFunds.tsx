import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../Context/UserContext";
import { UserContextState } from "../../Interfaces/User";
import { axInst } from "../../Util/axInstance";
import AccountHeader from "./AccountHeader";

const TransferForm = styled.form``;
const TransferContainer = styled.div`
    border: 2px solid ${props => props.theme.primaryDark};
    border-radius: ${props => props.theme.borderRadius};
    margin: 1rem 0;
    padding: 1rem;
`;
const TransferBox = styled.div`
    border: 2px solid ${props => props.theme.primaryDark};
    border-radius: ${props => props.theme.borderRadius};
    margin-bottom: 1rem;
`;
const Top = styled.div``;
const BoxTitle = styled.p`
    font-size: ${props => props.theme.fontSize.h1};
    font-weight: bold;
    margin: 0.25rem 1rem;
    color: ${props => props.theme.primaryDark};
`;
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    background: ${props => props.theme.primaryLight};
`;
const Data = styled.p`
    font-size: ${props => props.theme.fontSize.h2};
    font-weight: bold;
    margin-left: 1rem;
    color: ${props => props.theme.primaryDark};
    margin: 1rem 0 0.5rem 1rem;
`;
const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
`;
const AmountBox = styled.div`
    border: 2px solid ${props => props.theme.primaryDark};
    border-radius: ${props => props.theme.borderRadius};
`;
const DateBox = styled.div`
    border: 2px solid ${props => props.theme.primaryDark};
    border-radius: ${props => props.theme.borderRadius};
`;
const SubmitButton = styled.input`
    margin: 0.5rem;
    padding: 0.5rem;
    background-color: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.primaryMed};
    border-radius: ${props => props.theme.borderRadius};
    font-weight: bold;
    font-size: 1.5em;
    color: ${props => props.theme.color};
    outline: none;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.theme.primaryMed};
        box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.4);
        color: white;
    }
`;
const AccountSelect = styled.select`
    margin: 0.5rem;
    border: 2px solid white;
    border-radius: 5px;
    background: transparent;
    padding: 0.25rem;
    font-weight: bold;
    font-size: 1.1rem;
    color: ${props => props.theme.color};
`;
const AmountInput = styled.input`
    margin: 0.5rem;
    background: transparent;
    border-radius: 3px;
    border: 1px solid ${props => props.theme.color};
`;
const DateInput = styled.input`
    background: transparent;
    outline: none;
`;
const Option = styled.option`
    display: flex;
    justify-content: space-between;
`;

const initInputs = {
    accountIdFrom: "",
    accountIdTo: "",
    amount: 0,
};

const TransferFunds = () => {
    const [fromSelectValue, setFromSelectValue] = useState<string>("Choose Account");
    const [toSelectValue, setToSelectValue] = useState<string>("Choose Account");
    const [balanceFrom, setBalanceFrom] = useState<number>(0);
    const [balanceTo, setBalanceTo] = useState<number>(0);
    const [inputs, setInputs] = useState(initInputs);
    const { currentUser } = useContext(UserContext) as UserContextState;

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        const thisAccount = currentUser.accounts.filter(a => a.type === value);

        if (name === "accountIdFrom") {
            setFromSelectValue(value);
            setBalanceFrom(thisAccount[0].balance);
            setInputs(prev => ({ ...prev, [name]: thisAccount[0].accountId }));
            return;
        }

        if (name === "accountIdTo") {
            setToSelectValue(value);
            setBalanceTo(thisAccount[0].balance);
            setInputs(prev => ({ ...prev, [name]: thisAccount[0].accountId }));
            return;
        }

        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axInst.post("/accounts/transfer", inputs);
            setInputs(initInputs);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <AccountHeader
                title="Make a Transfer"
                btnTitle="Account Summary"
                btnLink="/accounts/summary"
            />
            <TransferForm onSubmit={handleFormSubmit}>
                <TransferContainer>
                    <TransferBox>
                        <Top>
                            <BoxTitle>Source Account</BoxTitle>
                        </Top>
                        <Bottom>
                            <AccountSelect
                                name="accountIdFrom"
                                id="accountIdFrom"
                                onChange={handleInputChange}
                                defaultValue={fromSelectValue}
                            >
                                <option disabled>Choose Account</option>
                                {currentUser?.accounts.map(a => (
                                    <Option key={a.accountId}>{a.type}</Option>
                                ))}
                            </AccountSelect>
                            <Data>Balance: ${balanceFrom}</Data>
                        </Bottom>
                    </TransferBox>
                    <TransferBox>
                        <Top>
                            <BoxTitle>Destination Account</BoxTitle>
                        </Top>
                        <Bottom>
                            <AccountSelect
                                name="accountIdTo"
                                id="accountIdTo"
                                onChange={handleInputChange}
                                defaultValue={toSelectValue}
                            >
                                <option disabled>Choose Account</option>
                                {currentUser?.accounts.map(a => (
                                    <Option key={a.accountId}>{a.type}</Option>
                                ))}
                            </AccountSelect>
                            <Data>Balance: ${balanceTo}</Data>
                        </Bottom>
                    </TransferBox>
                    <Container>
                        <AmountBox>
                            <Top>
                                <BoxTitle>Enter Amount</BoxTitle>
                            </Top>
                            <Bottom>
                                <label htmlFor="amount" />
                                <AmountInput
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    name="amount"
                                    id="amount"
                                    onChange={handleInputChange}
                                />
                            </Bottom>
                        </AmountBox>
                        <DateBox>
                            <Top>
                                <BoxTitle>Select Date</BoxTitle>
                            </Top>
                            <Bottom>
                                <label htmlFor="date" />
                                <DateInput type="date" name="date" id="date" />
                            </Bottom>
                        </DateBox>
                        <SubmitButton type="submit" value="submit" />
                    </Container>
                </TransferContainer>
            </TransferForm>
        </>
    );
};

export default TransferFunds;
