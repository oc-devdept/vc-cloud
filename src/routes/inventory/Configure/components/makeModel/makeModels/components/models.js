import React, { PureComponent } from "react";
import api from "Api";

import { Cancel } from "@material-ui/icons";


class index extends PureComponent {


    constructor(props) {
        super(props);
        
        let Title = ""
        let Button = ""
        let Tags = ''

        switch(this.props.Action){
            case "Create":
                Title = "CREATE NEW MODEL"
                Tags = ""
                Button = "CREATE"
                break
            case "Edit":
                Title = "EDIT CAR MODEL"
                Tags = this.props.Data[1]
                Button = "SAVE CHANGES"
                break
            case "Delete":
                Title = "DELETE CAR MODEL"
                Tags = this.props.Data[1]
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
                        <input type="text" placeholder={"Enter a new Car Tag Value for Model here (e.g SUV)"} value={this.state.Tags} onChange={(e) => this.setState({Tags: e.target.value})} />
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
            
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <button onClick={() => console.log('Create!')}>{this.state.Button}</button>
                </div>

            </div>
        )
    }
  
}


export default index;

