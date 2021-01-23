import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/OrderCheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom';
import {connect } from 'react-redux'; 
 class Checkout extends Component {
  
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/" />; 

        if(this.props.ings){
            summary = <div>
            <CheckoutSummary 
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinue={this.checkoutContinuedHandler}
            ingredients={this.props.ings}/>
            <Route path={this.props.match.path + '/contact-data'} 
            component={ContactData}/>

        </div>; 
        }

        return summary;
    }
}
const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients
    }
}
export default connect(mapStateToProps)(Checkout); 

