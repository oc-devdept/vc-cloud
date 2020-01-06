import React, { Component } from "react";

import Tag from './tags'
import MakeModel from './makeModels'


class index extends Component {

    render() {
        
        return (
            <div style={{flex:1, display:'flex', flexDirection:'column'}}>
           
                <MakeModel/>
            
                <Tag/>
           
            </div>
        );
    }
}

export default index;


index.getinitalprops = () => {

    return id
}