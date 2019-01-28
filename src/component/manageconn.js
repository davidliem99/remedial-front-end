import React, { Component } from 'react';
import axios from 'axios';

class ManageConnect extends Component {

    state = { listConn: [] }

    componentDidMount() {
        this.getConnectList();
    }

    getConnectList = () => {
        axios.get('http://localhost:2000/movcat')
        .then((res) => {
            this.setState({ listConn: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnAddClick = () => {
        var nama = this.refs.namafilmAdd.value;
        var namacat = this.refs.namacategoryAdd.value;

        if(nama === '' || namacat ===''){
            window.alert('Ada kolom yang belum di isi !!!')
        }else{
            axios.post('http://localhost:2000/add-movcat', {
                nama,namacat
            }).then((res) => {
                this.getConnectList();
            }).catch((err) => {
                console.log(err)
                console.log('ini error')
            })
        }
    }

    onBtnDeleteClick = (id_mov) => {
        if(window.confirm('R U Sure ?')){
            axios.post('http://localhost:2000/delete-movcat/' + id_mov)
                .then((res) => {
                    this.getConnectList();
                }).catch((err) => {
                    console.log(err)
                    console.log(typeof id_mov)
                    console.log(id_mov)
                })
        }
    }


    RenderConnect = () => {
        var listJSXConn = this.state.listConn.map(({ id_mov, nama, namacat}) => {
                return (
                    <tr>
                        <td>{nama}</td>
                        <td>{namacat}</td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id_mov)} /></td>
                    </tr>
                )
            
        })
        return listJSXConn;
    }
    getNamafilm =()=>{
        var namafilm = this.state.listConn.map(({nama})=>{
            return(
                <option>{nama}</option>
            )
        })
        return namafilm
    }
    getNamakategori =()=>{
        var namakategori = this.state.listConn.map(({namacat})=>{
            return(
                <option>{namacat}</option>
            )
        })
        return namakategori
    }

    render(){
        return(
            <div>

                <div className="container">

                    <div className="title-bg">
                        <div className="title"><center><h1>Categories list</h1></center></div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered chart">
                            <thead>
                                <tr>
                                <th>Nama film</th>
                                <th>Nama genre</th>
                               
                                <th colSpan="2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.RenderConnect()}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>
                                    <select ref="namafilmAdd" className="form-control" >
                                      {this.getNamafilm()}  
                                    </select>
                                    </td>
                                    <td>
                                    <select ref="namacategoryAdd" className="form-control" >
                                   {this.getNamakategori()}
                                    </select>
                                    </td>
                                    <td><input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick}/></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                </div>

            </div>
        )
    }
}

export default ManageConnect;