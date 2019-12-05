import React, { Component, useState } from "react";
import api from "Api";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';


export default class ProductVariant extends Component {


    
    state=({
        ProductVariant : {
            name: '',
            groupName : ''
        },
    })

 
     // Handle Category Name Value
     _HandleProductDetailValue = (e, value) => {
        let ProductVariant = {...this.state.ProductVariant}
        ProductVariant[value] = e
        this.setState({ProductVariant: ProductVariant})
    }


    _CreateProductCategory = async () => {
        await this.props._CreateProductCategory(this.state.ProductVariant)
        this.setState({ProductVariant:{
            name: '',
            groupName : ''
        }})
    }


    
    render() {

        
       
        return (
            <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>

                <div style={{}}>

                    <button style={{width: 300}} onClick={() => this._CreateProductCategory()}>Create ProductVariant</button>
                    <div className="d-flex">
                        <div>Product Variant: </div>
                      
                        <input type="text" placeholder={"e.g name"} value={this.state.ProductVariant.name} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'name')} />
                        <input type="text" placeholder={"e.g group name"} value={this.state.ProductVariant.groupName} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'groupName')} />
                        
                    </div>


                    {this.props.loading && 
                        <div>Fetching ... </div>
                    }


                    <div className="d-flex">
                        {this.props.ProductVariantCategory.length > 0 && 
                            this.props.ProductVariantCategory.map((e,index) => {

                                return (
                                    <div key={index} style={{padding:10}}>
                                        <div className="d-flex justify-content-center align-items-center" >
                                            <div className="d-flex" style={{flexDirection:'column'}}>
                                                <span>Name: {e.name} </span>
                                                <span>GroupName: {`${e.groupName}`} </span>
                                            </div>
                                            <span onClick={() => this.props._HandleDeleteProductCateogry(e.id)} style={{marginLeft: 10, cursor:'pointer'}}>x</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
        
            </div>
        )
    }
}