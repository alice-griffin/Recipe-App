import Axios from 'axios';
import React, { useState, useContext } from 'react';
import UserContext from './UserContext';
import { useHistory } from 'react-router-dom';
import Error from '../layout/Error';

export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);

    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

    try {
        const loggedIn = { email, password }
        const loginResponse = await Axios.post("http://localhost:5000/users/login", loggedIn);
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

    return (
        <div className="Login">
            <h1>Sign in here.</h1>
            <div className="form-section">
            {error && (
                    <Error message={error}/>
                )} 
                <form onSubmit={submit} className="login-form">

                    <label htmlFor="login-email">Email</label>
                    <input id="login-email" type="email" onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="login-pass">Password</label>
                    <input id="login-pass" type="password" onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    )
}