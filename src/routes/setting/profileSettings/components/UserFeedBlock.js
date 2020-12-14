import React from "react";
import { connect } from "react-redux";
import { Person } from "@material-ui/icons";

import TabsWrapper from "Components/Tabs/TabsWrapper";
import RctSectionLoader from "Components/RctSectionLoader";

// forms
import UpdateUserDetailsForm from "./forms/UpdateUserDetailsForm";
import UpdatePasswordForm from "./forms/UpdatePasswordForm";

const UserFeedBlock = ({ loggedInUser, loading }) => {
  return (
    <React.Fragment>
      <TabsWrapper>
        <div icon={<Person />} label="Update Personal Details">
          {loading ? (
            <RctSectionLoader />
          ) : (
            <UpdateUserDetailsForm user={loggedInUser} />
          )}
        </div>
        <div icon={<Person />} label="Update Password">
          <UpdatePasswordForm />
        </div>
      </TabsWrapper>
    </React.Fragment>
  );
};
const mapStateToProps = ({ sessionState }) => {
  const { authState } = sessionState;
  const { loggedInUser, loading } = authState;
  return { loggedInUser, loading };
};

export default connect(mapStateToProps)(UserFeedBlock);
