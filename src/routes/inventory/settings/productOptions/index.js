import React, { Component } from "react";
import api from "Api";

import ProductOptionCategory from './components/ProductOptionCategory'
import ProductOption from './components/ProductOption'

const initialMake = {
    name:'',
    description: '',
    image: '',
}


class index extends Component {

 
    state=({
        ProductOptionCategory : [],
        loading: true
    })

    async componentDidMount() {
        const ProductOptionCategories = await this._FetchProductOptionCategories()
        this.setState({ProductOptionCategory: ProductOptionCategories, loading: false})
    }

    async _FetchProductOptionCategories() {
        const ProductOptionCategories = await api.get(`/productoptioncategories/formFields`)
        return ProductOptionCategories.data.fields
    }

    _CreateProductCategory = async(value) => {

        await api.post(`/productoptioncategories`, 
            {
                name: value.name,
                selectOne: value.selectOne
            }
        )

        const ProductOptionCategories = await this._FetchProductOptionCategories()
        this.setState({ProductOptionCategory: ProductOptionCategories, loading: false})
    }

    _HandleDeleteProductCateogry = async(index) =>{
        
        try {
            const result = await api.delete(`/productoptioncategories/${index}`)

            if(result.data.count == 1){
                const ProductDetailCategories = await api.get(`/productoptioncategories/formFields `)
                this.setState({ProductOptionCategory: ProductDetailCategories.data.fields})
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
                    <ProductOptionCategory
                        _CreateProductCategory = {this._CreateProductCategory}
                        _HandleDeleteProductCateogry = {this._HandleDeleteProductCateogry}
                        ProductCategory={this.state.ProductOptionCategory}
                        loading={this.state.loading}
                    />
                </div>

                <div style={{margin: 15}}>
                    <ProductOption
                        ProductCategory={this.state.ProductOptionCategory}
                    />
                </div>
            </div>
        );
    }
}

export default index;
