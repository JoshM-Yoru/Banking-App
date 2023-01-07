import React, { useState } from "react";
import styled from "styled-components";
import { axInst } from "../../Util/axInstance";

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100%;
    color: ${(props) => props.theme.color};
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
    border: 1px solid ${(props) => props.theme.border};
    color: ${(props) => props.theme.color};
    padding: 5px;
    outline: none;
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

const initInputs = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    accountType: "",
};

const Register: React.FC = () => {
    const [inputs, setInputs] = useState(initInputs);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axInst.post("/users/register", inputs);

            setInputs(initInputs);
            alert("New User Registered. New Member Should Receive A Text Message With Their Temporary Password")
        } catch (e) {
            console.log(e, "this is the error");
        }
    };

    return (
        <Container>
            <Form onSubmit={handleFormSubmit}>
                <Label>First Name:</Label>
                <Input
                    type="text"
                    name="firstName"
                    value={inputs.firstName}
                    onChange={handleFormChange}
                ></Input>
                <Label>Last Name:</Label>
                <Input
                    type="text"
                    name="lastName"
                    value={inputs.lastName}
                    onChange={handleFormChange}
                ></Input>
                <Label>Email:</Label>
                <Input
                    type="text"
                    name="email"
                    value={inputs.email}
                    onChange={handleFormChange}
                ></Input>
                <Label>Phone Number:</Label>
                <Input
                    type="text"
                    name="phoneNumber"
                    value={inputs.phoneNumber}
                    onChange={handleFormChange}
                ></Input>
                <Label>Address:</Label>
                <Input
                    type="text"
                    name="address"
                    value={inputs.address}
                    onChange={handleFormChange}
                ></Input>
                <Label>Checking, Savings, or Both:</Label>
                <Input
                    type="text"
                    name="accountType"
                    value={inputs.accountType || ""}
                    onChange={handleFormChange}
                ></Input>
                <SubmitButton type="submit" value="Register Member" />
            </Form>
        </Container>
    );
};

export default Register;
