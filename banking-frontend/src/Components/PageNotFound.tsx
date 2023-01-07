import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../Context/UserContext";
import { UserContextState } from "../Interfaces/User";

const Container = styled.div`
    width: 100%;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid black;
`;
const Title = styled.h1``;

const PageNotFound = () => {
    const { getBankAccounts, currentUser, showResetPassScreen, showAuthScreen } = useContext(UserContext) as UserContextState;
    console.log(currentUser, "current user")
    console.log(showResetPassScreen, "resetpass");
    console.log(showAuthScreen, "authscreen");

    return (
        <Container>
            <Title>Page Not Found</Title>
        </Container>
    );
};

export default PageNotFound;
