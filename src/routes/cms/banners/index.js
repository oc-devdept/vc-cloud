import React, { Component } from "react";
import { connect } from "react-redux";// page req
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import BannerList from "./components/BannerList";

import { bannerNewPage, bannerEditPage } from "Helpers/cmsURL";

class cms_banner extends Component {
    constructor(props){
        super(props);
        this.newBanner = this.newBanner.bind(this);  
        this.edit = this.edit.bind(this);
            
    }

    newBanner(){
        this.props.history.push(bannerNewPage);
    }
    
    edit(id){
        this.props.history.push(bannerEditPage(id));
    }

    render(){
        return (
            <React.Fragment>
                <Helmet title="Homepage banners" metaDesc="VC Cars Homepage banners" />
                <PageTitleBar
                title="Banners list"
                actionGroup={{
                    add: { onClick: this.newBanner }                    
                }}
                />
                <BannerList editPage={this.edit} />
          </React.Fragment>
        );
    }
}
export default cms_banner;