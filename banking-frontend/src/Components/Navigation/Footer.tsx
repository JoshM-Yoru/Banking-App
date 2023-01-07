import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GBLogo_Dark from "../../Assets/GoodBank-Logo_Dark.png";
import { DarkModeContext } from "../../Context/DarkModeContext";
import { DarkModeContextState } from "../../Interfaces/DarkMode";
import GBLogo_White from "../../Assets/GoodBank-Logo_White.png";

const Container = styled.div`
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: space-evenly;
    border-top: 1px solid ${(props) => props.theme.border};
    border-radius: ${(props) => props.theme.borderRadius};
    background: ${(props) => props.theme.body};
    color: ${(props) => props.theme.color};
`;
const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Data = styled.p`
    margin: 0.15rem;
    font-weight: bold;
`;
const Logo = styled.img`
    width: 10rem;
`;

const Footer = () => {
    const { mode } = useContext(DarkModeContext) as DarkModeContextState;

    return (
        <Container>
            <Box>
                <Data>Oakdale, NY</Data>
                <Data>Meadowbrook, PA</Data>
                <Data>Silverlake, NJ</Data>
            </Box>
            <Link to="/">
                {mode === "Light" ? (
                    <Logo
                        src={GBLogo_Dark}
                        alt="Black GoodBank logo with mountains"
                    />
                ) : (
                    <Logo
                        src={GBLogo_White}
                        alt="Black GoodBank logo with mountains"
                    />
                )}
            </Link>
            <Box>
                <Data>(888)-888-8888</Data>
            </Box>
        </Container>
    );
};

export default Footer;
