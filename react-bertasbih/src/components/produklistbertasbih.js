import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import Isiproduklistbertasbih from './isiproduklistbertasbih';
import { connect } from 'react-redux';

const cookies = new Cookies();

class Produklistbertasbih extends Component {
    state = { listproduk : [], searchproduk : []}

    componentDidMount() {
        axios.get('http://localhost:1993/produk')
            .then((res) => {
                console.log(res)    
                this.setState({listproduk: res.data, searchproduk: res.data})
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnSearchclick = () => {
      var nama = this.refs.search.value;
      var merk = this.refs.searchmerk.value;
      var hargamin = parseInt(this.refs.hargamin.value);
      var hargamax = parseInt(this.refs.hargamax.value);
      var hasilsearch = this.state.listproduk.filter((item) => {
        return item.nama.toLowerCase().includes(nama.toLowerCase()) 
              && item.merk.includes(merk)
              && item.harga >= hargamin
              && item.harga <= hargamax
        
      })
      this.setState({ searchproduk: hasilsearch})
    }

    renderListPopok = () => {
    var total = 12;
    var size = 4;
    var check = true;
    var listJSXPopok = this.state.searchproduk.map((item) => {
        if(total === 0 && check === true) {
          size = 6;
          total = 12;
          check = false;
        }
        else if(total === 0 && check === false) {
          size = 4;
          total = 12;
          check = true;
        }
        total -= size;

        return (
          <Isiproduklistbertasbih produk={item} size={size}/>
            )
        })
        return listJSXPopok;
        
    }

    render() {
      const username = cookies.get('datauser')
      
      if(username === undefined) {
        return <Redirect to="/login" />
      }
      else {
        if(this.props.produk.id !== 0) {
          return <Redirect to={`/detailproduk?produkid=${this.props.produk.id}&namaproduk=${this.props.produk.nama}`} />
        }
        return (
          <section className="bg-light" id="portfolio">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h2 className="section-heading text-uppercase">Daftar Game</h2>
                  <h3 className="section-subheading text-muted">Upcoming Game yg dinanti-nanti kan</h3>
                </div>
              </div>
              <div className="col-4" style={{margin: "20px"}}>
                <input type="text" ref="search" placeholder="Search" />
                <div className="row">
                  <div className="col-6">
                      Harga Min<input type="number" ref="hargamin" defaultValue="0"/>
                  </div>
                  <div className="col-6">
                      Harga Max<input type="number" ref="hargamax" defaultValue="999999"/> 
                  </div>
                </div>
                <select className ="col-12" ref="searchmerk">
                    <option value="">All Merk</option>
                    <option>Koei Tecmo</option>
                    <option>Nintendo</option>
                    <option>Rockstar</option>
                    <option>Sega</option>
                </select>
                <input type="button" className="btn btn-success" value="Search" onClick={this.onBtnSearchclick}/>
              </div>
              <div className="row">
                {this.renderListPopok()}
              </div>
            </div>
          </section>
      );
      }
        
    }
}

const mapStateToProps = (state) => {
  return { produk: state.selectedProduk }
}

export default connect(mapStateToProps)(Produklistbertasbih);