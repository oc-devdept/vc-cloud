import React, { Component } from "react";
import api from "Api";

import ProductVariant from './components/ProductVariant'
import ProductVariantValue from './components/ProductVariantValue'

const initialMake = {
    name:'',
    description: '',
    image: '',
}


class index extends Component {

 
    state=({
        ProductVariantCategory : [],
        loading: true
    })

    async componentDidMount() {

        try {
            const ProductVariantCategory = await this._FetchProductVariants()
            this.setState({ProductVariantCategory: ProductVariantCategory, loading: false})
        } catch (e){
            this.setState({ProductVariantCategory: [], loading: false})
        }
        
    }

    async _FetchProductVariants() {
        const ProductVariantCategory = await api.get(`/productvariants/formFields`)
        return ProductVariantCategory.data.fields
    }

    _CreateProductCategory = async(value) => {

        await api.post(`/productvariants`, 
            {
                name: value.name,
                groupName: value.groupName
            }
        )
        const ProductVariantCategory = await this._FetchProductVariants()
        this.setState({ProductVariantCategory: ProductVariantCategory, loading: false})
    }

    _HandleDeleteProductCateogry = async(index) =>{
        
        try {
            const result = await api.delete(`/productvariants/${index}`)

            if(result.data.count == 1){
                const ProductVariantCategory = await this._FetchProductVariants()
                this.setState({ProductVariantCategory: ProductVariantCategory, loading: false})
            } else {

            }    
        } catch (e) {
            console.log(e)
        }

    }



    render() {

        return (
            <div style={{flex:1, display:'flex', flexDirection:'column'}}>
            
                <div style={{margin: 15}}>
                    <ProductVariant
                        _CreateProductCategory = {this._CreateProductCategory}
                        _HandleDeleteProductCateogry = {this._HandleDeleteProductCateogry}
                        ProductVariantCategory={this.state.ProductVariantCategory}
                        loading={this.state.loading}
                    />
                </div>

                <div style={{margin: 15}}>
                    <ProductVariantValue
                        ProductVariantCategory={this.state.ProductVariantCategory}
                    />
                </div>

            </div>
        );
    }
}

export default index;
