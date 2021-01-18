import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'; 
import Modal from '../../components/UI/Modals/Modals';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import aux from '../../hoc/Aux/Aux';
import {connect} from 'react-redux'; 
import * as actionType from '../../store/action'; 


class BurgerBuilder extends Component{
    state = { 
        purchasing: false, 
        loader: false, 
        error: false
    }
   
    //load burger 
    componentWillMount(){
        axios.get('/ingredients.json')
        .then(res => {
            console.log(res); 
            this.setState({ingredients: res.data})
        })
        .catch(error=>{
          this.setState({error: true})
        })
    }
    purchaseUpdate(ingredients){ 
        let sum = Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        })
        .reduce((sum,el)=>{
            return sum+el; 
        })
        return sum>0; 
    }
    



    purchaseHandler = ()=> { 
        this.setState(
            {purchasing: true}
            );
    }
    purchaseCancelHandler = ()=> { 
        this.setState(
            {purchasing: false}
            );
    }

    purchaseContinueHandler =()=> {
        this.props.history.push({
            pathname: '/checkout', 
        }); 
    }

    render(){
        const disabledInfo = {...this.props.ings}; 
        for(let key in disabledInfo){ 
            disabledInfo[key] = disabledInfo[key]<=0;
        }

        let orderSummary; 
        let burger = this.state.error ? <p>ingredients did not load</p> : <Spinner/>
        if(this.state.loader){
            orderSummary =  <Spinner/>;
        }
        if(this.props.ings){
            orderSummary= <OrderSummary 
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                ingredients={this.props.ings}
                price={this.props.price}/>; 

                burger = <Aux>
                    <Burger ingredients={this.props.ings}/>
                <BuildControls 
                ingredientAdded={this.props.onIngredientAdded}
                removeIngredients={this.props.onIngredientRemove}
                disabled={disabledInfo}
                price={this.props.price}
                purchasable={this.purchaseUpdate(this.props.ings)}
                ordered ={this.purchaseHandler}
                ></BuildControls>
                </Aux>

        }

        return(
            <Aux>
                <Modal 
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}
                >
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients, 
        price: state.totalPrice
        }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName)=> dispatch({type: actionType.ADD_INGREDIENT, ingredientName: ingName}), 
        onIngredientRemove: ()=> (ingName)=> dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios)); 