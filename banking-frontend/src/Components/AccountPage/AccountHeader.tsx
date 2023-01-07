import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    background: ${props => props.theme.primaryMed};
    border-radius: ${props => props.theme.borderRadius};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 1rem;
`;
const Title = styled.h1`
    font-size: ${props => props.theme.fontSize.h1};
    color: white;
`;
const Button = styled.button`
    padding: 0.25rem 3.5rem;
    font-size: ${props => props.theme.fontSize.h2};
    color: white;
    background: ${props => props.theme.primaryLight};
    border-radius: ${props => props.theme.borderRadius};
    border: 2px solid white;
    cursor: pointer;
`;

type AccountHeaderPropTypes = {
    title: string;
    btnTitle: string | undefined;
    btnLink: string | undefined;
};

const AccountHeader: React.FC<AccountHeaderPropTypes> = ({ title, btnTitle, btnLink }) => {
    return (
        <Container>
            <Title>{title}</Title>
            {btnTitle !== undefined && (
                <Link to={`${btnLink}`}>
                    <Button>{btnTitle}</Button>
                </Link>
            )}
        </Container>
    );
};

export default AccountHeader;
