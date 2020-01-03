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
        let Tags = {
            id: '',
            groupName:'',
            name: ''
        }
        
        switch(this.props.Action){
            case "Create":
                Title = "CREATE NEW PRODUCT VARIANT"
                Button = "CREATE"
                break
            case "Edit":
                Title = "EDIT PRODUCT VARIANT"
                Tags = {
                    id: this.props.Data[0],
                    groupName: this.props.Data[1],
                    name: this.props.Data[2]
                }
                Button = "SAVE CHANGES"
                break
            case "Delete":
                Title = "DELETE PRODUCT VARIANT"
                Tags = {
                    id: this.props.Data[0],
                    groupName: this.props.Data[1],
                    name: this.props.Data[2]
                }
                Button = "CONFIRM DELETE"
                break
            default:break
        }


        this.state=({
            Tags: Tags,
            Title: Title,
            Button: Button,
            ProductVariantCategoryKey: this.props.ProductVariantCategoryKey,
            groupName: ''
        })
    }



    _SaveProductVariant = async() => {
       
        let groupName = ""
        let name = this.state.Tags.name

        if(this.state.groupName != ""){
            groupName = this.state.groupName
        } else {
            groupName = this.state.Tags.groupName
        }

        await api.post(`/productvariants/`, 
            {
                name: name,
                groupName: groupName
            }
        )

        await this.props._CreateProductCategoryDone()
        await this.props._RestartToggle()
        
    }

    _EditProductVariant = async() => {

        await api.post(`/productvariants/editProductVariant`, {data: this.state.Tags})

        await this.props._CreateProductCategoryDone()
        await this.props._RestartToggle()
    }


    _ToggleCategoryKey = (item) => {
        let Tags = this.state.Tags
        Tags.groupName = ''
        this.setState({groupName: item.target.value, Tags: Tags})
    }

   
    render() {

        let Body = null

        switch(this.props.Action){
            case "Delete":
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>
                        <span>{`ARE YOU SURE YOU LIKE TO DELETE THE FOLLOWING?`}<span style={{fontWeight: '600'}}>YOU CANNOT UNDO THIS ACTION</span></span>
                        <span>{this.state.Tags}</span>
                    </div>
                )
                break
            
            case "Edit":
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>

                        <span>CAR PRODUCT VARIANT GROUP NAME</span>

                        <div style={{display:'flex', flexDirection:"row", flex:1}}>
                            <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>PRODUCT VARIANT</span>
                                <span>{this.state.Tags.groupName}</span>
                            </div>
                        </div>
                       
                        <div style={{display:'flex', flexDirection:"row", flex:1}}>
                            <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>CAR PRODUCT VARAIANT ITEM</span>
                                <input type="text" placeholder={"Enter a new product variant item"} value={this.state.Tags.name} onChange={(e) =>{
                                    let Tags = {...this.state.Tags}
                                    Tags.name = e.target.value
                                    this.setState({Tags: Tags})
                                }}/>
                            </div>
                        </div>


                    </div>
                )
                break
            default:
                
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>

                        <span>CAR PRODUCT VARIANT GROUP NAME</span>

                        <div style={{display:'flex', flexDirection:"row", flex:1}}>

                            <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>SELECT EXISITING CATEGORY</span>
                                <FormControl>
                                    <Select 
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={this.state.groupName ? this.state.groupName : 'Select Category'}
                                        onChange={this._ToggleCategoryKey}
                                        style={{minWidth: 100, marginLeft: 5}}
                                    >
                                    
                                        {this.state.ProductVariantCategoryKey.map((e, index) => {
                                            return <MenuItem key={index} value={e}>{e}</MenuItem>
                                        })}
                                    
                                    </Select>
                                </FormControl>
                            </div>

                            <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>CREATE NEW CATEGORY</span>
                                <input type="text" placeholder={"Enter a new product variant group"} value={this.state.Tags.groupName} onChange={(e) =>{
                                    let Tags = {...this.state.Tags}
                                    Tags.groupName = e.target.value
                                    this.setState({Tags: Tags, groupName: ''})
                                }}/>
                            </div>
                                
     
                        </div>
                       
                        <div style={{display:'flex', flexDirection:"row", flex:1}}>

                            <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                                <span>CAR PRODUCT VARAIANT ITEM</span>
                                <input type="text" placeholder={"Enter a new product variant item"} value={this.state.Tags.name} onChange={(e) =>{
                                    let Tags = {...this.state.Tags}
                                    Tags.name = e.target.value
                                    this.setState({Tags: Tags})
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
                        <button onClick={this._SaveProductVariant}>{this.state.Button}</button>
                    </div>
                )
                break

            case "Edit" :
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <button onClick={this._EditProductVariant}>{this.state.Button}</button>
                    </div>
                )
                break
            default:
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <button onClick={this._EditTags}>{this.state.Button}</button>
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

