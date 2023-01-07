import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height: fit-content;
    padding-top: 40px;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;
const AboutTitle = styled.h2`
    letter-spacing: 2px;
    font-size: 2em;
    padding-left: 5%;
    padding-bottom: 20px;
    height: fit-content;
`;
const InfoWrapper = styled.div`
    display: flex;
    height: 100%;
`;
const InfoTitle = styled.div`
    width: 75%;
    padding-bottom: 5px;
    font-weight: bold;
`;
const ListWrapper = styled.div`
    height: fit-content;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const InfoFirst = styled.div`
    padding: 8px 12px;
    width: 75%;
    border: 1px solid ${(props) => props.theme.border};
    border-radius: 5px 5px 0 0;
`;
const Info = styled.div`
    padding: 8px 12px;
    width: 75%;
    border-bottom: 1px solid ${(props) => props.theme.border};
    border-left: 1px solid ${(props) => props.theme.border};
    border-right: 1px solid ${(props) => props.theme.border};
`;
const InfoLast = styled.div`
    padding: 8px 12px;
    width: 75%;
    border-bottom: 1px solid ${(props) => props.theme.border};
    border-left: 1px solid ${(props) => props.theme.border};
    border-right: 1px solid ${(props) => props.theme.border};
    border-radius: 0 0 5px 5px;
`;

const AboutUs = () => {
    return (
        <Container>
            <Wrapper>
                <AboutTitle>About Us</AboutTitle>
                <InfoWrapper>
                    <ListWrapper>
                        <InfoTitle>Hours:</InfoTitle>
                        <InfoFirst>Monday: 10am - 5pm</InfoFirst>
                        <Info>Tuesday: 10am - 5pm</Info>
                        <Info>Wednesday: 10am - 5pm</Info>
                        <Info>Thursday: 10am - 5pm</Info>
                        <Info>Friday: 10am - 5pm</Info>
                        <InfoLast>Saturday: 10am - 3pm</InfoLast>
                    </ListWrapper>
                    <ListWrapper>
                        <InfoTitle>Locations:</InfoTitle>
                        <InfoFirst>Oakdale, New York</InfoFirst>
                        <Info>MeadowBrook, Pennsylvania</Info>
                        <InfoLast>Silverlake, New Jersey</InfoLast>
                    </ListWrapper>
                </InfoWrapper>
            </Wrapper>
        </Container>
    );
};

export default AboutUs;
