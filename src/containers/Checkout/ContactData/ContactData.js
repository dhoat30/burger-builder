import React, { Component } from 'react'
import classes from './ContactData.module.css'; 
import Button from '../../../components/UI/Button/Button'; 
import Spinner from '../../../components/UI/Spinner/Spinner'; 
import axios from '../../../axios-order'; 
import Input from '../../../components/UI/Input/Input';
import { element, elementType } from 'prop-types';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input', 
                elementConfig: {
                    type:'text', 
                    placeholder: 'Your Name'
                }, 
                value:'', 
                validation:{
                    required: true
                }, 
                valid: false
            }, 
            street: {
                elementType: 'input', 
                elementConfig: {
                    type:'text', 
                    placeholder: 'Your Address'
                },
                value:'', 
                validation:{
                    required: true
                }, 
                valid: false
            }, 
            country: {
                elementType: 'input', 
                elementConfig: {
                    type:'text', 
                    placeholder: 'Country'
                }, 
                value:'', 
                validation:{
                    required: true
                }, 
                valid: false
            },
            postCode:  {
                elementType: 'input', 
                elementConfig: {
                    type:'text', 
                    placeholder: 'Post Code'
                },
                value:'', 
                validation:{
                    required: true, 
                    minLength: 5, 
                    maxLength: 5
                }, 
                valid: false
            },
            email: {
                elementType: 'input', 
                elementConfig: {
                    type:'email', 
                    placeholder: 'Your Email'
                },
                value:'', 
                validation:{
                    required: true
                }, 
                valid: false
            },
            delivery:  {
                elementType: 'select', 
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'}, 
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value:''
            }
        }, 
        loader: false
    }
    orderHandler = (event) =>{
        event.preventDefault();
       let formData = {}; 

       for(let formIdentifier in this.state.orderForm){
           formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
       }
        this.setState({
            loader: true
        })
        const order = {
            ingredients: this.props.ingredients, 
            price: this.props.price, 
            formData
            
        };

        axios.post('/order.json', order)
        .then((response)=> {
            console.log('added to database')
            this.setState({
                loader: false, 
                purchasing: false
            })
            this.props.history.push('/');
        })
        .catch((error)=> {
            this.setState({
                loader: false, 
                purchasing: false
            })
        });
    }

    validityCheck =(value, rules)=>{
        let isValid = true; 

        if(rules.required){
            isValid = value.trim() !== '' && isValid; 
        }
        if(rules.required){
            isValid = value.length <= rules.maxLength && isValid;
        }
        if(rules.required){
            isValid = value.length >= rules.maxLength && isValid;
        }
        return isValid;
    }
    
    inputChangeHandler = (event, name)=>{
        let updatedForm = {
            ...this.state.orderForm
        }; 
        let updatedFormElement = {
            ...updatedForm[name]
        }
        updatedFormElement.value= event.target.value; 
        updatedForm[name] = updatedFormElement; 
        
        updatedFormElement.valid = this.validityCheck(updatedFormElement.value, updatedFormElement.validation);
        console.log(updatedFormElement)
        this.setState({orderForm: updatedForm})

    }
    render() {
        let elementForm = []; 
        let form = ''; 
        for(let key in this.state.orderForm){
            elementForm.push({
                id: key, 
                config: this.state.orderForm[key]
            })
        }
        if(this.state.loader){
            form = <Spinner></Spinner>
        }
        else{
            form =<form onSubmit= {this.orderHandler}>

                {elementForm.map(ele=>{
                    return <Input changed={(event)=>{this.inputChangeHandler(event, ele.id)}} elementType={ele.config.elementType} elementConfig={ele.config.elementConfig} value={ele.config.value} />;
                })}
            
            
            <Button btnType="Success"> Order</Button>
            </form>; 
        }
         

 
        return (
            <div className={classes.ContactData}>
                <h4> Enter Your Contact Details</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;