import React, { useEffect, useState } from "react";


export default function Recipes({ homePageResults }) {

    console.log(homePageResults)

    return (
        <div className="Recipes">
            {homePageResults ? <div className="Recipes">
                {homePageResults.hits.map((item) => (
                    <div className="recipe">{item.recipe.label}</div>
                ))}
            </div> : <div>Loading...</div>}
        </div>
    );
};
