import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'
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
    let routes =(
      <Switch>
        <Route path="/auth"  component={Auth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to ="/"/>
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes=(
        <Switch>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/orders" exact component={Orders}></Route>        
            <Route path="/logout"  component={Logout}></Route>     
            <Route path="/" exact component={BurgerBuilder}></Route>
            <Redirect to ="/"/>
        </Switch>
      );
    }
    return(
      <div>
        <Layout>
          {routes}
              
          
        </Layout>
      </div>
    );
  }
  
}

const mapStateToProps=state=>{
  return {
    isAuthenticated : state.auth.token !==null
  };
}

const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignup :()=> dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
