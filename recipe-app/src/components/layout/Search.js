import React, {useState} from 'react';


export default function Search (props) {


    const getSearchItem = (e) => {
        let searchItem = e.target.value
        return searchItem; 
    }

    const handleSubmit = (event) => {
        event.preventDefault(); 
        props.getData(); 
    }

    return (
        <div className="Search">

            <form onSubmit={handleSubmit} className="search-form">
            <input type="text" placeholder="Search Recipes" onChange={getSearchItem}/>
            <button>Submit</button>
            </form>

        </div>
    )
}