import React, { Component } from "react";

import Tag from './tags'
import MakeModel from './makeModels'


class index extends Component {

    state=({
        toggle: false,
        element : null,
        data: null,

    })


  

    render() {
        
        // const id = this.props.id

        return (
            <div style={{flex:1, display:'flex', flexDirection:'column'}}>
            
                <Tag
                    // ToggleDialog={this.ToggleDialog}
                />

                <MakeModel
                    // ToggleDialog={this.ToggleDialog}
                />

                {/* {this._RenderDialog()} */}
            
            </div>
        );
    }
}

export default index;


index.getinitalprops = () => {

    return id
}