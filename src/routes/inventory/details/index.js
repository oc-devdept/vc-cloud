import React, { Component } from "react";
import api from "Api";

import Specification_Categories from './components/Specification_Categories'
import Specification_Details from './components/Specification_Details'

const initialMake = {
    name:'',
    description: '',
    image: '',
}


class index extends Component {

 
    state=({
        ProductCategory : [],
        ProductDetails: [],
        CategoryValue : '',
        loading: false
    })


    async componentDidMount() {
        const ProductDetailCategories = await api.get(`/productdetailcategories/formFields `)
        this.setState({ProductCategory: ProductDetailCategories.data.fields, loading: false})
    }


    _CreateProductCategory = async (e) => {
        const result = await api.post(`/productdetailcategories`, {name: e})

        let ProductCategory = [...this.state.ProductCategory]
        ProductCategory.push({
            name: result.data.name,
            value: result.data.id
        })

        this.setState({ProductCategory: ProductCategory})
    }


    _HandleDeleteProductCateogry = async (index) => {
        try {
            const result = await api.delete(`/productdetailcategories/${index}`)
            if(result.data.count == 1){
                const ProductDetailCategories = await api.get(`/productdetailcategories/formFields`)
                this.setState({ProductCategory: ProductDetailCategories.data.fields})
            } else {

            }    
        } catch (e) {
            console.log(e)
        }
    }

 










    render() {

        return (
            <div style={{flex:1, display:'flex'}}>
            
                <Specification_Categories
                    _CreateProductCategory = {this._CreateProductCategory}
                    _HandleDeleteProductCateogry = {this._HandleDeleteProductCateogry}
                    ProductCategory={this.state.ProductCategory}
                    loading={this.state.loading}
                />

                <Specification_Details
                    ProductCategory={this.state.ProductCategory}
                />

            </div>
        );
    }
}

export default index;
