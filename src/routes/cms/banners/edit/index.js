import React, { Component } from "react";
import { connect } from "react-redux";

import Helmet from "Components/Helmet";

// Page Components
import RctPageLoader from "Components/RctPageLoader";
import BannerForm from "../components/BannerForm";

// Actions
import { editBanner, getSingleBanner } from "Ducks/cms/banner";

class cms_edit_banner extends Component {
    constructor(props){
        super(props);        
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        this.props.getSingleBanner(id);
      }

      render() {
        const { loading, banner } = this.props.bannerToView;
        return (
          <React.Fragment>
            <Helmet title="Edit Banner" />
            {loading ? (
              <RctPageLoader />
            ) : (
              <BannerForm
                title="sidebar.editBanner"
                edit={banner}
                handleSubmit={this.props.editBanner}
              />
            )}
          </React.Fragment>
        );
      }
    }
    const mapStateToProps = ({ cmsState }) => {
      const { bannerState } = cmsState;
      const { bannerToView } = bannerState;
      return { bannerToView };
    };
    
    export default connect(mapStateToProps, { editBanner, getSingleBanner })(
        cms_edit_banner
    );