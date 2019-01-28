import React, { Component } from 'react';
import axios from 'axios';

class ManageCategories extends Component {

    state = { listCategory: [], idTabel: 0 }

    componentDidMount() {
        this.getCategoryList();
    }

    getCategoryList = () => {
        axios.get('http://localhost:2000/categories')
        .then((res) => {
            this.setState({ listCategory: res.data, idTabel: 0 })
            // console.log(this.state.listPopok)
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;

        if(nama === ''){
            window.alert('Ada kolom yang belum di isi !!!')
        }else{
            axios.post('http://localhost:2000/add-cat', {
                nama
            }).then((res) => {
                this.getCategoryList();
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Yakin nih bro?')){
            axios.post('http://localhost:2000/delete-cat/' + id)
                .then((res) => {
                    this.getCategoryList();
                }).catch((err) => {
                    console.log(err)
                    console.log(typeof id)
                    console.log(id)
                })
        }
    }

    onBtnEditText = (idNya) => {  
        this.setState({ idTabel: idNya })   
    }

    //SAVE
    onBtnSaveClick = (id) => {
        var nama = this.refs.namaSAVE.value;
        
        console.log(nama)
        axios.post('http://localhost:2000/edit-cat/' + id, {
            nama
        }).then((res) => {
            console.log(res.data)
            
            this.getCategoryList();
            
        }).catch((err) => {
            console.log(err)
           
        })
    }

    //Cancel
    onCancel = () => {  
        this.setState({ idTabel: 0 })   
    }

    renderBodyMovies = () => {
        var listJSXCategories = this.state.listCategory.map(({ id, nama}) => {
            
            if(this.state.idTabel === id){
                return (
                    <tr>
                        <td>{id}</td>
                        <td><input ref="namaSAVE" type="text" defaultValue={nama} className="form-control" style={{width: "100px"}} /></td>    
                        <td><input className="btn btn-success" type="button" value="Save" onClick={() => this.onBtnSaveClick(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Cancel" onClick={this.onCancel}/></td>
                    </tr>
                )
            }else{
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.onBtnEditText(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id)} /></td>
                    </tr>
                )
            }
        })
        return listJSXCategories;
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
                                <th>Id</th>
                                <th>Nama</th>
                               
                                <th colSpan="2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderBodyMovies()}
                            </tbody>
                            <tfoot>
                                <tr>
                                <td></td>
                                    <td><input ref="namaAdd" type="text" placeholder="Nama film" className="form-control" style={{width: "120px"}} /></td>
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

export default ManageCategories;