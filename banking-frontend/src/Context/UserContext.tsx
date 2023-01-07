import React, { useState } from "react";
import { useNavigate } from "react-router";
import { User, UserContextState } from "../Interfaces/User";
import { ProviderProps } from "../Interfaces/ProviderProps";
import { axInst } from "../Util/axInstance";

export const UserContext = React.createContext<UserContextState | null>(null);

export const initUser = {
    userId: "",
    type: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    accounts: [],
    creditCard: [],
    firstLogin: true,
};

const UserProvider: React.FC<ProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User>(initUser);
    const [userData, setUserData] = useState<User>(initUser);
    const [firstLogin, setFirstLogin] = useState<boolean>(false);
    const [showAuthScreen, setShowAuthScreen] = useState<boolean>(false);
    const [showResetPassScreen, setShowResetPassScreen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const loginUser = async (email: string, password: string) => {
        try {
            const thisUser = await axInst.post("/users/login", { email, password });
            setLoading(false);
            setUserData(thisUser.data);
            setShowResetPassScreen(thisUser.data.firstLogin);
            setShowAuthScreen(true);
            !thisUser.data.firstLogin && navigate("/login/authenticate");
        } catch (e) {
            console.log(e);
            navigate("/invalid");
        }
    };

    const resetPassword = async (email: string, password: string) => {
        try {
            await axInst.put("/users/reset-password", {
                email,
                password,
            });
        } catch (e) {
            console.log(e);
        }
    };

    const authenticateUser = async (email: string, token: string) => {
        try {
            await axInst.post("/users/authenticate", {
                email,
                token,
            });
            setCurrentUser(userData);
        } catch (e) {
            console.log(e);
        }
    };

    const logoutUser = async () => {
        const { email } = currentUser;

        try {
            await axInst.put("/users/logout", { email });
            setCurrentUser(initUser);
            setUserData(initUser);
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };

    const getBankAccounts = async () => {
        const { userId, email } = currentUser;

        try {
            const { data: accounts } = await axInst.post("/accounts/account", {
                userId,
            });

            const { data: creditCard } = await axInst.post("/credit-card/user", {
                email,
            });
            setCurrentUser({ ...currentUser, accounts: accounts, creditCard: creditCard });

            const allAccounts = [accounts, [creditCard]];

            return allAccounts;
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <UserContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                loginUser,
                resetPassword,
                authenticateUser,
                logoutUser,
                getBankAccounts,
                firstLogin,
                setShowAuthScreen,
                showResetPassScreen,
                showAuthScreen,
                loading,
                setLoading,
                userData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
