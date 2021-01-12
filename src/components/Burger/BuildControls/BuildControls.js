import React from 'react';
import classes from './BuildControl.module.css';
import BuildControl from './BuildControl/BuildControl'; 
let controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'}, 
    {label: 'Meat', type:'meat'}
];

const buildControls = (props) => {
   
    return ( 
        <div className={classes.BuildControls}>
            <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
            {
                controls.map(cont=> (
                    <BuildControl 
                    key={cont.label} 
                    label={cont.label}
                    added = {()=> props.ingredientAdded(cont.type)}
                    removed = {()=> props.removeIngredients(cont.type)}
                    disabled = {props.disabled[cont.type]}
                    ></BuildControl>
                ))
            }

            <button 
            disabled={!props.purchasable} 
            className={classes.OrderButton}
            onClick={props.ordered}
            >Order Now</button>
        </div>
    )
}

export default buildControls; 