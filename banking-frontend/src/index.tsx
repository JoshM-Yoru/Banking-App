import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserProvider from "./Context/UserContext";
import { BrowserRouter } from "react-router-dom";
import AccountProvider from "./Context/AccountContext";
import DarkModeProvider from "./Context/DarkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <DarkModeProvider>
                <UserProvider>
                    <AccountProvider>
                        <App />
                    </AccountProvider>
                </UserProvider>
            </DarkModeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
