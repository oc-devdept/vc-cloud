import React, { Component } from "react";
import api from "Api";

import ProductVariant from './components/ProductVariant'
import ProductVariantValue from './components/ProductVariantValue'

import ProductVariantList from './components/ProductVariantList'
import DialogRoot from "Components/Dialog/DialogRoot";


const initialMake = {
    name:'',
    description: '',
    image: '',
}


class index extends Component {

 
    state=({
        ProductVariantCategory : [],
        loading: true,
        toggle: false,
        element : null,
        groupName: null
    })

  
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

    async componentDidMount() {
        try {
            const ProductVariantCategory = await this._FetchProductVariants()
            this.setState({ProductVariantCategory: ProductVariantCategory, loading: false})
        } catch (e){
            this.setState({ProductVariantCategory: [], loading: false})
        }
    }

    async _FetchProductVariants() {
        let ProductVariantCategory = await api.get(`/productvariants/formFields`)

        const data = ProductVariantCategory.data.fields

        return data
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
            
            
                {/* <ProductVariant
                    _CreateProductCategory = {this._CreateProductCategory}
                    _HandleDeleteProductCateogry = {this._HandleDeleteProductCateogry}
                    ProductVariantCategory={this.state.ProductVariantCategory}
                    loading={this.state.loading}
                /> */}

                <div style={{flex: 1, display:'flex', justifyContent: 'flex-end'}}>
                    <button onClick={()=> this.ToggleDialog('Group')} style={{color:'white', borderRadius: 5, padding: 8, backgroundColor:'rgba(24,59,129,1)', marginBottom: 10, marginRight: 20}}>+ CREATE VARIANT GROUP NAME</button>
                </div>
                
                <ProductVariantList
                    title={'CAR PRODUCT VARIANT GROUP NAME'}
                    tableData={this.state.ProductVariantCategory}
                    ToggleDialog={this.ToggleDialog}
                />

                {this._RenderDialog()}

                {/* <div style={{margin: 15}}>
                    <ProductVariantValue
                        ProductVariantCategory={this.state.ProductVariantCategory}
                    />
                </div> */}

            </div>
        );
    }
}

export default index;
