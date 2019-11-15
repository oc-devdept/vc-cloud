import React, { Component, useState } from "react";
import api from "Api";

import Checkbox from '@material-ui/core/Checkbox';



export default class ProductOptionCategory extends Component {


    state=({
        CategoryValue : {
            name: '',
            selectOne : false
        },
    })

 
     // Handle Category Name Value
     _HandleChange = (e) => {
        let CategoryValue = {...this.state.CategoryValue}
        CategoryValue.name = e.target.value
        this.setState({CategoryValue: CategoryValue})
    }

    _HandleCheckBox = () => {
        let CategoryValue = {...this.state.CategoryValue}
        CategoryValue.selectOne = !CategoryValue.selectOne
        this.setState({CategoryValue})
    }

    _CreateProductCategory = () => {
        this.props._CreateProductCategory(this.state.CategoryValue)
        this.setState({CategoryValue:{
            name: '',
            selectOne : false
        }})
    }

    
    render() {

        
       
        return (
            <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>

                <button style={{width: 300}} onClick={() => this._CreateProductCategory()}>Create ProductOptionCategory</button>
                <div className="d-flex">
                    <div>Name: </div>
                    <input type="text" value={this.state.CategoryValue.name} onChange={this._HandleChange} />
                    {/* <input type="text" value={this.state.CategoryValue.selectOne} onChange={this._HandleChange} /> */}
                    <div>SelectOne: </div>
                    <Checkbox
                        edge="end"
                        onChange={this._HandleCheckBox}
                        checked={this.state.CategoryValue.selectOne}
                    />
                </div>


                {this.props.loading && 
                    <div>Fetching ... </div>
                }


                <div className="d-flex">
                    {this.props.ProductCategory.length > 0 && 
                        this.props.ProductCategory.map((e,index) => {

                            return (
                                <div key={index} style={{padding:10}}>
                                    <div className="d-flex justify-content-center align-items-center" >
                                        <div className="d-flex" style={{flexDirection:'column'}}>
                                            <span>Name: {e.name} </span>
                                            <span>SelectOne: {`${e.selectOne}`} </span>
                                        </div>
                                        <span onClick={() => this.props._HandleDeleteProductCateogry(e.value)} style={{marginLeft: 10, cursor:'pointer'}}>x</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

        
            </div>
        )
    }
}