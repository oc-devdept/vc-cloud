import React from "react";
// Tree View
import { fade, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";

const StyledTreeItem = withStyles(theme => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3
    }
  },
  label: {
    padding: 10
  },
  group: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`
  }
}))(props => <TreeItem {...props} />);

function TreeRecursion(props) {
  const { parentRole, selectRole } = props;
  return (
    <StyledTreeItem
      key={parentRole.id}
      nodeId={parentRole.id}
      label={parentRole.name}
      onClick={() => selectRole(parentRole)}
    >
      {parentRole.children.map((childRole, key) =>
        childRole.children.length > 0 ? (
          <TreeRecursion
            key={key}
            parentRole={childRole}
            selectRole={selectRole}
          />
        ) : (
          <StyledTreeItem
            key={key}
            nodeId={childRole.id}
            label={childRole.name}
            onClick={() => selectRole(childRole)}
          />
        )
      )}
    </StyledTreeItem>
  );
}

function HierachyView(props) {
  const { parentRole, selectRole } = props;
  return (
    <TreeView
      defaultExpanded={[parentRole.id]}
      defaultCollapseIcon={<RemoveCircleOutline fontSize="inherit" />}
      defaultExpandIcon={<AddCircleOutline fontSize="inherit" />}
    >
      <TreeRecursion parentRole={parentRole} selectRole={selectRole} />
    </TreeView>
  );
}

export default HierachyView;
