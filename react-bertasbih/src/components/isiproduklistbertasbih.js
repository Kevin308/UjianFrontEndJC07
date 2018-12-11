import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SelectProduk } from '../actions'

class Isiproduklistbertasbih extends Component {

    onItemClick = () => {
      this.props.SelectProduk(this.props.produk)
    }


    render() {
        const {img, nama, description, harga} = this.props.produk
          return (
            <div onClick={this.onItemClick} className={`col-md-${this.props.size} col-sm-6 portfolio-item`}>
              <a className="portfolio-link" data-toggle="modal">
                <div className="portfolio-hover">
                  <div className="portfolio-hover-content">
                    <i className="fas fa-plus fa-3x" />
                  </div>
                </div>
                <img className="img-fluid" src={img} alt={nama} />
              </a>
              <div className="portfolio-caption">
                <h4>{nama}</h4>
                <h4>Rp {harga}</h4>
                <p className="text-muted">{description}</p>
              </div>
            </div>
          );       
    }
}


export default connect(null, {SelectProduk})(Isiproduklistbertasbih);