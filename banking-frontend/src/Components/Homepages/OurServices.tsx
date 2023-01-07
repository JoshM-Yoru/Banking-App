import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Container = styled.div`
    height: fit-content;
    padding-top: 40px;
    color: ${props => props.theme.altText};
`;
const ServicesTitle = styled.h2`
    letter-spacing: 2px;
    font-size: 2em;
    padding-left: 5%;
    padding-bottom: 20px;
    height: fit-content;
`;
const AccordionWrapper = styled.div`
    width: 90%;
    padding-left: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const AccordionItem = styled.div`
    color: ${props => props.theme.altText};
`;
const AccordionHeader = styled.h2`
    border-bottom: 1px solid ${props => props.theme.border};
    padding: 5px;
    display: flex;
`;
const AccordionButton = styled.button<{ accordionIndex: boolean }>`
    border: none;
    background-color: transparent;
    width: 100%;
    text-align: left;
    font-size: 1em;
    cursor: pointer;
    /* color: ${props => props.theme.altText}; */
    color: ${props => (props.accordionIndex ? props.theme.color : props.theme.altText)};
`;
const AccordionContentWrapper = styled.div<{ accordionIndex: boolean }>`
    overflow: hidden;
    padding: 5px;
    height: ${props => (props.accordionIndex ? "fit-content" : "0px")};
    transition: height 1s;
`;
const AccordionContent = styled.div`
    padding: 5px;
`;

const OurServices = () => {
    const [activeAccordion, setActiveAccordion] = useState<number>(0);

    const handleActiveItem = (n: number) => {
        if (n === activeAccordion) {
            setActiveAccordion(0);
        } else {
            setActiveAccordion(n);
        }
    };

    return (
        <Container>
            <ServicesTitle>Our Services</ServicesTitle>
            <AccordionWrapper>
                <AccordionItem>
                    <AccordionHeader onClick={() => handleActiveItem(1)}>
                        <AccordionButton accordionIndex={activeAccordion === 1}>Checking Accounts</AccordionButton>
                        <AccordionButton accordionIndex={activeAccordion === 1} style={{ textAlign: "right" }}>
                            {activeAccordion === 1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </AccordionButton>
                    </AccordionHeader>
                    <AccordionContentWrapper accordionIndex={activeAccordion === 1}>
                        <AccordionContent>
                            GoodBank's checking accounts offer a variety of benefits including no
                            monthly fees, free online and mobile banking, a free debit card,
                            overdraft protection, and competitive interest rates. They are a
                            convenient and cost-effective way to manage your money.
                        </AccordionContent>
                    </AccordionContentWrapper>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader onClick={() => handleActiveItem(2)}>
                        <AccordionButton accordionIndex={activeAccordion === 2}>Savings Accounts</AccordionButton>
                        <AccordionButton accordionIndex={activeAccordion === 2} style={{ textAlign: "right" }}>
                            {activeAccordion === 2 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </AccordionButton>
                    </AccordionHeader>
                    <AccordionContentWrapper accordionIndex={activeAccordion === 2}>
                        <AccordionContent>
                            GoodBank's savings accounts offer competitive interest rates, no
                            minimum balance requirements, easy access to your money, FDIC insurance,
                            and convenient account management. They are a simple and effective way
                            to grow your savings.
                        </AccordionContent>
                    </AccordionContentWrapper>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader onClick={() => handleActiveItem(3)}>
                        <AccordionButton accordionIndex={activeAccordion === 3}>Credit Accounts</AccordionButton>
                        <AccordionButton accordionIndex={activeAccordion === 3} style={{ textAlign: "right" }}>
                            {activeAccordion === 3 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </AccordionButton>
                    </AccordionHeader>
                    <AccordionContentWrapper accordionIndex={activeAccordion === 3}>
                        <AccordionContent>
                            GoodBank's credit accounts offer competitive interest rates, flexible
                            payment options, rewards programs, fraud protection, and customer
                            service. They are a convenient and cost-effective way to borrow money
                            and make purchases.
                        </AccordionContent>
                    </AccordionContentWrapper>
                </AccordionItem>
            </AccordionWrapper>
        </Container>
    );
};

export default OurServices;
