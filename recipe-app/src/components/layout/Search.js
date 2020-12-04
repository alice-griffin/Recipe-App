import React, { useState, useEffect } from "react";

export default function Search({ apiUrl, setHomePageResults, setSearchItem }) {


    const submitFormHandler = (e) => {
        e.preventDefault();
        fetch(apiUrl)
            .then((res) => res.json())
            .then((result) => {
                setHomePageResults(result);
            });
    }


    return (
        <div className="Search">
            <form onSubmit={submitFormHandler} className="search-form">
                <input
                    type="text"
                    placeholder="Search Recipes"
                    onChange={event => setSearchItem(event.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    );
}
