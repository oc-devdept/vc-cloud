import React, { Component } from "react";

//sub components
import ConfigList from "./components/configList";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

class crm_config extends Component {
    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <React.Fragment>
                <Helmet title="Customer Car configs" metaDesc="Customer Car Configurations" />
                <PageTitleBar
                    title="Config list"
                />
                <ConfigList />
            </React.Fragment>
        )
    }
}

export default crm_config;