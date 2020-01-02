import React, { PureComponent } from "react";
import api from "Api";

import { Cancel } from "@material-ui/icons";


class index extends PureComponent {


    constructor(props) {
        super(props);
        
        let Title = ""
        let Button = ""
        let Tags = {
            id: '',
            value:''
        }

        switch(this.props.Action){
            case "Create":
                Title = "CREATE NEW CAR TAG VALUE FOR MODEL"
                Button = "CREATE"
                break
            case "Edit":
                Title = "EDIT CAR TAG VALUE FOR MODEL"
                Tags = {
                    id: this.props.Data[0],
                    value: this.props.Data[1]
                }
                Button = "SAVE CHANGES"
                break
            case "Delete":
                Title = "DELETE NEW CAR TAG VALUE FOR MODEL"
                Tags = {
                    id: this.props.Data[0],
                    value: this.props.Data[1]
                }
                Button = "CONFIRM DELETE"
                break
            default:break
        }


        this.state=({
            Tags: Tags,
            Title: Title,
            Button: Button
        })
    }



    _SaveTags = async() => {

        await api.post(`/tags`, {
            name: this.state.Tags
        })

       await this.props._SaveTagsDone()
       await this.props._RestartToggle()
    }

    _EditTags = async() => {

        await api.post(`/tags/editTagDetail`, {
            data: this.state.Tags
        })

        await this.props._SaveTagsDone()
        await this.props._RestartToggle()
    }

    _DeleteTags = async() => {
        console.log(this.state.Tags)
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
            default:
                Body = (
                    <div style={{display:'flex', flexDirection:"column", paddingTop: 10, paddingBottom: 10}}>
                        <span>CAR TAG VALUE FOR MODEL</span>
                        <input type="text" placeholder={"Enter a new Car Tag Value for Model here (e.g SUV)"} value={this.state.Tags.value} onChange={(e) =>{
                            let Tags = {...this.state.Tags}
                            Tags.value = e.target.value
                            this.setState({Tags: Tags})
                        }}/>
                    </div>
                )
                break
        }


        let SaveButton = null
        switch(this.props.Action){
            case "Create":
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <button onClick={this._SaveTags}>{this.state.Button}</button>
                    </div>
                )
                break

            case "Edit" :
                SaveButton = (
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <button onClick={this._EditTags}>{this.state.Button}</button>
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

