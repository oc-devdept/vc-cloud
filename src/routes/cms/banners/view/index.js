import React, { Component } from "react";
import { connect } from "react-redux";

// Sub components
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
// Action
import { newBanner, getSingleBanner } from "Ducks/cms/banner";

import {
  bannerNewPage,
  bannerEditPage,
  bannerListPage
} from "Helpers/cmsURL";

class cms_view_banner extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.newBanner = this.newBanner.bind(this);
  }

  componentDidMount(){
    var id = this.props.match.params.id;
    this.props.getSingleBanner(id);
  }

  newBanner() {
    this.props.history.push(bannerNewPage);
  }

  edit(id) {
    this.props.history.push(bannerEditPage(id));
  }

  /**
   * DELETE RECORD
   */
  handleDelete(custId) {
    this.props.deleteCustomer(custId);
    //console.log(custId);
    setTimeout(() => {
      this.props.history.push(bannerListPage);
    }, 500);
  }

  delete(cust) {
    this.props.show("alert_delete", {
      name: cust.name,
      action: () => this.handleDelete(cust.id)
    });
  }




  
  render(){
    const { sectionLoading, banner, loading } = this.props.bannerToView;
    return(
      <React.Fragment>
        <Helmet title="View Banner" metaDesc="VC Banner" />
        <PageTitleBar
            title="View Banner"
            actionGroup={{
            add: { onClick: this.newBanner },
            mid: { label: "Edit", onClick: () => this.edit(banner.id) },
            more: [            
                { label: "Delete", onClick: () => this.delete(banner) }
            ]
            }}
        />
        <div className="row">
            <div className="col-lg-12">
            <BgCard>
            {loading && <RctSectionLoader />}
              {banner.images.length > 0 && 
              <img src={banner.images[0].path} style={{width:"100%"}} />
            }
              <div className="row">
                <div className="col-sm-2 text-right">
                  <strong>Name: </strong>
                </div>
                <div className="col-sm-4 text-left">
                  { banner.name }
                </div>
                <div className="col-sm-2 text-right">
                <strong>Position: </strong>
                </div>
                <div className="col-sm-4 text-left">
                  { banner.position }
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2 text-right">
                <strong>Caption Position: </strong>
                </div>
                <div className="col-sm-4 text-left">
                  { banner.captionPosition }
                </div>
                <div className="col-sm-2 text-right">
                <strong>Caption 1: </strong>
                </div>
                <div className="col-sm-4 text-left">
                  { banner.caption1 }
                </div>
                </div>
                <div className="row">
                <div className="col-sm-2 text-right">
                <strong>Caption 2: </strong>
                </div>
                <div className="col-sm-4 text-left">
                  { banner.caption2 }
                </div>
                <div className="col-sm-2 text-right">
                <strong>Link URL: </strong>
                </div>
                <div className="col-sm-4 text-left">
                  { banner.linkURL }
                </div>
              </div>
            </BgCard>
          </div>
        </div>

    </React.Fragment>
    )
  }
    
}
const mapStateToProps = ({ cmsState }) => {
  const { bannerState } = cmsState;
  const { bannerToView } = bannerState;
  return { bannerToView };
}

export default connect(
    mapStateToProps,
    { newBanner, getSingleBanner }
  )(cms_view_banner);