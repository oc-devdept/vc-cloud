import React, { PureComponent } from "react";
import api from "Api";

//Page req
import RecordsList from "Components/RecordsList";
import { Edit, Delete } from "@material-ui/icons";
import { IconButton, Button } from "@material-ui/core";
import Images from "Components/Image";

export default class ModelList extends PureComponent {
  state = {
    ModelSource: [],
    ModelLoading: true
  };

  async componentDidMount() {
    try {
      const ModelSource = await api.get(
        `/categories/${this.props.id}/category`
      );
      this.setState({ ModelSource: ModelSource.data, ModelLoading: false });
    } catch (e) {
      this.setState({ ModelSource: [], ModelLoading: false });
    }
  }

  render() {
    const { ToggleDialog, _DeleteModel } = this.props;

    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },

      {
        label: "CAR MODEL",
        name: "name",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },

      {
        label: "DESCRIPTION",
        name: "description",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },
      {
        label: "IMAGE",
        name: "files",
        options: {
          customBodyRender: value => {
            if (value.length > 0) {
              return <Images imageSource={value} single={true} />;
            } else {
              return null;
            }
          }
        }
      },
      {
        name: "tagId",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "EDIT",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (rowData, rowState) => {
            return (
              <IconButton
                size="small"
                onClick={() => ToggleDialog("Edit_Model", rowState.rowData)}
              >
                <Edit fontSize="inherit" />
              </IconButton>
            );
          }
        }
      },
      {
        name: "DELETE",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (rowData, rowState) => {
            return (
              <IconButton
                size="small"
                onClick={() => _DeleteModel(rowState.rowData[0])}
              >
                <Delete fontSize="inherit" />
              </IconButton>
            );
          }
        }
      },
      {
        name: "header",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "images",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "product",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "commissionId",
        options: { display: "excluded", filter: false, sort: false }
      }
    ];

    const listOptions = {
      filterType: "dropdown",
      responsive: "stacked",
      selectableRows: "none",
      expandableRows: false, // Try Adding This
      print: false,
      download: false,
      viewColumns: false,
      search: false,
      filter: false,
      pagination: false,
      setTableProps: () => ({ size: "small" }),
      customToolbar: () => {
        return (
          <Button
            onClick={() => ToggleDialog("Create_Model", Data, this.props.id)}
            variant="outlined"
            size="small"
          >
            Add Model to Make
          </Button>
        );
      }
    };

    const Data = {
      id: this.props.id,
      name: this.props.Make
    };

    return (
      <RecordsList
        title="Model List"
        columns={columns}
        data={this.state.ModelSource}
        options={listOptions}
        borderRadius={"0px"}
        boxShadow={"none"}
      />
    );
  }
}
