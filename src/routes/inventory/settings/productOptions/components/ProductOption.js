import React, { Component, useState } from "react";
import api from "Api";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';


const initProductDetail = {
    name:'',
    image: '',
    price: '',
    isDefault: false,
    editable: false,
}

export default class ProductOption extends Component {

    state=({

        ProductDetails: [],
        SelectedCategory: '',
        ProductDetail : {
            name:'',
            image: '',
            price: '',
            isDefault: false,
            editable: false,
        },

    })

    _CreateProductDetail = async () => {
        const ProductDetail = this.state.ProductDetail
        const productDetailCategoryId = this.state.SelectedCategory

        await api.post("/productoptions", 
            {
                name: ProductDetail.name,
                type: '',
                value: ProductDetail.value1,
                value2: ProductDetail.value2,
                editable: ProductDetail.editable,
                isDefault: ProductDetail.isDefault,
                price: ProductDetail.price,
                productOptionCategoryId: productDetailCategoryId
            }
        ); 
        
        this.setState({ProductDetail: initProductDetail})
        this._RenderProductDetails()
    }

    async _RenderProductDetails(value) {
     
        try {
            
            const SelectedCategory = value? value : this.state.SelectedCategory
            
            const result = await api.get(`/productoptioncategories/${SelectedCategory}/productOptionCategory`)

            const ProductDetailsSource = await result.data.map((source) => {
                  return { id: source.id, name: source.name, value: source.value, value2: source.value2 }
                }
            );
    
            this.setState({ProductDetails:ProductDetailsSource, loading: false})

        } catch (e) {
            console.log(e)

        }

    }

    _HandleDeleteProductOption = async(index) => {
        
        try {
            const result = await api.delete(`/productoptions/${index}`)

            if(result.data.count == 1){

                await this._RenderProductDetails()

            } else {

            }    
        } catch (e) {
            console.log(e)
        }

    }

    _Toggle = (e) => {
        this.setState({SelectedCategory: e.target.value, loading: true, ProductDetails: []})
        this._RenderProductDetails(e.target.value)
    }

    _ReturnItems() {
        const item = this.props.ProductCategory.map((e, index) => {
             return <MenuItem key={index} value={e.id}>{e.name}</MenuItem>
        })        
        return item
    }

    _HandleProductDetailValue = (e, value) => {
        let ProductDetail = {...this.state.ProductDetail}
        ProductDetail[value] = e
        this.setState({ProductDetail: ProductDetail})
    }

    _HandleCheckBox = (e) => {
        const name = e.target.name
        let ProductDetail = {...this.state.ProductDetail}
        ProductDetail[name] = !ProductDetail[name]
        this.setState({ProductDetail: ProductDetail})
    }


    render() {

      
        return (
            <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>

                <div style={{}}>


                    <div className="d-flex">
                        <div>Select A ProductOptionCategory: </div>
                        <FormControl>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={this.state.SelectedCategory? this.state.SelectedCategory : ""}
                                onChange={this._Toggle}
                            >
                            {this._ReturnItems()}
                            </Select>
                        </FormControl>
                    </div>


            
                    {this.state.SelectedCategory &&
                        <div className="d-flex flex-column">

                            {this.state.loading && 
                                <div>Fetching ... </div>
                            }

                            {this.state.ProductDetails.length > 0 && 
                                this.state.ProductDetails.map((e,index) => {
                                    return (
                                        <div key={index} className="d-flex" >
                                            <span style={{padding: 5}}>{e.name}</span>
                                            <span style={{padding: 5}}>{e.value}</span>
                                            <span style={{padding: 5}}>{e.value2}</span>
                                            <span onClick={() => this._HandleDeleteProductOption(e.id)} style={{marginLeft: 10, cursor:'pointer'}}>x</span>
                                        </div>
                                    )
                                })
                            }



                            <div>
                                <div>Enter Product Option </div>
                                
                                <input type="text" placeholder={"e.g name"} value={this.state.ProductDetail.name} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'name')} />
                                <input type="text" placeholder={"e.g image"} value={this.state.ProductDetail.image} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'image')} />
                                <input type="text" placeholder={"e.g price"} value={this.state.ProductDetail.price} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'price')} />

                                <div className="d-flex align-items-center" style={{flexDirection:'row'}}>
                                    <div>isDefault</div>
                                    <Checkbox
                                        edge="end"
                                        onChange={this._HandleCheckBox}
                                        checked={this.state.ProductDetail.isDefault}
                                        name="isDefault"
                                    />

                                    <div style={{paddingLeft: 10}}>editable</div>
                                    <Checkbox
                                        edge="end"
                                        onChange={this._HandleCheckBox}
                                        checked={this.state.ProductDetail.editable}
                                        name="editable"
                                    />
                                </div>
                            </div>

                            <button style={{width: 300}} onClick={this._CreateProductDetail}>Create Product Detail {`&`} Save Into Product</button>

                        </div> 
                    }

                </div>
            </div>
        )
    }
}