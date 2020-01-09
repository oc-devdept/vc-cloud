import React, { PureComponent } from "react";
import api from "Api";

import { Cancel } from "@material-ui/icons";

import Input from 'Components/Inventory/Input'
import Text from 'Components/Inventory/Text'
import Button from 'Components/Inventory/Button'



class index extends PureComponent {


    constructor(props) {
        super(props);
        
        let Title = ""
        let Button = ""
        let Category = {
            id: '',
            name: ''
        }
        let ProductDetail = {
            name:'',
            value1: '',
            value2: '',
            type: ''
        }

        switch(this.props.Action){
            case "Create":
                Title = "CREATE NEW PRODUCT DETAIL"
                Button = "CREATE"
                Category = {
                    id: this.props.Data[0],
                    name: this.props.Data[1],
                }
                break
            case "Edit":
                Title = "EDIT PRODUCT DETAIL"
                ProductDetail = {
                    id: this.props.Data.id,
                    name: this.props.Data.name,
                    value2: this.props.Data.value2
                }
                Button = "SAVE CHANGES"
                break
            case "Delete":
                Title = "DELETE PRODUCT DETAIL"
                ProductDetail = {
                    id: this.props.Data.id,
                    name: this.props.Data.name,
                    value2: this.props.Data.value2
                }
                Button = "CONFIRM DELETE"
                break
            default:break
        }


        this.state=({
            Category: Category,
            Title: Title,
            Button: Button,
            ProductDetail: ProductDetail
        })
    }



    _SaveProductDetail = async() => {

        const ProductDetail = this.state.ProductDetail
        const productDetailCategoryId = this.state.Category.id
        await api.post("/productDetails", 
            {
                name: ProductDetail.name,
                type: ProductDetail.type,
                value: ProductDetail.value1,
                value2: ProductDetail.value2,
                productDetailCategoryId: productDetailCategoryId
            }
        ); 

       await this.props._SaveProductDetailDone()
       await this.props._RestartToggle()
    }

    _EditProductDetail = async() => {
        
        await api.post("/productDetails/editProductDetailValues", {data: this.state.ProductDetail}); 
        await this.props._SaveProductDetailDone()
        await this.props._RestartToggle()

    }

    _DeleteProductDetail = async() => {
        
        const id = this.state.ProductDetail.id
        await api.delete(`/productDetails/${id}`)
        await this.props._SaveProductDetailDone()
        await this.props._RestartToggle()

    }

   
    _HandleProduct = (e, element) => {
        let ProductDetail = {...this.state.ProductDetail}
        ProductDetail[element] = e
        this.setState({ProductDetail: ProductDetail})
    }



    render() {

        let Body = null

        switch(this.props.Action){
            case "Delete":
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10, justifyContent:"center"}}>
                        <span>{`ARE YOU SURE YOU LIKE TO DELETE THE FOLLOWING?`}<br/><span style={{fontWeight: '600'}}>YOU CANNOT UNDO THIS ACTION</span> </span>
                        
                        <div style={{display:'flex', flexDirection:"row", flex:1}}>
                            {/* <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>CAR PRODUCT DETAIL NAME</span>
                                <span>{this.state.ProductDetail.name}</span>
                            </div> */}

                            <Text
                                divStyle={{width: '100%'}}
                                title="CAR PRODUCT DETAIL NAME"
                                value={this.state.ProductDetail.name}
                            />

                            {/* <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>UNITS OF MEASUREMENT</span>
                                <span>{this.state.ProductDetail.value2}</span>
                            </div> */}
                            <Text
                                divStyle={{width: '100%'}}
                                title="UNITS OF MEASUREMENT"
                                value={this.state.ProductDetail.value2}
                            />


                        </div>

                    </div>
                )
                break
            
            case "Edit":
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>
   
                        <div style={{display:'flex', flexDirection:"row", flex:1}}>

                            {/* <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>CAR PRODUCT DETAIL ITEM</span>
                                <input type="text" placeholder={"Enter Product Detail (e.g Air Bags)"} value={this.state.ProductDetail.name} onChange={(e) =>{
                                    let ProductDetail = {...this.state.ProductDetail}
                                    ProductDetail.name = e.target.value
                                    this.setState({ProductDetail: ProductDetail})
                                }}/>
                            </div> */}

                            <Input
                                divStyle={{width: '100%', marginRight: 30}}
                                title="CAR PRODUCT DETAIL ITEM"
                                placeholder="Enter Product Detail (e.g Air Bags)"
                                value={this.state.ProductDetail.name}
                                element={'name'}
                                _HandleProduct={this._HandleProduct}
                            />  

                            {/* 
                            <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>UNITS OF MEASUREMENT</span>
                                <input type="text" placeholder={"Enter Product Measurement (e.g units / km/h)"} value={this.state.ProductDetail.value2} onChange={(e) =>{
                                    let ProductDetail = {...this.state.ProductDetail}
                                    ProductDetail.value2 = e.target.value
                                    this.setState({ProductDetail: ProductDetail})
                                }}/>
                            </div> */}
                            <Input
                                divStyle={{width: '100%'}}
                                title="UNITS OF MEASUREMENT"
                                placeholder="Enter Product Measurement (e.g units / km/h)"
                                value={this.state.ProductDetail.value2}
                                element={'value2'}
                                _HandleProduct={this._HandleProduct}
                            />  
                              

                        </div>

                    </div>
                )
                break

            default:
                
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>


                        <div style={{display:'flex', flexDirection:"column", flex:1}}>

                            {/* <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>CAR PRODUCT DETAIL CATEGORY</span>
                                <span>{this.state.Category.name}</span>
                            </div> */}
                            <Text
                                divStyle={{width: '100%'}}
                                title="CAR PRODUCT DETAIL CATEGORY"
                                value={this.state.Category.name}
                            />

                            <div style={{display:'flex', flexDirection:"row", flex:1, marginRight: 30}}>
                                
                               
                                <Input
                                    divStyle={{width: '100%', marginRight: 30}}
                                    title="CAR PRODUCT DETAIL ITEM"
                                    placeholder="Enter Product Detail (e.g Air Bags)"
                                    value={this.state.ProductDetail.name}
                                    element={'name'}
                                    _HandleProduct={this._HandleProduct}
                                />  
                              

                                <Input
                                    divStyle={{width: '100%'}}
                                    title="UNITS OF MEASUREMENT"
                                    placeholder="Enter Product Measurement (e.g units / km/h)"
                                    value={this.state.ProductDetail.value2}
                                    element={'value2'}
                                    _HandleProduct={this._HandleProduct}
                                />  
                            </div>

           
                          
        
     
                        </div>
                       
                    </div>
                )
                break
        }


        let SaveButton = null
        switch(this.props.Action){
            case "Create":
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        {/* <button onClick={this._SaveProductDetail}>{this.state.Button}</button> */}
                        <Button
                            _Function={this._SaveProductDetail}
                            product={''}
                            files={''}
                            title={this.state.Button}
                        />
                    </div>
                )
                break

            case "Edit" :
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        {/* <button onClick={this._EditProductDetail}>{this.state.Button}</button> */}
                        <Button
                            _Function={this._EditProductDetail}
                            product={''}
                            files={''}
                            title={this.state.Button}
                        />
                    </div>
                )
                break

            default:
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        {/* <button onClick={this._DeleteProductDetail}>{this.state.Button}</button> */}
                        <Button
                            _Function={this._DeleteProductDetail}
                            product={''}
                            files={''}
                            title={this.state.Button}
                        />
                    </div>
                )
                break
        }

        return (
            <div className="d-flex" style={{flexDirection:'column', flex: 1}}>
                
                <div className="d-flex justify-content-center">
                    <div style={{flex:1}} className="d-flex justify-content-center">
                        <span style={{textAlign:'center'}}>{this.state.Title}</span>
                    </div>
                    <Cancel fontSize="large" onClick={this.props._RestartToggle} />
                </div>

                {Body}
            
                {SaveButton}

            </div>
        )
    }
  
}


export default index;

