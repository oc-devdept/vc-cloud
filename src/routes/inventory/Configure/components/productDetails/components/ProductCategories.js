import React, { PureComponent } from "react";
import api from "Api";

import { Cancel } from "@material-ui/icons";

import Input from 'Components/Inventory/Input'
import Text from 'Components/Inventory/Text'
import Button from 'Components/Inventory/Button'

import { NotificationManager } from "react-notifications";
// NotificationManager.error('Unable to make booking request');

const validateForm = (value) => {
    let Reject = true
    if(value == ""){Reject = false}
    return Reject
}


class index extends PureComponent {


    constructor(props) {
        super(props);
        
        let Title = ""
        let Button = ""
        let Category = {
            id: '',
            name: ''
        }
        
        switch(this.props.Action){
            case "Create":
                Title = "ADD NEW SPECIFICATION"
                Button = "ADD"
                break
            case "Edit":
                Title = "EDIT SPECIFICATION"
                Category = {
                    id: this.props.Data.id,
                    name: this.props.Data.name
                }
                Button = "SAVE CHANGES"
                break
            case "Delete":
                Title = "DELETE SPECIFICATION"
                Category = {
                    id: this.props.Data.id,
                    name: this.props.Data.name
                }
                Button = "CONFIRM DELETE"
                break
            default:break
        }

        this.state=({
            Category: Category,
            Title: Title,
            Button: Button,
        })
    }



    _SaveProductDetail = async() => {
        const result = validateForm(this.state.Category.name)
        if(result){
            await api.post(`/productdetailcategories`, {name: this.state.Category.name})
            await this.props._SaveProductDetailDone()
            await this.props._RestartToggle()
            NotificationManager.success('Product specification saved successfully');
        } else {
            NotificationManager.error('Missing input in your form, please fill up the necessary boxes.');
        }
    }

    _EditProductDetail = async() => {
        const result = validateForm(this.state.Category.name)
        if(result){
            await api.post(`/productdetailcategories/editProductDetail`, {data: this.state.Category})
            await this.props._SaveProductDetailDone()
            await this.props._RestartToggle()
            NotificationManager.success('Product specification saved successfully');
        } else {
            NotificationManager.error('Missing input in your form, please fill up the necessary boxes.');
        }
    }

    _DeleteProductDetail = async() => {
        const id = this.state.Category.id
        await api.delete(`/productdetailcategories/${id}`)
        await this.props._SaveProductDetailDone()
        await this.props._RestartToggle()
    }


    _HandleProduct = (e, element) => {
        let Category = {...this.state.Category}
        Category[element] = e
        this.setState({Category: Category})
    }
   
    render() {

        let Body = null

        switch(this.props.Action){
            case "Delete":
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10, justifyContent:"center"}}>
                        <span>{`ARE YOU SURE YOU LIKE TO DELETE THE FOLLOWING?`}<br/><span style={{fontWeight: '600'}}>YOU CANNOT UNDO THIS ACTION</span></span>
                        
                        {/* <div style={{display:'flex', flexDirection:"row", flex:1}}>
                            <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>CAR PRODUCT DETAIL NAME</span>
                                <span>{this.state.Category.name}</span>
                            </div>
                        </div> */}

                        <Text
                            divStyle={{width: '100%'}}
                            title="CAR SPECIFICATION"
                            value={this.state.Category.name}
                        />

                    </div>
                )
                break
            
            case "Edit":
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>
   
                        {/* <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                            <span>CAR PRODUCT DETAIL</span>
                            <input type="text" placeholder={"Enter A New Car Product Detail here (e.g SAFETY FEATURES)"} value={this.state.Category.name} onChange={(e) =>{
                                let Category = {...this.state.Category}
                                Category.name = e.target.value
                                this.setState({Category: Category})
                            }}/>
                        </div> */}
                        <Input
                            divStyle={{width: '100%'}}
                            title="CAR SPECIFICATION"
                            placeholder="Enter a specification name (e.g safety feature)"
                            value={this.state.Category.name}
                            element={'name'}
                            _HandleProduct={this._HandleProduct}
                        />  

                    </div>
                )
                break

            default:
                
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>


                        <div style={{display:'flex', flexDirection:"row", flex:1}}>

                            {/* <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>CAR PRODUCT DETAIL</span>
                                <input type="text" placeholder={"Enter A New Car Product Detail here (e.g SAFETY FEATURES)"} value={this.state.Category.name} onChange={(e) =>{
                                    let Category = {...this.state.Category}
                                    Category.name = e.target.value
                                    this.setState({Category: Category})
                                }}/>
                            </div> */}
                            <Input
                                divStyle={{width: '100%'}}
                                title="CAR SPECIFICATION"
                                placeholder="Enter a new specificatoin (e.g safety features)"
                                value={this.state.Category.name}
                                element={'name'}
                                _HandleProduct={this._HandleProduct}
                            />  
     
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

