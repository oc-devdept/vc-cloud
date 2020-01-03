import React, { PureComponent } from "react";
import api from "Api";

import { Cancel } from "@material-ui/icons";
import Dropzone from "Components/Dropzone";

import Images from 'Components/Image'

class index extends PureComponent {


    constructor(props) {
        super(props);
        
        let Title = ""
        let Button = ""
        let Make = {
            name: '',
            description: '',
        }
        
        switch(this.props.Action){
            case "Create":
                Title = "CREATE NEW MAKE"
                Button = "CREATE"
                break
            case "Edit":
                Title = "EDIT CAR MAKE"
                Make = {
                    id: this.props.Data[0],
                    name: this.props.Data[1],
                    description: this.props.Data[2],
                }
                Button = "SAVE CHANGES"
                break
            case "Delete":
                Title = "DELETE CAR MAKE"
                Make = {
                    id: this.props.Data[0],
                    name: this.props.Data[1],
                    description: this.props.Data[2],
                    
                }
                Button = "CONFIRM DELETE"
                break
            default:break
        }

        this.state=({
            Make: Make,
            Title: Title,
            Button: Button,
            images : this.props.Data? this.props.Data[3]? this.props.Data[3] : []: [],
            files: [],
            MakeId: this.props.MakeId
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

        const {name, description} = this.state.Make
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

    _EditMake = async() => {
        const files = this.state.files
        const Make = this.state.Make

        var data = new FormData();
        files.map(file => data.append(`upload`, file));
        data.append("id", Make.id);
        data.append("name", Make.name);
        data.append("description", Make.description);

        await api.post(`/categories/editMakeDetail`, data)

        await this.props._SaveMakeDone()
        await this.props._RestartToggle()
    }

    render() {
        
        let Body = null

        switch(this.props.Action){
            case "Delete":
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>
                        <span>{`ARE YOU SURE YOU LIKE TO DELETE THE FOLLOWING?`}<span style={{fontWeight: '600'}}>YOU CANNOT UNDO THIS ACTION</span></span>
                        <span>{this.state.Make.name}</span>
                    </div>
                )
                break
            default:
                Body = (
                    <div className="d-flex" style={{flexDirection:'row', flex: 1}}>

                        <div style={{display:'flex', flexDirection:"column", flex: 1}}>
                            <div style={{display:'flex', flexDirection:"column"}}>
                                <span>CAR MAKE NAME</span>
                                <input type="text" placeholder={"Enter a new car make here (e.g BMW)"} value={this.state.Make.name} onChange={(e) => {
                                    let Make = {...this.state.Make}
                                    Make.name =  e.target.value
                                    this.setState({Make: Make})
                                }} />
                            </div>


                                <div style={{display:'flex', flexDirection:"column"}}>
                                    <span>CAR MAKE IMAGE</span>
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
                            <textarea style={{height:'100%'}} type="text" placeholder={"Enter description for this make"} value={this.state.Make.description} onChange={(e) => {
                                let Make = {...this.state.Make}
                                Make.description =  e.target.value
                                this.setState({Make: Make})
                            }} />
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
                        <button onClick={this._SaveMake}>{this.state.Button}</button>
                    </div>
                )
                break

            case "Edit" :
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <button onClick={this._EditMake}>{this.state.Button}</button>
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

