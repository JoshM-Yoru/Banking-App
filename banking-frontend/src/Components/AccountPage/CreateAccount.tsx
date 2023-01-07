import React, { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { UserContextState } from "../../Interfaces/User";
import { axInst } from "../../Util/axInstance";

const CreateAccount = () => {
    const [accountType, setAccountType] = useState<String>("");
    const [balance, setBalance] = useState<number>(0.0);
    const { currentUser } = useContext(UserContext) as UserContextState;

    const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "accountType") {
            setAccountType(value);
        } else {
            setBalance(+value);
        }
    };

    const createAccountHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { data } = await axInst.post("/accounts/create", {
            account: {
                accountType,
                currentUser,
                balance,
            },
        });
    };

    return (
        <>
            <h1>Create A New Account</h1>
            <form onSubmit={createAccountHandler}>
                <select name="accountType" id="accountType" onChange={handleFormChange}>
                    <option value="Checking">Checking</option>
                    <option value="Savings">Savings</option>
                </select>
                <input
                    type="number"
                    step="0.01"
                    name="startBalance"
                    id="startBalance"
                    placeholder={`${balance}`}
                    onChange={handleFormChange}
                />
                <button type="submit">Create Account</button>
            </form>
        </>
    );
};

export default CreateAccount;
