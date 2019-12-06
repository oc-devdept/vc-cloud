import React, { PureComponent } from "react";
import api from "Api";

import ProductList from "./components/ProductList";

class index extends PureComponent {


    constructor(props) {
        super(props);
        
        this.state=({
            AllProducts: [],
            loading: true,
        })
    }

    async componentDidMount() {
        const AllProducts = await this._FetchProducts()
        this.setState({AllProducts: AllProducts, loading: false})
    }
  
    async _FetchProducts() {

        try {
            const AllProducts = await api.get(`/products/productVariant`)
            return AllProducts.data.fields
        } catch (e) {
            console.log(e)
            return []
        }
        
    }

    render() {

        return (
            <ProductList
                title={'All Products'}
                loading={this.state.loading}
                tableData={this.state.AllProducts}
                _HandleProduct={this._HandleProduct}
            />
        )
    }
  
}


export default index;
