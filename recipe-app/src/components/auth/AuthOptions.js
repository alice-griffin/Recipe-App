import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from './UserContext';

export default function AuthOptions() {

    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();

    const register = () => {
        history.push("/register");
    }

    const login = () => {
        history.push("/login");
    }

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
    }

    return (
        <nav className="auth-buttons">
            {userData.user ?
                (<button onClick={logout}>LOG OUT</button>) :
                (<div>
                    <button onClick={login}>LOGIN</button>
                    <button onClick={register}>SIGN UP</button>
                </div>)
            }
        </nav>
    )
}