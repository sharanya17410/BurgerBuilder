import React,{Component} from 'react';
import axios from '../../axios-orders'
import Aux from '../../hoc/Auxilliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../withErrorHandler/withErrorHandler'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component{
    state={
         
         purchasing : false
        ,loading : false
        ,error : false
    }
    componentDidMount(){
        // axios.get('https://react-my-burger-2ab99.firebaseio.com/ingredients')
        //       .then(response=>{
        //           console.log(response);
        //           this.setState({ingredients:response.data});
        //       }).catch(error=>{
        //           console.log(error);
        //           this.setState({error:true});
        //     });
    }
    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    
    purchaseContinueHandler=()=>{
        this.props.history.push('/checkout');
        // const queryParams=[];
        // for(let i in this.props.ings){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // const queryString=queryParams.join('&');
        // this.props.history.push({
        //     pathname:'/checkout',
        // search : '?'+queryString});
        //alert('You continue !!');
        // this.setState({loading:true});
        // const order={
        //     ingredients : this.props.ings,
        //     price : this.state.totalPrice,
        //     customer : {
        //         name: 'Sharanya',
        //         address: {
        //             street: '5762 W',
        //             zipCode : '34344',
        //             country: 'United States'
        //         },
        //         email: 'test@gmail.com',
        //         deliveryMethod : 'fastest'
        //     }
        // }
        // axios.post('/orders.json',order)
        // .then(response=>{
        //     console.log(response);
        //     this.setState({loading:false,purchasing:false});
        // })
        // .catch(error=>{
        //     console.log(error);
        //     this.setState({loading:false,purchasing:false});
        // });
        
    }
    updatePurchaseState(ingredients){
        // const ingredients={
        //     ...this.props.ings
        // };
        const sum=Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        console.log('Sum:'+sum);
        // if(sum > 0)
        // this.setState({purchaseable:true});
        // else
        // this.setState({purchaseable:false});
        return sum>0;
    }
    render(){
        const disable={
            ...this.props.ings
        }

        for(let key in disable){
            disable[key]= disable[key]<=0;
        }
        let orderSummary=null;
        
       
        let burger= this.state.error ? <p>Ingredients cant be loaded !</p> : <Spinner/>;
        if(this.props.ings){
         burger =(
            <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded} 
                    ingredientRemoved={this.props.onIngredientRemoved} 
                    disabled={disable}
                    price={this.props.price}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
        orderSummary=<OrderSummary ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        price={this.props.price}/>;
        if(this.state.loading){
            orderSummary=<Spinner/>;
        } 
    }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStatetoProps=(state)=>{
    return{
        ings:state.ingredients,
        price:state.totalPrice
    };
};
const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded : (ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
        onIngredientRemoved : (ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})

    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));