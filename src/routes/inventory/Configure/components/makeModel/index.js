import React, { Component } from "react";

import Tag from './tags'
import MakeModel from './makeModels'

// import FormInputLayout from "Components/Form/Layout/FormInputLayout";
import DialogRoot from "Components/Dialog/DialogRoot";


class index extends Component {

    state=({
        toggle: false,
        element : null
    })


    _RenderDialog = () => {
        if(this.state.toggle){
            switch(this.state.element) {
                case 'Tags':
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
                case 'MakeModel':
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
                    
                default:
                    return null
            }
        }
    }

    _RestartToggle = () => {
        this.setState({toggle: false})
    }


    ToggleDialog = (element) => {
        this.setState({element: element, toggle: !this.state.toggle})
    }

    render() {
        
        // const id = this.props.id

        return (
            <div style={{flex:1, display:'flex', flexDirection:'column'}}>
            
                <Tag
                    ToggleDialog={this.ToggleDialog}
                />

                <MakeModel
                    ToggleDialog={this.ToggleDialog}
                />

                {this._RenderDialog()}
            
            </div>
        );
    }
}

export default index;


index.getinitalprops = () => {

    return id
}