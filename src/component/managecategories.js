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
        var namacat = this.refs.namaAdd.value;

        if(namacat === ''){
            window.alert('Ada kolom yang belum di isi !!!')
        }else{
            axios.post('http://localhost:2000/add-cat', {
                namacat
            }).then((res) => {
                this.getCategoryList();
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    onBtnDeleteClick = (id_cat) => {
        if(window.confirm('Yakin nih bro?')){
            axios.post('http://localhost:2000/delete-cat/' + id_cat)
                .then((res) => {
                    this.getCategoryList();
                }).catch((err) => {
                    console.log(err)
                    console.log(typeof id_cat)
                    console.log(id_cat)
                })
        }
    }

    onBtnEditText = (idNya) => {  
        this.setState({ idTabel: idNya })   
    }

    //SAVE
    onBtnSaveClick = (id_cat) => {
        var namacat = this.refs.namaSAVE.value;
        
        console.log(namacat)
        axios.post('http://localhost:2000/edit-cat/' + id_cat, {
            namacat
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
        var listJSXCategories = this.state.listCategory.map(({ id_cat, namacat}) => {
            
            if(this.state.idTabel === id_cat){
                return (
                    <tr>
                        <td>{id_cat}</td>
                        <td><input ref="namaSAVE" type="text" defaultValue={namacat} className="form-control" style={{width: "100px"}} /></td>    
                        <td><input className="btn btn-success" type="button" value="Save" onClick={() => this.onBtnSaveClick(id_cat)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Cancel" onClick={this.onCancel}/></td>
                    </tr>
                )
            }else{
                return (
                    <tr>
                        <td>{id_cat}</td>
                        <td>{namacat}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.onBtnEditText(id_cat)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id_cat)} /></td>
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
                                    <td><input ref="namaAdd" type="text" placeholder="Category" className="form-control" style={{width: "120px"}} /></td>
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