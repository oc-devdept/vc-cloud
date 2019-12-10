import React, { Component, useState } from "react";
import api from "Api";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';



const initProductVariantValues = {
    name:'',
    image: '',
    price: '',
    isDefault: false,
}

export default class ProductVariantValue extends Component {

  

    state=({

        ProductVariant: [],
        SelectedCategory: '',
        ProductVariantValues : {
            name:'',
            image: '',
            price: '',
            isDefault: false,
        },

    })

    _CreateProductVariantValeus = async () => {
        const ProductVariantValues = this.state.ProductVariantValues
        const ProductVariantId = this.state.SelectedCategory

        await api.post("/productvariantvalues", 
            {
                name: ProductVariantValues.name,
                image: ProductVariantValues.image,
                isDefault: ProductVariantValues.isDefault,
                price: ProductVariantValues.price,
                productVariantId: ProductVariantId
            }
        ); 
        
        this.setState({ProductVariantValues: initProductVariantValues})
        this._RenderProductVariantValues()
    }

    async _RenderProductVariantValues(value) {
     
        try {
            
            const SelectedCategory = value? value : this.state.SelectedCategory
            const result = await api.get(`/productvariants/${SelectedCategory}/variant`)
            const ProductVariantSource = await result.data.map((source) => {
                return { 
                      id: source.id, name: source.name, 
                      price: source.price, 
                      isDefault: source.isDefault }
                }
            );
    
            this.setState({ProductVariant: ProductVariantSource, loading: false})

        } catch (e) {
            console.log(e)

        }

    }

    _HandleDeleteProductOption = async(index) => {
        console.log(index)
        try {
            const result = await api.delete(`/productvariantvalues/${index}`)

            if(result.data.count == 1){

                await this._RenderProductVariantValues()

            } else {

            }    
        } catch (e) {
            console.log(e)
        }

    }

    _Toggle = (e) => {
        this.setState({SelectedCategory: e.target.value, loading: true, ProductVariant: []})
        this._RenderProductVariantValues(e.target.value)
    }

    _ReturnItems() {
        const item = this.props.ProductVariantCategory.map((e, index) => {
             return <MenuItem key={index} value={e.id}>{e.groupName}</MenuItem>
        })        
        return item
    }

    _HandleProductDetailValue = (e, value) => {
        let ProductVariantValues = {...this.state.ProductVariantValues}
        ProductVariantValues[value] = e
        this.setState({ProductVariantValues: ProductVariantValues})
    }

    _HandleCheckBox = (e) => {
        const name = e.target.name
        let ProductVariantValues = {...this.state.ProductVariantValues}
        ProductVariantValues[name] = !ProductVariantValues[name]
        this.setState({ProductVariantValues: ProductVariantValues})
    }

    render() {
      
        return (
            <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>

                <div style={{}}>


                    <div className="d-flex">
                        <div>Select A ProductVariant: </div>
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

                            {this.state.ProductVariant.length > 0 && 
                                this.state.ProductVariant.map((e,index) => {
                                    return (
                                        <div key={index} className="d-flex" >
                                            <span style={{padding: 5}}>Name: {e.name}</span>
                                            <span style={{padding: 5}}>Price: {e.price}</span>
                                            <span style={{padding: 5}}>isDefault: {`${e.isDefault}`}</span>
                                            <span onClick={() => this._HandleDeleteProductOption(e.id)} style={{marginLeft: 10, cursor:'pointer'}}>x</span>
                                        </div>
                                    )
                                })
                            }



                            <div>
                                <div>Enter Product Variant Values </div>
                                
                                <input type="text" placeholder={"e.g name"} value={this.state.ProductVariantValues.name} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'name')} />
                                <input type="text" placeholder={"e.g image"} value={this.state.ProductVariantValues.image} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'image')} />
                                <input type="text" placeholder={"e.g price"} value={this.state.ProductVariantValues.price} onChange={(e) => this._HandleProductDetailValue(e.target.value, 'price')} />
                 
                                <div className="d-flex align-items-center" style={{flexDirection:'row'}}>
                                    <div>isDefault</div>
                                    <Checkbox
                                        edge="end"
                                        onChange={this._HandleCheckBox}
                                        checked={this.state.ProductVariantValues.isDefault}
                                        name="isDefault"
                                    />                                    
                                </div>
                            </div>

                            <button style={{width: 300}} onClick={this._CreateProductVariantValeus}>Create Product Variant Values {`&`} Save</button>

                        </div> 
                    }

                </div>
            </div>
        )
    }
}