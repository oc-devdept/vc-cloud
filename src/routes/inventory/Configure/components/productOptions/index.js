import React, { Component } from "react";
import api from "Api";

import ProductOptionCategory from './components/ProductOptionCategory'
import ProductOption from './components/ProductOption'

import ProductOptionList from './components/ProductOptionList'
import DialogRoot from "Components/Dialog/DialogRoot";

import ProductOption_Create from './components/ProductOption_Create'
import ProductOptionValue_Create from './components/ProductOptionValue_Create'


class index extends Component {

 
    state=({
        ProductOptionCategory : [],
        loading: true,

        toggle: false,
        element : null,
        data: null
    })

    async componentDidMount() {
        try {
            const ProductOptionCategories = await this._FetchProductOptionCategories()
            console.log(ProductOptionCategories)
            this.setState({ProductOptionCategory: ProductOptionCategories, loading: false})
        } catch (e) {
            this.setState({ProductOptionCategory: [], loading: false})
        }
    }

    async _FetchProductOptionCategories() {
        const ProductOptionCategories = await api.get(`/productoptioncategories/formFields`)
        return ProductOptionCategories.data.fields
    }

    _CreateProductCategoryDone = async() => {
        this.setState({loading: true})
        const ProductOptionCategories = await this._FetchProductOptionCategories()
        this.setState({ProductOptionCategory: ProductOptionCategories, loading: false})
    }

    _RenderDialog = () => {
        if(this.state.toggle){
            switch(this.state.element) {
                case 'Create_ProductOption':
                    return (
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                            >
                            <div className="row">
                                <ProductOption_Create
                                    Action={'Create'}
                                    Data = {[]}

                                    _CreateProductCategoryDone={this._CreateProductCategoryDone}
                                    _RestartToggle={this._RestartToggle}
                                />
                            </div>
                        </DialogRoot>
                    )
                case 'Edit_ProductOption':
                    return (
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                            >
                            <div className="row">
                                <ProductOption_Create
                                    Action={'Edit'}
                                    Data = {this.state.data}

                                    _CreateProductCategoryDone={this._CreateProductCategoryDone}
                                    _RestartToggle={this._RestartToggle}
                                />
                            </div>
                        </DialogRoot>
                    )

                case 'Delete_ProductOption':
                        return (
                            <DialogRoot
                                // title={"Hello world"}
                                size="md"
                                show={this.state.toggle}
                                handleHide={this._RestartToggle}
                                >
                                <div className="row">
                                    <ProductOption_Create
                                        Action={'Delete'}
                                        Data = {this.state.data}
    
                                        _CreateProductCategoryDone={this._CreateProductCategoryDone}
                                        _RestartToggle={this._RestartToggle}
                                    />
                                </div>
                            </DialogRoot>
                        )
                case 'Create_ProductOptionValue':
                    return (
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                            >
                            <div className="row">
                                <ProductOptionValue_Create
                                    Action={'Create'}
                                    Data = {this.state.data}

                                    _CreateProductCategoryDone={this._CreateProductCategoryDone}
                                    _RestartToggle={this._RestartToggle}
                                />
                            </div>
                        </DialogRoot>
                    )
                case 'Edit_ProductOptionValue':
                    return (
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                            >
                            <div className="row">
                                <ProductOptionValue_Create
                                    Action={'Edit'}
                                    Data = {this.state.data}

                                    _CreateProductCategoryDone={this._CreateProductCategoryDone}
                                    _RestartToggle={this._RestartToggle}
                                />
                            </div>
                        </DialogRoot>
                    )
                case 'Delete_ProductOptionValue':
                    return (
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                            >
                            <div className="row">
                                <ProductOptionValue_Create
                                    Action={'Delete'}
                                    Data = {this.state.data}

                                    _CreateProductCategoryDone={this._CreateProductCategoryDone}
                                    _RestartToggle={this._RestartToggle}
                                />
                            </div>
                        </DialogRoot>
                    )
                default:
                    return null
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
           
                    <div style={{flex: 1, display:'flex', justifyContent: 'flex-end'}}>
                        <button onClick={()=> this.ToggleDialog('Create_ProductOption')} style={{color:'white', borderRadius: 5, padding: 8, backgroundColor:'rgba(24,59,129,1)', marginBottom: 10, marginRight: 20}}>+ CREATE PRODUCT OPTION</button>
                    </div>

                    <ProductOptionList
                        title={'CAR PRODUCT OPTION GROUP NAME'}
                        tableData={this.state.ProductOptionCategory}
                        ToggleDialog={this.ToggleDialog}
                    />
        
                    {this._RenderDialog()}
              
            </div>
        );
    }
}

export default index;
