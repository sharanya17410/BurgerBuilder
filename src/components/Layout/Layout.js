import React,{Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer'
import {connect} from 'react-redux'
class Layout extends Component{
    state={
        showSideDrawer:true
    };
    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer};
        });
    }
    render(){
        return(
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>  
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
    

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token!==null
    };
};
export default connect(mapStateToProps)(Layout);

