import React from "react";
import styled from "styled-components";
import AboutUs from "./AboutUs";
import OurServices from "./OurServices";
import DarkLogo from '../../Assets/GoodBank-Logo_Dark.png'

const Container = styled.div`
    height: 100%;
    color: ${props => props.theme.altText}
`;
const Wrapper = styled.div`
    height: 100%;
    width: 100%;
`;
const TopWrapper = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
`;
const WelcomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-inline: 5%;
    padding-block: 2%;
    width: 50%;
    height: 100%;
    justify-content: center;
    flex: 1;
`;
const WelcomeTitle = styled.h1`
    letter-spacing: 2px;
    font-size: 2.5em;
    margin-bottom: 15px;
`;
const WelcomeParagraph = styled.p`
    letter-spacing: 1px;
    margin-bottom: 10px;
    width: 100%;
    font-size: 1.2em;
`;
const ImageWrapper = styled.div`
    width: 50%;
    height: fit-content;
    display: flex;
    justify-content: center;
    padding-top: 2%;
`;
const Image = styled.img`
    width: 50%;
    height: auto;
`;
const BottomWrapper = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
`;
const ServicesWrapper = styled.div`
    width: 50%;
`;
const AboutWrapper = styled.div`
    width: 50%;
`;

const WelcomePage: React.FC = () => {
    return (
        <Container>
            <Wrapper>
                <TopWrapper>
                    <WelcomeWrapper>
                        <WelcomeTitle>Welcome to GoodBank!</WelcomeTitle>
                        <WelcomeParagraph>
                            We're more than just any other bank, we're family
                            helping families!
                        </WelcomeParagraph>
                        <WelcomeParagraph>
                            We are glad you are here. At GoodBank, we pride
                            ourselves on offering top-quality financial services
                            to our customers. Whether you are looking for a
                            checking account, a credit card, a loan, or
                            investment opportunities, we have something for
                            everyone. Our team of dedicated professionals is
                            here to help you achieve your financial goals. Thank
                            you for choosing GoodBank. We look forward to
                            serving you.
                        </WelcomeParagraph>
                    </WelcomeWrapper>
                    <ImageWrapper>
                        <Image src={DarkLogo} />
                    </ImageWrapper>
                </TopWrapper>
                <BottomWrapper>
                    <ServicesWrapper>
                        <OurServices />
                    </ServicesWrapper>
                    <AboutWrapper>
                        <AboutUs />
                    </AboutWrapper>
                </BottomWrapper>
            </Wrapper>
        </Container>
    );
};

export default WelcomePage;
