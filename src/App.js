import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'
import {Route,Switch} from 'react-router-dom'
import Checkout from './containers/checkout/checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
class App extends Component{
  render(){
    return(
      <div>
        <Layout>
          <Switch>
              <Route path="/checkout" component={Checkout}></Route>
              <Route path="/orders" exact component={Orders}></Route>
              <Route path="/auth"  component={Auth}></Route>
              <Route path="/" exact component={BurgerBuilder}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
  
}

export default App;
