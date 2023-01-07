import React from 'react'
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
    color: ${props => props.theme.color};
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const SubmitButton = styled.input`
    margin: 10px;
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme.background};
    border: 1px solid ${(props) => props.theme.primaryMed};
    border-radius: ${(props) => props.theme.borderRadius};
    font-weight: bold;
    font-size: 1.5em;
    color: ${(props) => props.theme.color};
    outline: none;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.primaryMed};
        box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.4);
        color: white;
    }
`;

const Invalid = () => {

    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    }

    return (
        <Container>
            <Wrapper>
                Invalid Email or Password, Please try again.
                <SubmitButton type="submit" value="Try Again" onClick={goToLogin} />
            </Wrapper>
        </Container>
    )
}

export default Invalid
