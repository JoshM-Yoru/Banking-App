import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../Context/UserContext";
import { UserContextState } from "../../Interfaces/User";
import { axInst } from "../../Util/axInstance";
import AccountHeader from "../AccountPage/AccountHeader";

const Container = styled.div``;
const ApplicationForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const SectionHeader = styled.div`
    padding: 0.5em;
    background-color: ${props => props.theme.background};
    border-radius: 3px 3px 0 0;
    font-weight: bold;
    color: ${props => props.theme.color};
`;
const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid ${props => props.theme.primaryMed};
    border-radius: ${props => props.theme.borderRadius};
    margin-top: 1.5rem;
    /* padding: 1rem; */
    justify-content: space-between;
    background: ${props => props.theme.primaryLightest};
    color: ${props => props.theme.primaryDark};
`;
const InputWrapper = styled.div`
    display: flex;
    /* padding-block: 0.2em; */
    padding: 0.5em;
`;
const Label = styled.label`
    font-weight: bold;
    padding-right: 0.5em;
`;
const Input = styled.input`
    background: transparent;
    border: 1px solid ${props => props.theme.primaryDark};
    border-radius: ${props => props.theme.borderRadius};
    padding-inline: 5px;
    outline: none;
    margin-left: 0.5em;
`;
const FinalSection = styled.div`
    display: flex;
`;
const SubmitButton = styled.button`
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    background-color: ${props => props.theme.background};
    border: 2px solid ${props => props.theme.primaryMed};
    border-radius: ${props => props.theme.borderRadius};
    font-weight: bold;
    font-size: 2em;
    color: ${props => props.theme.color};
    outline: none;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.theme.primaryMed};
        box-shadow: inset 0 0 5px 1px rgba(255, 255, 255, 0.4);
        color: white;
    }
`;
const InvalidApp = styled.div`
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    background-color: ${props => props.theme.background};
    font-weight: bold;
    font-size: 2em;
    color: ${props => props.theme.color};
    outline: none;
    cursor: pointer;
`;

const CreditCardApplication = () => {
    const { currentUser } = useContext(UserContext) as UserContextState;

    const initInputs = {
        netWorth: "",
        monthlyIncome: "",
        carPayment: "",
        rent: "",
        totalMiscPayments: "",
        totalCCLimits: "",
        age: "",
        creditScore: "",
        hasCC: "",
        over15: "",
        userId: currentUser.userId,
    };

    const [inputs, setInputs] = useState(initInputs);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInputs({ ...inputs, userId: currentUser.userId });

        try {
            if (parseInt(inputs.age) < 16) {
                alert(
                    "You are not allowed to submit an application as you need to be 16 years of age or older"
                );
                throw new Error("You can not submit an application");
            }
            await axInst.post("/credit-card-app/create", inputs);

            setInputs(initInputs);

            alert("Application Submitted! Check Your Accounts Page To See If You Were Approved!");
        } catch (e) {
            console.log(e, "this is the error");
        }
    };

    return (
        <>
            <AccountHeader
                title="Credit Card Application"
                btnTitle={undefined}
                btnLink={undefined}
            />
            <Container>
                <ApplicationForm onSubmit={handleFormSubmit}>
                    <SectionWrapper>
                        <SectionHeader>Basic Questions</SectionHeader>
                        <InputWrapper>
                            <Label style={{ flex: 1 }}>
                                Do you have a GoodBank credit card already?
                            </Label>
                            <Input
                                type="radio"
                                id="yes"
                                name="hasCC"
                                value="yes"
                                onChange={handleFormChange}
                            />
                            <Label htmlFor="yes">Yes</Label>
                            <Input
                                type="radio"
                                id="no"
                                name="hasCC"
                                value="no"
                                onChange={handleFormChange}
                            />
                            <Label htmlFor="no">No</Label>
                        </InputWrapper>
                        <InputWrapper>
                            <Label style={{ flex: 1 }}>Are you 16 years of age or older?</Label>
                            <Input
                                type="radio"
                                id="yes"
                                name="over15"
                                value="yes"
                                onChange={handleFormChange}
                            />
                            <Label htmlFor="yes">Yes</Label>
                            <Input
                                type="radio"
                                id="no"
                                name="over15"
                                value="no"
                                onChange={handleFormChange}
                            />
                            <Label htmlFor="no">No</Label>
                        </InputWrapper>
                    </SectionWrapper>
                    {inputs.hasCC === "yes" || inputs.over15 === "no" ? (
                        <InvalidApp>
                            Sorry, but you do not qualify to submit an application.
                        </InvalidApp>
                    ) : (
                        <>
                            <SectionWrapper>
                                <SectionHeader>Income Information</SectionHeader>
                                <InputWrapper>
                                    <Label>Total Net Worth:</Label>${" "}
                                    <Input
                                        type="text"
                                        name="netWorth"
                                        value={inputs.netWorth}
                                        placeholder="0.00"
                                        style={{ flex: 1 }}
                                        onChange={handleFormChange}
                                    />
                                </InputWrapper>
                                <InputWrapper>
                                    <Label>Monthly Income:</Label>${" "}
                                    <Input
                                        type="text"
                                        name="monthlyIncome"
                                        value={inputs.monthlyIncome}
                                        placeholder="0.00"
                                        style={{ flex: 1 }}
                                        onChange={handleFormChange}
                                    />
                                </InputWrapper>
                            </SectionWrapper>
                            <SectionWrapper>
                                <SectionHeader>Debt Information</SectionHeader>
                                <InputWrapper>
                                    <Label>Monthly Car Payment</Label>${" "}
                                    <Input
                                        type="text"
                                        name="carPayment"
                                        value={inputs.carPayment}
                                        placeholder="0.00"
                                        style={{ flex: 1 }}
                                        onChange={handleFormChange}
                                    />
                                </InputWrapper>
                                <InputWrapper>
                                    <Label>Monthly Rent/Mortgage:</Label>${" "}
                                    <Input
                                        type="text"
                                        name="rent"
                                        value={inputs.rent}
                                        placeholder="0.00"
                                        style={{ flex: 1 }}
                                        onChange={handleFormChange}
                                    />
                                </InputWrapper>
                                <InputWrapper>
                                    <Label>Sum All Other Monthly Debt Payments:</Label>${" "}
                                    <Input
                                        type="text"
                                        name="totalMiscPayments"
                                        value={inputs.totalMiscPayments}
                                        placeholder="0.00"
                                        style={{ flex: 1 }}
                                        onChange={handleFormChange}
                                    />
                                </InputWrapper>
                                <InputWrapper>
                                    <Label>Sum All Other Monthly Credit Card Limits:</Label>${" "}
                                    <Input
                                        type="text"
                                        name="totalCCLimits"
                                        value={inputs.totalCCLimits}
                                        placeholder="0.00"
                                        style={{ flex: 1 }}
                                        onChange={handleFormChange}
                                    />
                                </InputWrapper>
                            </SectionWrapper>
                            <FinalSection>
                                <SectionWrapper style={{ flex: 1, marginRight: "1em" }}>
                                    {/* <SectionHeader>Enter DOB:</SectionHeader> */}
                                    {/* <InputWrapper> */}
                                    {/*     <Input */}
                                    {/*         type="date" */}
                                    {/*         name="dob" */}
                                    {/*         value={inputs.dob} */}
                                    {/*         style={{ flex: 1, color: "#154481" }} */}
                                    {/*         onChange={handleFormChange} */}
                                    {/*     /> */}
                                    {/* </InputWrapper> */}
                                    <SectionHeader>Enter Age:</SectionHeader>
                                    <InputWrapper>
                                        <Input
                                            type="text"
                                            name="age"
                                            value={inputs.age}
                                            style={{
                                                flex: 1,
                                                color: "#154481",
                                            }}
                                            placeholder="16"
                                            onChange={handleFormChange}
                                        />
                                    </InputWrapper>
                                </SectionWrapper>
                                <SectionWrapper style={{ flex: 1 }}>
                                    <SectionHeader>Enter FICO Score</SectionHeader>
                                    <InputWrapper>
                                        <Input
                                            type="text"
                                            name="creditScore"
                                            value={inputs.creditScore}
                                            placeholder="0-850"
                                            style={{ flex: 1 }}
                                            onChange={handleFormChange}
                                        />
                                    </InputWrapper>
                                </SectionWrapper>
                            </FinalSection>
                            <SubmitButton>SUBMIT</SubmitButton>
                        </>
                    )}
                </ApplicationForm>
            </Container>
        </>
    );
};

export default CreditCardApplication;
