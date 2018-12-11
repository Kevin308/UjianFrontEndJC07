import React, { Component } from 'react';
import Headerbertasbih from './components/headerbertasbih';
import Registerbertasbih from './components/registerbertasbih.jsx';
import LoginBertasbih from './components/loginbertasbih';
import HomeBertasbih from './components/homebertasbih';
import Produklistbertasbih from './components/produklistbertasbih';
import Manageprodukbertasbih from './components/manageprodukbertasbih';
import Produkdetail from './components/produkdetail';
import Cart from './components/cart';
import Historyproduk from './components/history';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { keeplogin, cookieChecked } from './actions';

const cookies = new Cookies();

class App extends Component {


  componentDidMount() {
    const username = cookies.get('datauser')
    if(username !== undefined) {
      this.props.keeplogin(username);
    }
    else {
      this.props.cookieChecked();
    }
  }
  
  render() {
    if(this.props.cookie) {
      return (
        <div>
          <Headerbertasbih navBrand={"Home Page"}/>
          <Route exact path="/" component={ HomeBertasbih }/> 
          <Route path="/login" component={ LoginBertasbih }/>
          <Route path="/register" component={ Registerbertasbih }/>
          <Route path="/produklist" component={ Produklistbertasbih }/>
          <Route path="/manageproduk" component={ Manageprodukbertasbih } />
          <Route path="/detailproduk" component= { Produkdetail } />
          <Route path="/cart" component= { Cart } />
          <Route path="/historyproduk" component= { Historyproduk } />
        </div>
      );
    }
    return (
      <div>
        <center>
          <h1>Loading...</h1>
        </center>
      </div>
    )
    
  }
}

const mapStateToProps = (state) => {
  return { cookie: state.auth.cookie };
}

export default withRouter(connect(mapStateToProps, { keeplogin, cookieChecked })(App));
