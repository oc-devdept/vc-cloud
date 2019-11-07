import React, { Component } from "react";
import { connect } from "react-redux";

import UserBlock from "./components/UserBlock";
import UserFeedBlock from "./components/UserFeedBlock";

class MyProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loggedInUser } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-4">
            <UserBlock user={loggedInUser} />
          </div>
          <div className="col-8">
            <UserFeedBlock />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ sessionState }) => {
  const { authState } = sessionState;
  const { loggedInUser } = authState;
  return { loggedInUser };
};

export default connect(mapStateToProps)(MyProfile);
