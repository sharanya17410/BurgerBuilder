import React,{Component} from 'react'
//import claases from './Order.css'
import {connect} from 'react-redux'
import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import * as actions from '../../store/actions/index'
import withErrorHandler from '../../withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component {
//   state = {
//       orders: [],
//       loading: true
//   }

  componentDidMount() {
      this.props.onFetchOrders(this.props.token);
    //   axios.get('/orders.json')
    //       .then(res => {
    //           const fetchedOrders = [];
    //           for (let key in res.data) {
    //               fetchedOrders.push({
    //                   ...res.data[key],
    //                   id: key
    //               });
    //           }
    //           this.setState({loading: false, orders: fetchedOrders});
    //       })
    //       .catch(err => {
    //           this.setState({loading: false});
    //       });
  }

  render () {
    let orders = <Spinner />;
    if ( !this.props.loading ) {
        orders = this.props.orders.map( order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        ) )
    }
    return (
        <div>
            {orders}
        </div>
    );
}
}
const mapStateToProps=state=>{
    return {
        orders:state.orders.orders,
        loading:state.orders.loading,
        token:state.auth.token
    }
}

const mapDispatchToProps=dispatch =>{
    return{
        onFetchOrders:(token)=>dispatch(actions.fetchOrders(token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));