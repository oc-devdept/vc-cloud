import React, { Component } from "react";
import api from "Api";

import ProductCategories from './components/ProductCategories'
import ProductDetails from './components/ProductDetails'

import ProductDetailsList from './components/ProductDetailsList'
import DialogRoot from "Components/Dialog/DialogRoot";


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
        loading: false,

        toggle: false,
        element : null,
        groupName: null
    })


    async componentDidMount() {
        try {
            const ProductDetailCategories = await api.get(`/productdetailcategories/formFields `)
            this.setState({ProductCategory: ProductDetailCategories.data.fields, loading: false})
        } catch (e){
            this.setState({ProductCategory: [], loading: false})
        }
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

    _RenderDialog = () => {
        if(this.state.toggle){
            switch(this.state.element) {
                case 'Group':
                    return (
                        <DialogRoot
                            title={"Hello world"}
                            size="sm"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                            >
                            <div className="row">
                                
                                {this.state.element}
            
                            </div>
                        </DialogRoot>
                    )
                case 'Value':
                    return (
                        <DialogRoot
                            title={"Hello world"}
                            size="sm"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                            >
                            <div className="row">
                                
                                {this.state.element}
                                add to {this.state.groupName}
            
                            </div>
                        </DialogRoot>
                    )
                    
                default:
                    return null
            }
        }
    }

    _RestartToggle = () => {
        this.setState({toggle: false, element: null, groupName: null})
    }

    ToggleDialog = (element, groupName) => {
        this.setState({element: element, toggle: !this.state.toggle, groupName: groupName})
    }

    render() {

        return (
            <div style={{flex:1, display:'flex', flexDirection:'column'}}>
            
                {/* <ProductCategories
                    _CreateProductCategory = {this._CreateProductCategory}
                    _HandleDeleteProductCateogry = {this._HandleDeleteProductCateogry}
                    ProductCategory={this.state.ProductCategory}
                    loading={this.state.loading}
                /> */}
                {/* <div style={{margin: 15}}>
                    <ProductDetails
                        ProductCategory={this.state.ProductCategory}
                    />
                </div> */}


                <div style={{flex: 1, display:'flex', justifyContent: 'flex-end'}}>
                    <button onClick={()=> this.ToggleDialog('Group')} style={{color:'white', borderRadius: 5, padding: 8, backgroundColor:'rgba(24,59,129,1)', marginBottom: 10, marginRight: 20}}>+ CREATE PRODUCT DETAIL</button>
                </div>

                <ProductDetailsList
                    title={'CREATE CAR PRODUCT DETAIL & ITEM'}
                    tableData={this.state.ProductCategory}
                    ToggleDialog={this.ToggleDialog}
                />

                {this._RenderDialog()}

                

            </div>
        );
    }
}

export default index;
