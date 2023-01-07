import React, { useState } from "react";
import { DarkModeContextState } from "../Interfaces/DarkMode";
import { ProviderProps } from "../Interfaces/ProviderProps";

export const DarkModeContext = React.createContext<DarkModeContextState>({
    mode: "",
    toggleDarkMode: () => {},
});

const DarkModeProvider: React.FC<ProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<string>("Light");

    const toggleDarkMode = () => {
        if (localStorage.getItem("Mode") === "Light") {
            localStorage.setItem("Mode", "Dark");
            setMode("Dark");
        } else {
            localStorage.setItem("Mode", "Light");
            setMode("Light");
        }
    };

    return (
        <DarkModeContext.Provider value={{ mode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;
