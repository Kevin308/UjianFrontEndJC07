import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { SelectProduk } from '../actions/index'
import queryString from 'query-string';


class produkdetail extends Component {

    componentDidMount() {
        console.log(this.props.location.search)
        var params = queryString.parse(this.props.location.search)
        // var produkid = this.props.match.params.id;
        var produkId = params.produkid
        axios.get(`http://localhost:1993/produk/${produkId}`)
            .then((res) => {
                // console.log(res)
                this.props.SelectProduk(res.data)
                // console.log(this.props.produk)
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnAddToCartClick = () => {
        var nama = this.props.produk.nama
        var harga = parseInt(this.props.produk.harga)
        var user = this.props.username;
        var img = this.props.produk.img;
        var qty = parseInt(this.refs.qty.value)
        var totalharga = harga * qty
        // console.log(nama)
        axios.post(`http://localhost:1993/Cart`, {
            nama,harga,user,qty,totalharga,img
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        var { nama, harga, img, description, merk } = this.props.produk
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <img alt={img} src={img} className="img-responsive" />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h1>{nama}</h1>
                        </div>
                        <div className="row">
                            <h3>{merk}</h3>
                        </div><div className="row">
                            <h2>{harga}</h2>
                        </div>
                        <div className="row">
                            <p>{description}</p>
                        </div>
                        <div>
                            <input style={{width: "100px"}} type="number" defaultValue="1" ref="qty" />
                        </div>
                        <div className="row" style={{width : "50%"}}>
                            <input className="btn" type="button" value="Add to Cart" onClick={this.onBtnAddToCartClick} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        produk: state.selectedProduk,
        username: state.auth.username
    }
}

export default connect(mapStateToProps, { SelectProduk })(produkdetail);