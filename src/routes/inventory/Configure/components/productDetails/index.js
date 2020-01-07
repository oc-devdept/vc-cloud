import React, { Component } from "react";
import api from "Api";

import ProductDetailsList from './components/ProductDetailsList'
import DialogRoot from "Components/Dialog/DialogRoot";

import ProductCategories from './components/ProductCategories'
import ProductDetails from './components/ProductDetails'

class index extends Component {

 
    state=({
        ProductCategory : [],
        ProductDetails: [],
        CategoryValue : '',
        loading: false,

        toggle: false,
        element : null,
        data: []
    })


    async componentDidMount() {
        try {
            const ProductDetailCategories = await this._FetchProductCategory()
            this.setState({ProductCategory: ProductDetailCategories, loading: false})

        } catch (e){
            this.setState({ProductCategory: [], loading: false})
        }
    }

    _FetchProductCategory = async (e) => {
        const ProductDetailCategories = await api.get(`/productdetailcategories/formFields`)
        return ProductDetailCategories.data.fields
    }

    _SaveProductDetailDone = async() => { 
        const ProductDetailCategories = await this._FetchProductCategory()
        this.setState({ProductCategory: ProductDetailCategories, loading: false})
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
                case 'Create_Detail':
                    return (
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                            >
                            <div className="row">
                                
                                <ProductCategories
                                    Action={'Create'}

                                    _RestartToggle={this._RestartToggle}
                                    _SaveProductDetailDone={this._SaveProductDetailDone}
                                />
            
                            </div>
                        </DialogRoot>
                    )
                case 'Edit_Detail':
                    return (
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                            >
                            <div className="row">
                                <ProductCategories
                                    Action={'Edit'}
                                    Data ={this.state.data}

                                    _RestartToggle={this._RestartToggle}
                                    _SaveProductDetailDone={this._SaveProductDetailDone}
                                />
                            </div>
                        </DialogRoot>
                    )
                
                case 'Delete_Detail':
                        return (
                            <DialogRoot
                                // title={"Hello world"}
                                size="md"
                                show={this.state.toggle}
                                handleHide={this._RestartToggle}
                                >
                                <div className="row">
                                    <ProductCategories
                                        Action={'Delete'}
                                        Data ={this.state.data}
    
                                        _RestartToggle={this._RestartToggle}
                                        _SaveProductDetailDone={this._SaveProductDetailDone}
                                    />
                                </div>
                            </DialogRoot>
                        )

                case 'Create_Detail_Value':
                    return(
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                            >
                            <div className="row">
                                <ProductDetails

                                    Action={'Create'}
                                    Data ={this.state.data}

                                    _RestartToggle={this._RestartToggle}
                                    _SaveProductDetailDone={this._SaveProductDetailDone}
                                />
                            </div>
                        </DialogRoot>
                    )

                case 'Edit_Detail_Value':
                    return(
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                            >
                            <div className="row">
                                <ProductDetails

                                    Action={'Edit'}
                                    Data ={this.state.data}

                                    _RestartToggle={this._RestartToggle}
                                    _SaveProductDetailDone={this._SaveProductDetailDone}
                                />
                            </div>
                        </DialogRoot>
                    )
                        

                case 'Delete_Detail_Value':
                    return(
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                            >
                            <div className="row">
                                <ProductDetails

                                    Action={'Delete'}
                                    Data ={this.state.data}

                                    _RestartToggle={this._RestartToggle}
                                    _SaveProductDetailDone={this._SaveProductDetailDone}
                                />
                            </div>
                        </DialogRoot>
                    )
                default:return null
            }
        }
    }

    _RestartToggle = () => {
        this.setState({toggle: false, element: null, data: null})
    }

    ToggleDialog = (element, data) => {
        this.setState({element: element, toggle: !this.state.toggle, data: data})
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
                    <button onClick={()=> this.ToggleDialog('Create_Detail')} style={{color:'white', borderRadius: 5, padding: 8, backgroundColor:'rgba(24,59,129,1)', marginBottom: 10, marginRight: 20}}>+ CREATE PRODUCT DETAIL</button>
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