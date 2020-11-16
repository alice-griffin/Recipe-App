import React from 'react';
import { Link } from 'react-router-dom';


export default function Recipe(props) {


    return (
        <div className="Recipe">
          <h4 className="recipe-label">{props.recipe.recipe.label}</h4>
          <Link to={`/details/${props.recipe.recipe.label}`}><img src={props.recipe.recipe.image}/></Link>
          {props.recipe.recipe.healthLabels.map(i => <small>{i} </small>)}
        </div>
    )
}