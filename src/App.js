import React, { Component } from 'react';
import Navbar from './component/navbar';
import './support/css/bootstrap.css';
import './App.css';
import {Route} from 'react-router-dom';
import Homepage from './component/homepage';
import {connect} from 'react-redux';
import Cookies from "universal-cookie";
import {keepLogin,cookieChecked} from './actions';
import {withRouter} from 'react-router-dom';
import Managemovies from './component/managemovies';
import ManageCategories from './component/managecategories';
import ManageConnect from './component/manageconn';


const cookies = new Cookies();
class App extends Component {
  render() {
      return (
        <div>
          <Navbar/>
          
          <Route exact path='/' component={Homepage}/>
          <Route path='/managemovies' component={Managemovies}/>
          <Route path='/managecategories' component={ManageCategories}/>
          <Route path='/connectmovies' component={ManageConnect}/>
       
          
        </div>
      );
    
  }
}
const mapStateToProps =(state)=>{
  return {
      cookie: state.auth.cookie
  };
}
export default withRouter(connect(mapStateToProps, {keepLogin,cookieChecked})(App));


