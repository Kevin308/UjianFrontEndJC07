import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Table} from 'reactstrap';

class cart extends Component {
    state = { cartproduk : [], totalqty : 0, jumlaharga : 0}    

    componentDidMount() {
        this.getcartlist()

    }

    getcartlist = () => {
        var Totalqty = 0;
        var Totalharga = 0;
        axios.get('http://localhost:1993/cart')
            .then((res) => {
                console.log(res.data.length)    
                for(var i = 0; i < res.data.length; i++) {
                    Totalqty = Totalqty + res.data[i].qty
                    Totalharga = Totalharga + res.data[i].totalharga
                }
                this.setState({cartproduk: res.data, totalqty : Totalqty, jumlaharga : Totalharga})
                
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnDeleteCartClick = (id) => {
        axios.delete('http://localhost:1993/cart/' + id)
            .then((res) => {
                this.getcartlist();
            }).catch((err) => {
                console.log(err);                
            })
    }

    onBtnEditCartClick = (id) => {
        this.setState({edit : id})
    }

    onBtnCheckOutClick = () => {
        if(window.confirm('Check Out?')) {
            var time = new Date()
            var jam = time.getHours();
            var menit = time.getMinutes();
            var detik = time.getSeconds();
            var hari = time.getDate();
            var bulan = time.getMonth();
            var tahun = time.getFullYear();
            axios.post('http://localhost:1993/history', {
            user : this.props.username,
            time : jam + ':' + menit + ':' + detik + ' / ' + hari + '/' + (bulan+1) + '/' + tahun,
            totalqty : this.state.totalqty,
            totalharga : this.state.jumlaharga,
            detail : this.state.cartproduk
        }).then((res) => {
            for(var i = 1; i <= this.state.cartproduk.length + 1 ; i++){
                axios.delete('http://localhost:1993/cart/' + i)
                .then((res) => {
                    this.getcartlist();
                }).catch((err) => {
                    console.log(err);                
                })
            }    
        }).catch((err) => {
            console.log(err);                
        })
        }
        
    }

    onBtnSaveClick = (id) => {
        var nama = this.refs.nama.value;
        var qty = parseInt(this.refs.qty.value);
        var harga = parseInt(this.refs.harga.value);
        var totalharga = parseInt(qty * harga);
        var user = this.refs.user.value;
        var img = this.props.produk.img;
        axios.put('http://localhost:1993/cart/' + id, {
            nama,qty,harga,totalharga,user,img
            }).then((res) => {
                console.log('masuk');
                this.getcartlist();
                this.setState({ edit : 0})
            }).catch((err) => {
                console.log(err);
            })  
    }

    rendercartPopok = () => {
        var listcart = this.state.cartproduk.map((item) => {
            if(item.user === this.props.username) {
                if(this.state.edit === item.id) {
                    return  (
                        <tr>
                            <td>{item.id}</td>
                            <td><input type="text" ref="nama" defaultValue={item.nama}/></td>
                            <td><input ref="imgedit" type="text" defaultValue={item.img} /></td>
                            <td><input type="number" ref="qty" defaultValue={item.qty}/></td>
                            <td><input type="number" ref="harga" defaultValue={item.harga} /></td>
                            <td>{item.totalharga}</td>
                            <td><input type="text" ref="user" defaultValue={item.user} /></td>
                            <td><input type="button" value="save" className="btn btn-success" onClick={() => this.onBtnSaveClick(item.id)}/></td>
                            <td><input type="button" value="cancel" className="btn btn-danger" onClick={() => this.setState({ edit : 0})}/></td>
                        </tr>
                    )        
                }
                return  (
                    <tr>
                      <th scope="row">{item.id}</th>
                      <td>{item.nama}</td>
                      <td><img src={item.img} width="100px"alt={item.id}/></td>
                      <td>{item.qty}</td>
                      <td>{item.harga}</td>
                      <td>{item.totalharga}</td>
                      <td><input className="btn btn-primary" type="button" value="edit" onClick={() => this.onBtnEditCartClick(item.id)}/></td>
                      <td><input className="btn btn-danger" type="button" value="delete" onClick={() => this.onBtnDeleteCartClick(item.id)}/></td>
                    </tr>
                  )            
            }
            
        })
        return listcart;
            
    }

    render() {
        if(this.props.username !== undefined) {
                return (
                    <div>
                        <div>
                            <h1>Cart List</h1>
                        </div>
                        <Table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Produk</th>
                                <th>Image</th>
                                <th>Qty</th>
                                <th>Harga</th>
                                <th>Total Harga</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.rendercartPopok()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total Belanja</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>{this.state.jumlaharga}</th>
                                <th></th>
                                <th><input className="btn btn-success" type="button" value="CheckOut" onClick={this.onBtnCheckOutClick}/></th>
                            </tr>
                        </tfoot>
                        </Table>
                    </div>        
                )         
        } 
        // console.log(this.state.cartproduk)
        return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
    return {
        produk: state.selectedProduk,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(cart);
