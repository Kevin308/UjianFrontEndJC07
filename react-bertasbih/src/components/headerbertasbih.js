import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';    
import { connect } from 'react-redux';
import { onUserLogout,keeplogin } from '../actions';
import Cookies from 'universal-cookie';
    
//kalau import huruf depan semua harus capital
// ' , ' disebelah React itu namanya destructuring

//componentWillMount() gunanya sebagai fungsi yg dijalankan sebelum render di jalankan
//componentDidMount() gunanya sebagai fungsi yg dijalankan sesudah render di jalankan

const cookies = new Cookies();

class headerbertasbih extends Component {
    

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      onLogOutSelect = () => {
        this.props.onUserLogout();
        cookies.remove('datauser')
      }

    render() {
      if(this.props.username === "") {
        return ( 
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" style={{color:'black'}}>{this.props.navBrand}</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink><Link style={{color: 'black'}} to="/produklist">Produk List</Link></NavLink>
            </NavItem>
            <NavItem>
                <NavLink><Link style={{color: 'black'}} to="/register">Register</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link style={{color: 'black'}} to="/login">Login</Link></NavLink>
            </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
        )
      }
      else if(this.props.username == "admin") {
        return ( 
          <div>
          <Navbar color="danger" light expand="md">
            <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavLink href="/produklist">Produk List</NavLink>
              </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Hello, Admin
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/manageproduk">Manage Produk</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/cart">My Cart</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/historyproduk">My History</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.onLogOutSelect}>
                      <Link to="/" style={{color: 'black'}}>Logout</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        )
      }
      return ( 
        <div>
        <Navbar color="danger" light expand="md">
          <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/produklist">Produk List</NavLink>
            </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Hello, {this.props.username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/cart">My Cart</Link>
                  </DropdownItem>
                  <DropdownItem>
                      <Link to="/historyproduk">My History</Link>
                    </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.onLogOutSelect}>
                    <Link to="/">Logout</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
        )  
    }
}

const mapStateToProps = (state) => {
  return { username : state.auth.username }
}

export default connect(mapStateToProps, {onUserLogout,keeplogin})(headerbertasbih);