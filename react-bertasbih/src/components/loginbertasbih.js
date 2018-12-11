import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { onUserLogin } from '../actions';
import { Link } from 'react-router-dom';   


const cookies = new Cookies();

class LoginBertasbih extends Component {

          
    componentWillReceiveProps(PropsBaru) {
        if(PropsBaru !== '') {
            cookies.set('datauser',PropsBaru.username,{ path: "/" })
        }
      }

    onBtnLoginClick = () => {
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        this.props.onUserLogin({username ,password});
    }

    renderError = () => {
        if(this.props.error.length > 0) {
            return <p className="alert alert-danger">{this.props.error}</p>
        }
    }

    renderButton = ()=> {
        if(this.props.loading) {
            return <i className="fa fa-spinner fa-spin" />
        }
        return <input type="button" name="signin" id="signin" className="form-submit" defaultValue="Log in" onClick={this.onBtnLoginClick}/>
        
    }

    render() {
        if(this.props.username === '') {
           return (
            <section className="sign-in">
            <div className="container">
              <div className="signin-content">
                <div className="signin-image">
                  <figure><img src="images/signin-image.jpg" alt="sing in image" /></figure>
                </div>
                <div className="signin-form">
                  <h2 className="form-title">Sign in</h2>
                  <form method="POST" className="register-form" id="login-form">
                    <div className="form-group">
                      <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name" /></label>
                      <input type="text" name="your_name" ref="username" id="your_name" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="your_pass"><i className="zmdi zmdi-lock" /></label>
                      <input type="password" name="your_pass" ref="password" id="your_pass" placeholder="Password" />
                    </div>
                    {this.renderError()}
                    <div className="form-group form-button">
                      {this.renderButton()}
                    </div>
                    <div>
                      <Link to="/register" style={{color: "blue"}}>Belum terdaftar sebagai member?</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
            )
        }
        return <Redirect to="/" />
        
    }
}

const mapStateToProps = (state) => {
    return { 
      username: state.auth.username, 
      error: state.auth.error , 
      loading: state.auth.loading};
}

export default connect(mapStateToProps, { onUserLogin })(LoginBertasbih);