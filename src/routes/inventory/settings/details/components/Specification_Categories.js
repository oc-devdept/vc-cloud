import React, { Component, useState } from "react";
import api from "Api";


export default class Specification_Categories extends Component {


    state=({
        CategoryValue : '',
    })


    // Handle Category Name Value
    _HandleChange = (e) => {
        this.setState({CategoryValue:e.target.value})
    }


    _CreateProductCategory() {
        this.props._CreateProductCategory(this.state.CategoryValue)
        this.setState({CategoryValue: ''})
    }
  
    
    render() {

        
       
        return (
            <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>

                <button style={{width: 300}} onClick={() => this._CreateProductCategory()}>Create ProductDetailCategory</button>
                <div className="d-flex">
                    <div>Name: </div>
                    <input type="text" value={this.state.CategoryValue} onChange={this._HandleChange} />
                </div>


                {this.props.loading && 
                    <div>Fetching ... </div>
                }


                <div className="d-flex">
                    {this.props.ProductCategory.length > 0 && 
                        this.props.ProductCategory.map((e,index) => {
                            return (
                                <div key={index} style={{padding:10}}>
                                    <div className="d-flex">
                                        <span> {e.name} </span>
                                        <span onClick={() => this.props._HandleDeleteProductCateogry(e.value)} style={{marginLeft: 5, cursor:'pointer'}}>x</span>
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