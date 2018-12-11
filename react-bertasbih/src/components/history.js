import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {Table} from 'reactstrap';
import {Redirect} from 'react-router-dom';

class historyproduk extends Component {
    state = { historylist : [], detaillist : [], detail : 0}

    componentDidMount() {
        this.gethistory();
    }

    gethistory = () => {
        axios.get(`http://localhost:1993/history`)
            .then((res) => {
                // console.log(res)
                for(var i = 0; i < res.data.length; i++) {
                    this.state.detaillist = res.data[i].detail
                }
                this.setState({historylist: res.data})
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    renderhistory = () => {
        var listhistory = this.state.historylist.map((item) => {
            if(item.user === this.props.username) {
                return  (
                    <tr>
                        <th>{item.id}</th>
                        <td>{item.user}</td>
                        <td>{item.time}</td>
                        <td>{item.totalqty}</td>
                        <td>{item.totalharga}</td>
                        <td><input className="btn btn-primary" type="button" value="details" onClick={this.renderdetailshistory}/></td>
                    </tr>
                )             
            }         
        })
        return listhistory; 
            
    }

    renderdetailshistory = () => {
        this.setState({detail : 1})
        var listdetail = this.state.detaillist.map((item) => {
                return (
                    <tr>
                        <td>{item.nama}</td>
                        <td><img src={item.img} width="100px"alt={item.id}/></td>
                        <td>{item.qty}</td>
                        <td>{item.harga}</td>
                        <td>{item.totalharga}</td>
                        <td></td>
                    </tr>
                )
        })
        return listdetail;
    }   

    render() {
        if(this.props.username !== undefined) {
            return (
                <Table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Produk</th>
                            <th>Tanggal Transaksi</th>
                            <th>Total Qty</th>
                            <th>Total Harga</th>
                            <th></th>                    
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderhistory()}
                    </tbody>      
                </Table>
            )
        }
        return <Redirect to="/" />
        // return (
        //     <Table>
        //         <thead>
        //             <tr>
        //                 <th>No</th>
        //                 <th>Nama Produk</th>
        //                 <th>Tanggal Transaksi</th>
        //                 <th>Total Qty</th>
        //                 <th>Total Harga</th>
        //                 <th></th>                    
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {this.renderdetailshistory()}
        //         </tbody>      
        //     </Table>
        // )
            
    }
}

const mapStateToProps = (state) => {
    return {
        produk: state.selectedProduk,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(historyproduk);