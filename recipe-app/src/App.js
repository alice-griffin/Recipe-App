import React, { useState, useEffect } from "react";
import './App.css';
import "./components/style.css";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register'
import Header from './components/layout/Header'
import UserContext from './components/auth/UserContext';
import SingleRecipe from './components/layout/SingleRecipe'


function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      //when you visit for the first time, the auth token won't exist and will be null
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await Axios.post("http://localhost:5000/users/tokenIsValid", null,
        {
          headers: { 'x-auth-token': token }
        });
      if (tokenResponse.data) {
        const userResponse = await Axios.get("http://localhost:5000/users/",
          {
            headers: { "x-auth-token": token }
          });
          setUserData({
            token,
            user: userResponse.data
          });
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route patch="/details/label" component={SingleRecipe}></Route>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
