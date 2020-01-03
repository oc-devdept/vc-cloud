import React, { Component } from "react";
import api from "Api";


import ProductVariantList from './components/ProductVariantList'
import DialogRoot from "Components/Dialog/DialogRoot";

import ProductGroup from './components/ProductGroup'

class index extends Component {

 
    state=({
        ProductVariantCategory : [],
        ProductVariantCategoryKey: [],
        loading: true,
        toggle: false,
        element : null,
        data: null
    })

    async componentDidMount() {
        try {
            const ProductVariantCategory = await this._FetchProductVariants()
            this.setState({ProductVariantCategory: ProductVariantCategory[0], ProductVariantCategoryKey: ProductVariantCategory[1], loading: false})
        } catch (e){
            this.setState({ProductVariantCategory: [], loading: false})
        }
    }

    async _FetchProductVariants() {
        let ProductVariantCategory = await api.get(`/productvariants/formFields`)
        const data = ProductVariantCategory.data.fields
        return [data.array, data.keyArray]
    }

    _CreateProductCategoryDone = async() => {
        const ProductVariantCategory = await this._FetchProductVariants()
        this.setState({ProductVariantCategory: ProductVariantCategory[0], ProductVariantCategoryKey: ProductVariantCategory[1], loading: false})
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


  
    _RenderDialog = () => {
        if(this.state.toggle){
            switch(this.state.element) {
                case 'Create_Variant':
                    return (
                        <DialogRoot
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                            >
                            <div className="row">                                
                                <ProductGroup
                                    Action={'Create'}
                                    ProductVariantCategoryKey={this.state.ProductVariantCategoryKey}

                                    _RestartToggle={this._RestartToggle}
                                    _CreateProductCategoryDone={this._CreateProductCategoryDone}
                                />
                            </div>
                        </DialogRoot>
                    )
                case 'Edit_Variant':
                    return (
                        <DialogRoot
                            // title={"Hello world"}
                            size="md"
                            show={this.state.toggle}
                            handleHide={this._RestartToggle}
                            >
                            <div className="row">

                                <ProductGroup
                                    Action={'Edit'}
                                    Data={this.state.data}
                                    ProductVariantCategoryKey={this.state.ProductVariantCategoryKey}

                                    _RestartToggle={this._RestartToggle}
                                    _CreateProductCategoryDone={this._CreateProductCategoryDone}
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
            <div style={{flex:1, display:'flex', flexDirection:'column',}}>
            

                <div style={{flex: 1, display:'flex', justifyContent: 'flex-end'}}>
                    <button onClick={()=> this.ToggleDialog('Create_Variant')} style={{color:'white', borderRadius: 5, padding: 8, backgroundColor:'rgba(24,59,129,1)', marginBottom: 10, marginRight: 20}}>+ CREATE PRODUCT VARIANT</button>
                </div>
                
                <ProductVariantList
                    title={'CAR PRODUCT VARIANT GROUP NAME'}
                    tableData={this.state.ProductVariantCategory}
                    ToggleDialog={this.ToggleDialog}
                />

                {this._RenderDialog()}

            </div>
        );
    }
}

export default index;
