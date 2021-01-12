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
const INGREDIENTS_PRICE = { 
    salad: 0.5, 
    cheese: 0.4, 
    bacon: 0.7, 
    meat: 1.3
}

class BurgerBuilder extends Component{
    state = { 
        ingredients: null, 
        totalPrice: 4, 
        purchasable: false, 
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
        this.setState({purchasable: sum>0}); 
    }
    addIngredientHandler = (type)=>{
        let oldCount = this.state.ingredients[type];
        let updatedCount = oldCount + 1; 

        let updatedIngredients = {...this.state.ingredients}; 

        updatedIngredients[type] = updatedCount; 

        const priceAddition = INGREDIENTS_PRICE[type]; 
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition; 


       this.setState({
           totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.purchaseUpdate(updatedIngredients);
    }

    removeIngredientHandler = (type)=>{
        let oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        let updatedCount = oldCount - 1; 

        let updatedIngredients = {...this.state.ingredients}; 

        updatedIngredients[type] = updatedCount; 

        const priceDeduction = INGREDIENTS_PRICE[type]; 
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction; 

    
       this.setState({
           totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.purchaseUpdate(updatedIngredients);
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
       
        const queryParams= []; 
        
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+ this.state.totalPrice );
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout', 
            search: '?'+queryString
        }); 
    }

    render(){
        const disabledInfo = {...this.state.ingredients}; 
        for(let key in disabledInfo){ 
            disabledInfo[key] = disabledInfo[key]<=0;
        }

        let orderSummary; 
        let burger = this.state.error ? <p>ingredients did not load</p> : <Spinner/>
        if(this.state.loader){
            orderSummary =  <Spinner/>;
        }
        if(this.state.ingredients){
            orderSummary= <OrderSummary 
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}/>; 

                burger = <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                removeIngredients={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
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

export default  withErrorHandler(BurgerBuilder, axios); 