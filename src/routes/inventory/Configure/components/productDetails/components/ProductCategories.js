import React, { PureComponent } from "react";
import api from "Api";

import { Cancel } from "@material-ui/icons";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
                Title = "CREATE NEW PRODUCT DETAIL"
                Button = "CREATE"
                break
            case "Edit":
                Title = "EDIT PRODUCT DETAIL"
                Category = {
                    id: this.props.Data.id,
                    name: this.props.Data.name
                }
                Button = "SAVE CHANGES"
                break
            case "Delete":
                Title = "DELETE PRODUCT DETAIL"
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
       await api.post(`/productdetailcategories`, {name: this.state.Category.name})
       await this.props._SaveProductDetailDone()
       await this.props._RestartToggle()
    }

    _EditProductDetail = async() => {
        await api.post(`/productdetailcategories/editProductDetail`, {data: this.state.Category})
        await this.props._SaveProductDetailDone()
        await this.props._RestartToggle()
    }

    _DeleteProductDetail = async() => {
        const id = this.state.Category.id
        await api.delete(`/productdetailcategories/${id}`)
        await this.props._SaveProductDetailDone()
        await this.props._RestartToggle()
    }

   
    render() {

        let Body = null

        switch(this.props.Action){
            case "Delete":
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10, justifyContent:"center"}}>
                        <span>{`ARE YOU SURE YOU LIKE TO DELETE THE FOLLOWING?`}<span style={{fontWeight: '600'}}>YOU CANNOT UNDO THIS ACTION</span></span>
                        
                        <div style={{display:'flex', flexDirection:"row", flex:1}}>
                            <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>CAR PRODUCT DETAIL NAME</span>
                                <span>{this.state.Category.name}</span>
                            </div>
                        </div>

                    </div>
                )
                break
            
            case "Edit":
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>
   
                        <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                            <span>CAR PRODUCT DETAIL</span>
                            <input type="text" placeholder={"Enter A New Car Product Detail here (e.g SAFETY FEATURES)"} value={this.state.Category.name} onChange={(e) =>{
                                let Category = {...this.state.Category}
                                Category.name = e.target.value
                                this.setState({Category: Category})
                            }}/>
                        </div>
                    

                    </div>
                )
                break

            default:
                
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>


                        <div style={{display:'flex', flexDirection:"row", flex:1}}>

                            <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>CAR PRODUCT DETAIL</span>
                                <input type="text" placeholder={"Enter A New Car Product Detail here (e.g SAFETY FEATURES)"} value={this.state.Category.name} onChange={(e) =>{
                                    let Category = {...this.state.Category}
                                    Category.name = e.target.value
                                    this.setState({Category: Category})
                                }}/>
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
                        <button onClick={this._SaveProductDetail}>{this.state.Button}</button>
                    </div>
                )
                break

            case "Edit" :
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <button onClick={this._EditProductDetail}>{this.state.Button}</button>
                    </div>
                )
                break
            default:
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <button onClick={this._DeleteProductDetail}>{this.state.Button}</button>
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

