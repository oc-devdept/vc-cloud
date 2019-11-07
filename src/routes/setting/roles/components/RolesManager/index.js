import React from "react";

// Components
import { Button, Divider } from "@material-ui/core";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AccessRightsTable from "./AccessRightsTable";

function RoleManager(props) {
  const { handleAccessChange, saveAccess, selectedRole } = props;

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3>{`${selectedRole.name}'s Permissions`}</h3>
        <Button
          variant="contained"
          size="small"
          className="mb-10 btn-success text-white"
          onClick={saveAccess}
        >
          Save
        </Button>
      </div>
      <Divider className="mb-10" />
      {selectedRole.accessRightCategories &&
        selectedRole.accessRightCategories.map((category, key) => (
          <ExpansionPanel
            key={key}
            expanded={expanded === category.name}
            onChange={handleChange(category.name)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <h4 className="mb-0">{category.name}</h4>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="p-0">
              {selectedRole.accessRightCategories[key] && (
                <AccessRightsTable
                  accessRights={category.accessRights}
                  handleAccessChange={handleAccessChange}
                  selectedRights={
                    selectedRole.accessRightCategories[key]["accessrights"]
                  }
                  catKey={key}
                />
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
    </div>
  );
}

export default RoleManager;
