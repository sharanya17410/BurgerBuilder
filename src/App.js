import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'
import {Route,Switch,withRouter} from 'react-router-dom'
import Checkout from './containers/checkout/checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux'
import * as actions from './store/actions/index'

class App extends Component{

  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render(){
    return(
      <div>
        <Layout>
          <Switch>
              <Route path="/checkout" component={Checkout}></Route>
              <Route path="/orders" exact component={Orders}></Route>
              <Route path="/auth"  component={Auth}></Route>
              <Route path="/logout"  component={Logout}></Route>
              <Route path="/" exact component={BurgerBuilder}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
  
}

const mapStateDispatchToProps=dispatch=>{
  return{
    onTryAutoSignup :()=> dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(null,mapStateDispatchToProps)(App));
