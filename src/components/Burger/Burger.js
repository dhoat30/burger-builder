import React from 'react'; 
import classes from './Burger.module.css'; 
import BurgerIngredient from './Burgeringredients/BurgerIngredient'; 

const burger = (props) => {

    let transformsIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i)=> { //here igkey is passes to get the value of ingredients
            return <BurgerIngredient 
            key={igKey + i}
            type={igKey}/>
        })
    }).reduce((arr, el)=> { 
        return arr.concat(el);
    }, []); 

    if(transformsIngredients.length === 0){
        transformsIngredients = 'please start adding ingredients'
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformsIngredients}
            <BurgerIngredient type='bread-bottom'/>

        </div>
    )
}
export default burger; 