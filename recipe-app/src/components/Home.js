import React, {useEffect, useContext, useState, Component} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../components/auth/UserContext';
import Recipes from './layout/Recipes';
import Search from './layout/Search';

export default function Home () {

    const APP_ID = "b039279c";
    const APP_KEY = "28417beb70b66327a7e477cdae532ab0";

    const [homePageResults, setHomePageResults] = useState("");
    const [searchItem, setSearchItem] = useState("christmas");

    const apiUrl = `https://api.edamam.com/search?q=${searchItem}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((result) => {
                setHomePageResults(result);
            });
    }, []);

    const {userData} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!userData.user) {
            history.push("/login");
            console.log(userData.user)
        }
    }, [])

    return (
        <div className="Home">
        <Search apiUrl={apiUrl} searchItem={searchItem} setSearchItem={setSearchItem} homePageResults={homePageResults} setHomePageResults={setHomePageResults} />
        <Recipes homePageResults={homePageResults} />
        </div>
    )
    
    }