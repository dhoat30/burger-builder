import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux'; 
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    componentWillUpdate(){
            console.log('order summary updated')
    }
    render(){

        const ingredientsSummary = Object.keys(this.props.ingredients)
    .map(igKey=>{
        return <li>{igKey}: {this.props.ingredients[igKey]}</li>
    }) 
   
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>    
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>Continue</Button>

            </Aux>
        )
        }
}

export default OrderSummary; 