import React from "react";
import { connect } from "react-redux";

import Helmet from "Components/Helmet";

import BannerForm from "../components/BannerForm";

import { newBanner } from "Ducks/cms/banner";

const cms_new_banner = props => (
    <React.Fragment>
    <Helmet title="New Banner" />

    <BannerForm
      title="sidebar.newBanner"
      handleSubmit={props.newBanner}
    />
  </React.Fragment>
)
export default connect(null, { newBanner})(cms_new_banner);