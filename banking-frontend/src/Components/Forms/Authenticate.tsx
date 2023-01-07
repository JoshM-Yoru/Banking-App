import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { UserContext } from "../../Context/UserContext";
import { UserContextState } from "../../Interfaces/User";

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
    color: ${props => props.theme.color};
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const Label = styled.label`
    margin: 3px;
`;
const Input = styled.input`
    margin: 10px;
    background: transparent;
    border: 1px solid ${props => props.theme.border};
    color: ${props => props.theme.color};
    padding: 5px;
    outline: none;
`;
const SubmitButton = styled.input`
    margin: 10px;
    display: flex;
    justify-content: center;
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

const Authenticate = () => {
    const { authenticateUser, showAuthScreen, userData } = useContext(
        UserContext
    ) as UserContextState;

    const initInputs = {
        email: userData.email,
        password: "",
        token: "",
        newPassword_1: "",
        newPassword_2: "",
    };

    const [inputs, setInputs] = useState(initInputs);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleAuthFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, token } = inputs;

        await authenticateUser(email, token);
        setInputs(initInputs);

        navigate("/accounts/summary");
    };

    if (!showAuthScreen) {
        return <Container />;
    }

    console.log(userData);

    return (
        <Container>
            <Form onSubmit={handleAuthFormSubmit}>
                <Label htmlFor="token">Enter Twilio Passcode</Label>
                <Input type="text" name="token" id="token" onChange={handleInputChange} />
                <SubmitButton type="submit" value="Submit Passcode" />
            </Form>
        </Container>
    );
};

export default Authenticate;
