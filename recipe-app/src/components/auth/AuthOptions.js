import React, { useContext } from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from './UserContext';

export default function AuthOptions() {

    const history = useHistory();

    const register = () => {
        history.push("/register");
    }

    const login = () => {
        history.push("/login");
    }

    return (
        <nav className="auth-buttons">
            <button onClick={login}>LOGIN</button>
            <button onClick={register}>REGISTER</button>
        </nav>
    )
}