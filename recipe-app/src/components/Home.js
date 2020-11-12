import React, {useEffect, useContext, useState, Component} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../components/auth/UserContext';
import Axios from 'axios';
import Recipes from './layout/Recipes';

export default function Home () {

    const APP_ID = "b039279c";
    const APP_KEY = "28417beb70b66327a7e477cdae532ab0";

    const {userData} = useContext(UserContext);
    const history = useHistory();
    const [result, setResult] = useState([]);
    const [searchItem, setSearchItem] = useState("");

    const getSearchItem = (e) => {
        setSearchItem(e.target.value);
        console.log(searchItem);
    }

    const apiUrl = `https://api.edamam.com/search?q=${searchItem}&app_id=${APP_ID}&app_key=${APP_KEY}`

    const handleSubmit = (event) => {
        event.preventDefault(); 
        getData(); 
    }


    const getData = async () => {
        const response = await Axios.get(apiUrl);
        setResult(response);
    }

    useEffect(() => {
        if (!userData.user) {
            history.push("/login");
        }
    }, [userData])

    return (
        <div className="Home">
            <form onSubmit={handleSubmit} className="search-form">
            <input type="text" placeholder="Search Recipes" onChange={getSearchItem}/>
            <button>Submit</button>
            </form>
        <Recipes result={result}/>
        </div>
    )
    
    }