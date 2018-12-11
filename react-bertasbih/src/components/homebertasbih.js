import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Carouselhome from './Carouselhome';

class HomeBertasbih extends Component {
    state = { listpopok: []}
    
    componentDidMount() {
        axios.get('http://localhost:1993/produk')
            .then((res) => {
                // console.log(res)   
                this.setState({listpopok: res.data})
            })
    }

    render() {
        return(
            <div>
                {/* {this.renderListPopok()} */}
                <center>
                <Carouselhome/>
                </center>
            </div>
        )
    }
}

export default connect(null, {})(HomeBertasbih);