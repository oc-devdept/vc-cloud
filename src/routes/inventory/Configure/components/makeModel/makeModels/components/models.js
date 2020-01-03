import React, { PureComponent } from "react";
import api from "Api";

import { Cancel } from "@material-ui/icons";
import Dropzone from "Components/Dropzone";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Images from 'Components/Image'


class index extends PureComponent {


    constructor(props) {
        super(props);
        
        let Title = ""
        let Button = ""
        let Model = {
            name: '',
            description: '',
        }
        

        switch(this.props.Action){
            case "Create":
                Title = "CREATE NEW MODEL"
                Button = "CREATE"
                break
            case "Edit":
                Title = "EDIT CAR MODEL"
                Model = {
                    id: this.props.Data[0],
                    name: this.props.Data[1],
                    description: this.props.Data[2],
                    tagId: this.props.Data[4],
                }
                Button = "SAVE CHANGES"
                break
            case "Delete":
                Title = "DELETE CAR MODEL"
                Model = {
                    id: this.props.Data[0],
                    name: this.props.Data[1],
                    description: this.props.Data[2],
                    tagId: this.props.Data[4],
                    
                }
                Button = "CONFIRM DELETE"
                break
            default:break
        }

        this.state=({
            Model: Model,
            Title: Title,
            Button: Button,
            Tags: this.props.Tags,
            TagId: null,
            images : this.props.Data? this.props.Data[3]? this.props.Data[3] : []: [],
            files: [],

            MakeId: this.props.Data.id
        })
    }
   

    removeFile = (file) => {
        this.setState(state => {
        const index = state.files.indexOf(file);
        const files = state.files.slice(0);
        files.splice(index, 1);
        return { files };
        });
    }

    handleUpload = file => {
        this.setState({
            files: file
        });
    };

    _SaveMake = async() => {

        const {name, description} = this.state.Model
        const files = this.state.files

        var data = new FormData();
        files.map(file => data.append(`upload`, file));
        data.append("name", name);
        data.append("description", description);
        data.append("categoryGroupId", this.state.MakeId);

        await api.post(`/categories/new`, data)
    
        await this.props._SaveMakeDone()
        await this.props._RestartToggle()

    }

    _SaveModel = async() => {

        const {TagId, MakeId, Model, files} = this.state

        const ModelId = await api.get(`categorygroups/findOne?filter[where][name]=Model&`);

        var data = new FormData();
        files.map(file => data.append(`upload`, file));
        data.append("name", Model.name);
        data.append("description", Model.description);

        data.append("tagId", TagId);
        data.append("categoryId", MakeId);
        data.append("categoryGroupId", ModelId.data.id);


        await api.post(`/categories/newModel`, data)

        await this.props._SaveModelDone()
        await this.props._RestartToggle()

        return
    }

    _EditModel = async() => {
       
        const files = this.state.files
        const Model = this.state.Model

        var data = new FormData();
        files.map(file => data.append(`upload`, file));
        data.append("id", Model.id);
        data.append("name", Model.name);
        data.append("description", Model.description);

        await api.post(`/categories/editModelDetail`, data)

        await this.props._SaveModelDone()
        await this.props._RestartToggle()

    }

    _ToggleModelTag = (item) => {
        this.setState({TagId: item.target.value})
    }

    
    render() {
        
        let Body = null

        switch(this.props.Action){
            case "Delete":
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>
                        <span>{`ARE YOU SURE YOU LIKE TO DELETE THE FOLLOWING?`}<span style={{fontWeight: '600'}}>YOU CANNOT UNDO THIS ACTION</span></span>
                        <span>{this.state.Model.name}</span>
                    </div>
                )
                break

            case "Edit":
                const tag = this.state.Tags.filter(e => e.id == this.state.Model.tagId)
           
                let tagName = null
                if(tag.length>0){
                    tagName = (
                        <div style={{display:'flex', flexDirection:"column"}}>
                            <span>CAR MODEL TYPE</span>
                            <span>{tag[0].name.toUpperCase()}</span>
                        </div>
                    )
                }

                Body = (
                    <div className="d-flex" style={{flexDirection:'row', flex: 1}}>

                        <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                            
                            {tagName}

                            <div style={{display:'flex', flexDirection:"column"}}>
                                <span>CAR MODEL NAME</span>
                                <input type="text" placeholder={"Enter a new car make here (e.g BMW)"} value={this.state.Model.name} onChange={(e) => {
                                    let Model = {...this.state.Model}
                                    Model.name =  e.target.value
                                    this.setState({Model: Model})
                                }} />
                            </div>

                            <div style={{display:'flex', flexDirection:"column"}}>
                                <span>CAR MODEL IMAGE</span>
                                {this.state.images.length > 0 && 
                                    <Images
                                        imageSource ={this.state.images}
                                        single={true}
                                    />
                                }
                            </div>
                            

                            <div style={{display:'flex', flexDirection:"column",}}>
                                <span>IMAGE UPLOAD</span>
                                <Dropzone
                                    onDrop={this.handleUpload}
                                    onRemove={this.removeFile}
                                    uploadedFiles={this.state.files}
                                    additionalText="Files can't be edited once uploaded."
                                />
                            </div>
                            

                            
                            
                            
                        </div>

                        
                        <div style={{display:'flex', flexDirection:"column",  flex: 1}}>
                            <span>DESCRIPTION</span>
                            <textarea style={{height:'100%'}} type="text" placeholder={"Enter description for this make"} value={this.state.Model.description} onChange={(e) => {
                                let Model = {...this.state.Model}
                                Model.description =  e.target.value
                                this.setState({Model: Model})
                            }} />
                        </div>
                    </div>
                )
                break

            case "Create":
               
                Body = (
                    <div className="d-flex" style={{flexDirection:'row', flex: 1}}>

                        <div style={{display:'flex', flexDirection:"column", flex: 1}}>

                            <div style={{display:'flex', flexDirection:"column"}}>
                                <span>CAR MODEL TYPE</span>
                                {this.state.Tags.length > 0 && 
                                    <FormControl>
                                        <Select 
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={this.state.TagId ? this.state.TagId : ''}
                                        onChange={this._ToggleModelTag}
                                        style={{minWidth: 100, marginLeft: 5}}
                                        >
                                        
                                            {this.state.Tags.map((e, index) => {
                                                return <MenuItem key={index} value={e.id}>{e.name}</MenuItem>
                                            })}
                                        
                                        </Select>
                                    </FormControl>
                                }
                            </div>
                             
                            <div style={{display:'flex', flexDirection:"column"}}>
                                <span>CAR MODEL NAME</span>
                                <input type="text" placeholder={"Enter a new car make here (e.g BMW)"} value={this.state.Model.name} onChange={(e) => {
                                    let Model = {...this.state.Model}
                                    Model.name =  e.target.value
                                    this.setState({Model: Model})
                                }} />
                            </div>

                            <div style={{display:'flex', flexDirection:"column",}}>
                                <span>IMAGE UPLOAD</span>
                                <Dropzone
                                    onDrop={this.handleUpload}
                                    onRemove={this.removeFile}
                                    uploadedFiles={this.state.files}
                                    additionalText="Files can't be edited once uploaded."
                                />
                            </div>
                        </div>

                        <div style={{display:'flex', flexDirection:"column",  flex: 1}}>
                            <span>DESCRIPTION</span>
                            <textarea style={{height:'100%'}} type="text" placeholder={"Enter description for this make"} value={this.state.Model.description} onChange={(e) => {
                                let Model = {...this.state.Model}
                                Model.description =  e.target.value
                                this.setState({Model: Model})
                            }} />
                        </div>
                    </div>
                )
                break
            default:
                
                break
        }


        let SaveButton = null
        switch(this.props.Action){
            case "Create":
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <button onClick={this._SaveModel}>{this.state.Button}</button>
                    </div>
                )
                break

            case "Edit" :
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <button onClick={this._EditModel}>{this.state.Button}</button>
                    </div>
                )
                break


            default:
                break
        }

        return (
            <div className="d-flex" style={{flexDirection:'column',}}>
                
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

