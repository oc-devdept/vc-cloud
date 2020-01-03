import React, { Component } from "react";
import api from "Api";

import ProductOptionCategory from './components/ProductOptionCategory'
import ProductOption from './components/ProductOption'

import ProductOptionList from './components/ProductOptionList'
import DialogRoot from "Components/Dialog/DialogRoot";



class index extends Component {

 
    state=({
        ProductOptionCategory : [],
        loading: true,

        toggle: false,
        element : null,
        groupName: null
    })

    async componentDidMount() {
        try {
            const ProductOptionCategories = await this._FetchProductOptionCategories()
            this.setState({ProductOptionCategory: ProductOptionCategories, loading: false})
        } catch (e) {
            this.setState({ProductOptionCategory: [], loading: false})
        }
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
                
                {/* <div style={{margin: 15}}> */}
                    {/* <ProductOptionCategory
                        _CreateProductCategory = {this._CreateProductCategory}
                        _HandleDeleteProductCateogry = {this._HandleDeleteProductCateogry}
                        ProductCategory={this.state.ProductOptionCategory}
                        loading={this.state.loading}
                    /> */}
                      {/* <div style={{margin: 15}}>
                    <ProductOption
                        ProductCategory={this.state.ProductOptionCategory}
                    />
                </div> */}
                   {/* </div> */}

                    <div style={{flex: 1, display:'flex', justifyContent: 'flex-end'}}>
                        <button onClick={()=> this.ToggleDialog('Group')} style={{color:'white', borderRadius: 5, padding: 8, backgroundColor:'rgba(24,59,129,1)', marginBottom: 10, marginRight: 20}}>+ CREATE PRODUCT OPTION</button>
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
