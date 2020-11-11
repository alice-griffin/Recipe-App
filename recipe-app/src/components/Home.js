import React, {useEffect, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../components/auth/UserContext';
import Axios from 'axios';
import Search from './layout/Search';

export default function Home() {

    const {userData} = useContext(UserContext);
    const history = useHistory();

    const APP_ID = "b039279c";
    const APP_KEY = "28417beb70b66327a7e477cdae532ab0";
    const apiUrl = `https://api.edamam.com/search?q=pizza&app_id=${APP_ID}&app_key=${APP_KEY}`

    const getData = async () => {
        const result = await Axios.get(apiUrl);
        console.log(result)
    }

    useEffect(() => {
        if (!userData.user) {
            history.push("/login");
        }
    }, [userData])

    return (
        <div className="Home">
        <Search getData={getData} />
        </div>
    )
}