import Axios from 'axios';
import React, { useState, useContext } from 'react';
import UserContext from './UserContext';
import { useHistory } from 'react-router-dom';
import Error from '../layout/Error';

export default function Register() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [username, setUsername] = useState();
    const [error, setError] = useState("");

    const { setUserData } = useContext(UserContext);

    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try {
        const newUser = { email, password, passwordCheck, username };
        await Axios.post("http://localhost:5000/users/register", newUser);
        const loginResponse = await Axios.post("http://localhost:5000/users/login", {email, password});
        setUserData({
            token: loginResponse.data.token,
            user: loginResponse.data.user
        });
        localStorage.setItem("auth-token", loginResponse.data.token);
        history.push("/");
    } catch (error) {
        error.response.data.msg && setError(error.response.data.msg)
    }
    }

    const clearError = () => {
        setError(undefined);
    }

    return (
        <div className="Register">
            <h1 className="get-started">Sign up here.</h1>
            <div className="form-section">
                {error && (
                    <Error message={error}/>
                )} 
                <form onSubmit={submit} className="register-form">
                    <label htmlFor="register-email">Email</label>
                    <input id="register-email" type="email" onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="register-username">Username</label>
                    <input id="register-username" type="text" onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="register-pass">Password</label>
                    <input id="register-pass" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="verify-pass">Verify Password</label>
                    <input id="verify-pass" type="password" onChange={(e) => setPasswordCheck(e.target.value)} />
                    <button onClick={clearError} type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}