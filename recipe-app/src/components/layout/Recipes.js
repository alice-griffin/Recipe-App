import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';

export default function Recipes(props) {

    let recipes = []; 

    const validateRecipes = () => {
        if (props.result.data === undefined) {
            recipes = [];
        } else {
            recipes = props.result.data.hits;
        }
    }

    validateRecipes()

    console.log(recipes)

    return (
        <div className="Recipes">
          {recipes && recipes.map(recipe => (
              <Recipe recipe={recipe} />
          ))}
        </div>
    )
}