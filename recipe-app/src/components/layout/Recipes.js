import React, { Component } from 'react';
import Recipe from './Recipe';


export default function Recipes(props) {

    const recipes = props.result.data.hits;
    console.log(recipes)

    return (
        <div className="Recipes">
          {recipes.map(recipe => (
              <Recipe recipe={recipe} />
          ))}
        </div>
    )
}