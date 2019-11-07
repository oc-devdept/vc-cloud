import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// Table Component
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

// Switch and Checkbox
import Switch from "@material-ui/core/Switch";
import StyledCheckbox from "Components/Form/StyledCheckbox";

const useStyles = makeStyles(theme => ({
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}));

const RightCell = ({ children, ...others }) => (
  <TableCell {...others} align="right">
    {children}
  </TableCell>
);

function renderCRUD(methodArray, catKey, actionKey) {
  let row = methodArray.map((method, key) => {
    if (method.name == "create")
      return (
        <RightCell key={key}>
          <StyledCheckbox
            checked={method.access}
            onChange={() =>
              handleAccessChange(!method.access, catKey, actionKey, key)
            }
          />
        </RightCell>
      );
    else if (method.name == "read")
      return (
        <RightCell key={key}>
          <StyledCheckbox
            checked={method.access}
            onChange={() =>
              handleAccessChange(!method.access, catKey, actionKey, key)
            }
          />
        </RightCell>
      );
    else if (method.name == "update")
      return (
        <RightCell key={key}>
          <StyledCheckbox
            checked={method.access}
            onChange={() =>
              handleAccessChange(!method.access, catKey, actionKey, key)
            }
          />
        </RightCell>
      );
    else if (method.name == "delete")
      return (
        <RightCell key={key}>
          <StyledCheckbox
            checked={method.access}
            onChange={() =>
              handleAccessChange(!method.access, catKey, actionKey, key)
            }
          />
        </RightCell>
      );
    else return <RightCell key={key} />;
  });
  return row;
}

export default function AccessRightsTable(props) {
  const classes = useStyles();
  const { handleAccessChange, selectedRights, catKey } = props;

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell className="text-left">Actions</TableCell>
          <RightCell>Create</RightCell>
          <RightCell>Read</RightCell>
          <RightCell>Update</RightCell>
          <RightCell>Delete</RightCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {selectedRights.length > 0 &&
          selectedRights.map((action, key) => (
            <TableRow key={key} className={classes.row}>
              <TableCell>
                <h5 className="mb-0">{action.name}</h5>
                <p className="text-muted fs-12 mb-0">{action.description}</p>
              </TableCell>
              {action.accessRightMethods.length > 0 ? (
                // CRUD methods
                renderCRUD(action.accessRightMethods, catKey, key)
              ) : (
                // Custom Methods
                <React.Fragment>
                  <RightCell colSpan={3}>
                    <Switch
                      size="small"
                      checked={action.accessRightMethods.access}
                      onChange={() =>
                        handleAccessChange(
                          !action.accessRightMethods.access,
                          catKey,
                          key
                        )
                      }
                    />
                  </RightCell>
                  <RightCell />
                </React.Fragment>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
