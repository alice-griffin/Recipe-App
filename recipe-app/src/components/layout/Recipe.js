import React from 'react';


export default function Recipe(props) {

    console.log(props.recipe.recipe.label);

    return (
        <div className="Recipe">
          <h4>{props.recipe.recipe.label}</h4>
        </div>
    )
}