import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AccountContext } from "../../Context/AccountContext";
import { UserContext } from "../../Context/UserContext";
import { Account, AccountContextState } from "../../Interfaces/Account";
import { UserContextState } from "../../Interfaces/User";
import CreateAccount from "../AccountPage/CreateAccount";
import TransferFunds from "../AccountPage/TransferFunds";
import { axInst } from "../../Util/axInstance";

const Container = styled.div``;

const MemberHome: React.FC = () => {
    const { setCurrentAccount } = useContext(AccountContext) as AccountContextState;
    const { setCurrentUser, currentUser } = useContext(UserContext) as UserContextState;

    const getAccounts = async () => {
        const { userId } = currentUser;

        try {
            const { data: accounts } = await axInst.post<Account[]>("/accounts/account", {
                userId,
            });

            setCurrentUser({ ...currentUser, accounts });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAccounts();
    }, []);

    return (
        <Container>
            <CreateAccount />
            {currentUser?.accounts?.map(a => {
                return (
                    <Link to={`/${a.type}`} onClick={() => setCurrentAccount(a)}>
                        <div>{a.type}</div>
                        <div>{a.accountId}</div>
                        <div>{a.balance}</div>
                    </Link>
                );
            })}
            <TransferFunds />
        </Container>
    );
};

export default MemberHome;
