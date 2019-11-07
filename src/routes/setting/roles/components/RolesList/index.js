import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";

import { Button, Divider } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import HierachyView from "./HierachyView";
import RctSectionLoader from "Components/RctSectionLoader";

class RolesList extends PureComponent {
  render() {
    const { loading, handleDialog, selectRole, allRoles } = this.props;
    return (
      <React.Fragment>
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <h3>Roles</h3>
            <Button
              variant="contained"
              aria-label="Add Role"
              size="small"
              className="mb-10"
              onClick={handleDialog}
            >
              <Add style={{ fontSize: "0.8rem", marginRight: 5 }} /> New Role
            </Button>
          </div>
          <Divider />
          <Scrollbars className="rct-scroll" autoHeight autoHeightMin={"90vh"}>
            {loading ? (
              <RctSectionLoader />
            ) : (
              allRoles && (
                <HierachyView parentRole={allRoles} selectRole={selectRole} />
              )
            )}
          </Scrollbars>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ rolesState }) => {
  const { allRoles } = rolesState;
  return { allRoles };
};
export default connect(mapStateToProps)(RolesList);
