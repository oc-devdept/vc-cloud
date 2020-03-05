import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import RctSectionLoader from "Components/RctSectionLoader";
import BgCard from "Components/BgCard";
import InterestRate from "./components/InterestRate";

// Actions
import {
  getInterestRate,
  updateInterestRate,
  addInterestRate
} from "Ducks/setting/WebsiteSettings";

class WebsiteSettings extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getInterestRate();
  }

  render() {
    // console.log("props= ", this.props);
    const { webSettingsState } = this.props;
    return (
      <React.Fragment>
        {webSettingsState.loading && <RctSectionLoader />}
        <BgCard fullblock>
          <InterestRate
            interestRate={webSettingsState.interestRate}
            updateInterestRate={this.props.updateInterestRate}
            addInterestRate={this.props.addInterestRate}
          />
        </BgCard>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ webSettingsState }) => {
  return { webSettingsState };
};

export default connect(mapStateToProps, {
  getInterestRate,
  updateInterestRate,
  addInterestRate
})(WebsiteSettings);
