import React, { Component } from 'react';
import axios from 'axios';
import '../Support/CSS/tablemanaga.css'

class Manageprodukbertasbih extends Component {
    state={ listproduk: [], edit: 0}
    
    componentDidMount() {
        this.getproduklist();
    }

    
    getproduklist = () => {
        axios.get('http://localhost:1993/produk')
            .then((res) => {
                console.log(res)    
                this.setState({listproduk: res.data})
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnAddClick = () => {
        var nama = this.refs.namaadd.value;
        var merk = this.refs.merkadd.value;
        var harga = parseInt(this.refs.hargaadd.value);
        var img = this.refs.imgadd.value;
        var description = this.refs.descriptionadd.value;
        axios.post('http://localhost:1993/produk', {
            nama,merk,harga,img,description
        }).then((res) => {
            this.getproduklist();
        }).catch((err) => {
            console.log(err);
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Yakin Hapus?')) {
            axios.delete('http://localhost:1993/produk/' + id)
                .then((res) => {
                    this.getproduklist();
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    onBtnEditClick = (id) => {
        this.setState({ edit: id})
    }

    onBtnSaveClick = (id) => {
        var nama = this.refs.namaedit.value;
        var merk = this.refs.merkedit.value;
        var harga = parseInt(this.refs.hargaedit.value);
        var img = this.refs.imgedit.value;
        var description = this.refs.descriptionedit.value;
        axios.put('http://localhost:1993/produk/' + id, {
            nama,merk,harga,img,description
            }).then((res) => {
                console.log('masuk');
                this.getproduklist();
                this.setState({ edit : 0})
            }).catch((err) => {
                console.log(err);
            })  
    }

    
    
    renderbodyPopok = () => {
    var listJSXPopok = this.state.listproduk.map((item) => {
        if(this.state.edit === item.id) {
            return  <tr>
                    <td>{item.id}</td>
                    <td><input ref="namaedit" type="text" defaultValue={item.nama} /></td>
                    <td>
                        <select ref="merkedit" defaultValue={item.merk}>
                            <option></option>
                            <option>Koei Tecmo</option>
                            <option>Nintendo</option>
                            <option>Rockstar</option>
                            <option>Sega</option>
                        </select>
                    </td>
                    <td><input ref="hargaedit" type="number" defaultValue={item.harga} /></td>
                    <td><input ref="imgedit" type="text" defaultValue={item.img} /></td>
                    <td><textarea ref="descriptionedit" defaultValue={item.description}/></td>
                    <td><input type="button" value="save" className="btn btn-success" onClick={() => this.onBtnSaveClick(item.id)}/></td>
                    <td><input type="button" value="cancel" className="btn btn-danger" onClick={() => this.setState({ edit : 0})}/></td>
                </tr>
        }
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.merk}</td>
                <td>Rp {item.harga}</td>
                <td><img src={item.img} width="50px" alt="item.id"/></td>
                <td>{item.description}</td>
                <td><input className="btn btn-primary" type="button" value="edit" onClick={() => this.onBtnEditClick(item.id)}/></td>
                <td><input className="btn btn-danger" type="button" value="delete" onClick={() => this.onBtnDeleteClick(item.id)}/></td>
            </tr>
        )
    })
        return listJSXPopok;
        
    }
    render() {
        return (
            <div className="container-fluid">
                <h1>Manage Produk</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Merk</th>
                            <th>Harga</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderbodyPopok()}
                    </tbody>
                    <tfoot>
                        <tr>
                        <td></td>
                        <td><input ref="namaadd" type="text" placeholder="Nama Produk" /></td>
                        <td>
                            <select ref="merkadd">
                                <option></option>
                                <option>Koei Tecmo</option>
                                <option>Nintendo</option>
                                <option>Rockstar</option>
                                <option>Sega</option>
                            </select>
                        </td>
                            <td><input ref="hargaadd" type="number" placeholder="Harga Produk" /></td>
                            <td><input ref="imgadd" type="text" placeholder="Image URL" /></td>
                            <td><textarea ref="descriptionadd" placeholder="Enter the Description"/></td>
                            <td><input type="button" value="add" className="btn btn-success" onClick={this.onBtnAddClick}/></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default Manageprodukbertasbih;