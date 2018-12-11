import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onUserRegister } from '../actions'
import { Redirect } from 'react-router-dom';


const cookies = new Cookies();

class registerbertasbih extends Component {

  componentWillReceiveProps(PropsBaru) {
    if(PropsBaru !== '') {
        cookies.set('datauser',PropsBaru.username,{ path: "/" })
    }
  }

    onBtnRegisterClick = () => {
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var phone = this.refs.phone.value;
        var password = this.refs.password.value;
        this.props.onUserRegister({username,email,phone,password});
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
      return <input type="button" name="signup" id="signup" className="form-submit" defaultValue="Sign Up" onClick={this.onBtnRegisterClick}/>
    }

    render() {
      if(this.props.username === '') {
        return (
          <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form method="POST" className="register-form" id="register-form">
                  <div className="form-group">
                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name" /></label>
                    <input type="text" name="name" ref="username" id="name" placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email"><i className="zmdi zmdi-email" /></label>
                    <input type="email" name="email" ref="email" id="email" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass"><i className="zmdi zmdi-lock" /></label>
                    <input type="password" name="pass" ref="password" id="pass" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone"><i className="zmdi zmdi-lock-outline" /></label>
                    <input type="number" name="phone" ref="phone" id="re_pass" placeholder="Phone Number" />
                  </div>
                  <div>
                  {this.renderError()}
                  </div>
                  <div className="form-group form-button">
                    {this.renderButton()}
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure><img src="images/signup-image.jpg" alt="sing up image" /></figure>
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
  return { username: state.auth.username, error: state.auth.error, loading: state.auth.loading };
}

export default connect(mapStateToProps,{ onUserRegister })(registerbertasbih);