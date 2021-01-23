import React from 'react'; 
import classes from './Order.module.css'; 

function Order(props) {
    const ingredients = []; 
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName, 
            amount: props.ingredients[ingredientName]
        })
    }
    let ingredientOutput = ingredients.map(ig=>{
        return(
            <span style={{
                textTransform:'capitalize', 
                 display: 'inline-block', 
                margin: '0 8px', 
                padding:'5px',
                border: '1px solid #eee'}}>{ig.name} {ig.amount}</span>
        )
    })
    return (
        <div className={classes.Order}>
            <h1> { ingredients}</h1>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: <strong>NZD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order

