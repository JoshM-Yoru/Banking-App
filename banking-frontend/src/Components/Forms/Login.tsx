import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../Context/UserContext";
import { UserContextState } from "../../Interfaces/User";
import { useNavigate } from "react-router";

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

const initInputs = {
    email: "",
    password: "",
    token: "",
    newPassword_1: "",
    newPassword_2: "",
};

const Login = () => {
    const [inputs, setInputs] = useState(initInputs);

    const { loginUser, showResetPassScreen, showAuthScreen, setLoading } = useContext(
        UserContext
    ) as UserContextState;
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleLoginFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = inputs;
        setLoading(true);

        loginUser(email, password);
        navigate("/login/reset_password");
    };
    return (
        <Container>
            {!showAuthScreen && !showResetPassScreen && (
                <Form onSubmit={handleLoginFormSubmit}>
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" name="email" id="email" onChange={handleInputChange} />
                    <Label htmlFor="password_login">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleInputChange}
                    />
                    <SubmitButton type="submit" value="Log In" />
                </Form>
            )}
        </Container>
    );
};

export default Login;
