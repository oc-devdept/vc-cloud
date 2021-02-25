import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import MUIDataTable from "../MuiDatatable";
import { listOptions, getDateTime } from "Helpers/helpers";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

//icon
import { IconButton } from "@material-ui/core";
import { Icon } from "@iconify/react";
import baselineDeleteForever from "@iconify/icons-ic/baseline-delete-forever";
import editFilled from "@iconify/icons-ant-design/edit-filled";

const myTheme = createMuiTheme({
  overrides: {
    MUIDataTable: {
      responsiveScroll: {
        maxHeight: "none",
      },
      responsiveScrollMaxHeight: {
        maxHeight: "650px",
      },
    },
    MuiPaper: {
      rounded: { borderRadius: "15px" },
    },
    MuiTableCell: {
      root: { fontFamily: "Lato", borderBottom: "none", padding: "14px" },
    },
    MuiTypography: {
      root: {
        fontFamily: "Lato!important",
      },
      h6: { fontSize: "1rem" },
    },
    MUIDataTableBodyRow: {
      root: {
        "&:nth-child(odd)": {
          backgroundColor: "#F6F8FC",
        },
      },
      hover: {
        "&$hover:hover": {
          backgroundColor: "#FCE8D4 !important",
        },
      },
    },
    MUIDataTableToolbarSelect: {
      root: {
        paddingTop: "0px",
        paddingBottom: "0px",
      },
    },
    MuiTableSortLabel: {
      root: {
        color: "#F00",
        "&$icon": {
          color: "#FF8B19 !important",
        },
        svg: { backgroundColor: "#FCE804" },
      },
      label: {
        color: "#FCE804",
        backgroundColor: "#FCE804",
      },
      active: {
        text: {
          color: "#FFF",
        },
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: "#595959",
      },
    },
    MUIDataTableHeadCell: {
      root: {
        backgroundColor: "#595959 !important",
        color: "#FFFFFF",
        fontFamily: "Lato",
        fontWeight: "bold",
        fontSize: "14px",
      },
    },
    MuiTableRow: {
      root: {
        "&$selected": {
          backgroundColor: "#FCE8D4 !important",
          color: "#FFF",
        },
      },
    },
    MUIDataTableSelectCell: {
      checked: { color: "#FF8B19 !important" },
      root: {
        "&$selected": {
          backgroundColor: "#FCE8D4 !important",
        },
        backgroundColor: "F6F8FC !important",
      },
      headerCell: {
        backgroundColor: "#595959",
      },
    },
    MuiButton: {
      text: {
        color: "white",
        backgroundColor: "#FF8B19",
        borderRadius: 5,
        border: 0,
        padding: "5px",
        marginLeft: "10px",
      },
      hover: {
        "&$hover:hover": {
          backgroundColor: "#FCE8D4 !important",
        },
      },
    },
  },
});

function getFilters(filterList, columns) {
  let filter = [];
  for (let i = 0; i < filterList.length; i++) {
    let list = filterList[i];
    if (list.length > 0) {
      let property = columns[i].name;
      let val = null;
      for (let a = 0; a < list.length; a++) {
        if(list[a] == undefined){
          list[a] = 0;
        }
        if(val == null){
          val = list[a]
        }
        else if(Array.isArray(val)){
          val.push(list[a]);
        }
        else {
          let v = [val];
          v.push(list[a]);
          val = v;
        }                
      }
      filter.push({ [property]: val });
    }
  }
  return filter;
}
function createServerSideList(length) {
  let list = [];
  for (let i = 0; i < length; i++) {
    let array = [];
    list.push(array);
  }
  return list;
}
//Takes In Filter Function
//Total Count
class ServerRecordsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 20,
      skip: 0,
      filters: [],
      searchText: "",
      orderBy: [],
      // serverSideFilterList: [], //match number of columns
      serverSideFilterList: createServerSideList(), //match number of columns
      columns: [],
      sorted: {
        name: "",
        direction: "",
      },
      selected: [],
      selectedRows: [],
      bulkAction: "",
      options: Object.assign({}, listOptions),
    };
    this.triggerSearch = this.triggerSearch.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.bulkActionGo = this.bulkActionGo.bind(this);
    this.changeBulkAction = this.changeBulkAction.bind(this);
    // this.delete = this.delete.bind(this);
    // this.edit = this.edit.bind(this);
  }
  handleFilterSubmit(filterList) {
    const filter = getFilters(filterList, this.state.columns);
    this.props.filterFunc(this.state.limit, this.state.skip, filter);
    this.setState({ filters: filter, serverSideFilterList: filterList, selected: [], selectedRows: [] });
  }

  triggerSearch(searchText) {
    clearInterval(this.searchInterval);
    this.props.filterFunc(this.state.limit, this.state.skip, this.state.filters, searchText, this.state.orderBy);
    this.setState({ searchText: searchText, skip: 0, selected: [], selectedRows: [] });
  }

  changeBulkAction(evt) {
    this.setState({
      bulkAction: evt.target.value,
    });
  }

  handleSelect(rowsSelected, allRowsSelected) {
    if (rowsSelected.length > 0) {
      //check if user click select all checkbox

      if (rowsSelected.length >= this.state.limit) {
        //user has selected everything
        var contacts = [];
        var selected = [];
        if (this.state.selected.length >= rowsSelected.length) {
          //unselect all
        } else {
          for (let i = 0; i < this.props.totalCount; i++) {
            contacts.push(1);
            selected.push(i);
          }
        }

        this.setState({
          selected: contacts,
          selectedRows: selected,
        });
      } else {
        //initialize contacts
        let contactSelected = [...this.state.selected];
        if (contactSelected.length == 0) {
          for (let i = 0; i < this.props.totalCount; i++) {
            contactSelected.push(0);
          }
        }
        //check if select or deselect
        for (let i = 0; i < rowsSelected.length; i++) {
          if (contactSelected[rowsSelected[i].index + this.state.skip] == 1) {
            contactSelected[rowsSelected[i].index + this.state.skip] = 0;
          } else {
            contactSelected[rowsSelected[i].index + this.state.skip] = 1;
          }
        }
        console.log(contactSelected);
        var selected = [];
        for (let i = this.state.skip; i < this.state.limit + this.state.skip && i < contactSelected.length; i++) {
          if (contactSelected[i] == 1) {
            selected.push(i - this.state.skip);
          }
        }

        this.setState({
          selected: contactSelected,
          selectedRows: selected,
        });
      }
    } else {
      this.setState({
        selected: [],
        selectedRows: [],
      });
    }
  }
  /**
   * DELETE RECORD
   */
  bulkActionGo() {
    var numRows = this.state.selectedRows.length;
    if (this.state.bulkAction == "deleteSelected") {
      this.props.show("alert_delete", {
        name: numRows + "",
        action: () => this.handleDelete(),
      });
    }
  }
  handleDelete() {
    //map selected to correct numbers
    var selectedIds = [];
    for (let i = 0; i < this.state.selected.length; i++) {
      if (this.state.selected[i] == 1) {
        selectedIds.push(i);
      }
    }
    this.props.bulkDelete("delete", selectedIds, this.state.limit, this.state.skip, this.state.filters, this.state.searchText, this.state.orderBy);
    this.setState({
      selected: [],
      selectedRows: [],
    });
  }

  render() {
    //server side options
    const { options } = this.state;
    const { title, columns, data, totalCount, editTrue, edit, deleted, search, multipleSelect } = this.props;
    options.serverSide = true;
    options.count = totalCount;
    options.onTableInit = (action, tableState) => {
      const limit = tableState.rowsPerPage;
      const skip = tableState.page * tableState.rowsPerPage;
      if (action == "tableInitialized") {
        this.setState({
          limit,
          skip,
          serverSideFilterList: tableState.filterList,
          columns: tableState.columns,
        });
        this.props.filterFunc(limit, skip);
      }
    };
    options.onTableChange = (action, tableState) => {
      const limit = tableState.rowsPerPage;
      const skip = tableState.page * tableState.rowsPerPage;
      var selected = [];
      if (this.state.selected.length > 0) {
        for (let i = skip; i < limit + skip && i < this.state.selected.length; i++) {
          if (this.state.selected[i] == 1) {
            selected.push(i - skip);
          }
        }
      }
      switch (action) {
        case "propsUpdate":
          tableState.filterList = this.state.serverSideFilterList;
          break;
        case "changePage":
        case "changeRowsPerPage":
          //filter = getFilters(tableState.filterList, tableState.columns);

          this.setState({ limit, skip, selectedRows: selected });
          this.props.filterFunc(limit, skip, this.state.filters, this.state.searchText, this.state.orderBy);
          break;
      }
    };

    options.onFilterChange = (column, filterList, type) => {
      if (type == "chip") {
        var filter = getFilters(filterList, this.state.columns);
        this.props.filterFunc(this.state.limit, this.state.skip, filter, this.state.searchText, this.state.orderBy);
        this.setState({
          filters: filter,
          serverSideFilterList: filterList,
          selected: [],
          selectedRows: [],
        });
      }
    };

    options.onSearchChange = (searchText) => {
      if (searchText == null) {
        this.setState({ searchText: "" });
        this.triggerSearch("");
      } else if (searchText.length > 1) {
        clearInterval(this.searchInterval);
        this.searchInterval = setInterval(this.triggerSearch, 1000, searchText);
      }
    };

    options.onSearchClose = () => {
      this.setState({ searchText: "" });
      this.triggerSearch("");
    };

    options.onColumnSortChange = (column, direction) => {
      var orderString = column;
      var sorted = { name: column };
      if (direction == "descending") {
        orderString += " DESC";
        sorted.direction = "desc";
      } else {
        orderString += " ASC";
        sorted.direction = "asc";
      }
      this.setState({
        orderBy: [orderString],
        sorted: sorted,
      });
      this.props.filterFunc(this.state.limit, this.state.skip, this.state.filters, this.state.searchText, [orderString]);
    };

    options.sort = true;
    options.search = true;
    if (!search) {
      options.search = true;
    }

    options.selectableRows = "multiple";

    options.onRowsSelect = this.handleSelect;
    options.rowsSelected = this.state.selectedRows;
    options.searchText = this.state.searchText;
    options.filterType = "dropdown";
    options.serverSideFilterList = this.state.serverSideFilterList;
    options.customFilterDialogFooter = (filterList) => {
      return (
        <div style={{ marginTop: "40px" }}>
          <Button className="btn-success text-white" variant="contained" onClick={() => this.handleFilterSubmit(filterList)}>
            Search
          </Button>
        </div>
      );
    };
    options.customToolbarSelect = (selectedRows, displayData, setSelectedRows) => (
      <div className="p-10">
        Bulk Action : &nbsp;
        <FormControl>
          <Select className="formSelect" value={this.state.bulkAction} onChange={this.changeBulkAction}>
            <MenuItem disabled value="">
              <em>Select the action</em>
            </MenuItem>
            <MenuItem value="deleteSelected">Delete Selected</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={this.bulkActionGo}>GO</Button>
      </div>
    );

    if (editTrue) {
      var cols = [
        ...columns,
        {
          label: "Action",
          name: "action",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
              return (
                <div>
                  <IconButton
                    size="small"
                    onClick={() => {
                      edit(tableMeta.rowData[0]);
                    }}
                  >
                    <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                  </IconButton>
                  <IconButton
                    size="small"
                    className="tableDeleteIcon"
                    onClick={() => {
                      deleted(tableMeta.rowData[0], tableMeta.rowData[1]);
                    }}
                  >
                    <Icon icon={baselineDeleteForever} color="#595959" width="1.5rem" height="1.5rem" />
                  </IconButton>
                </div>
              );
            },
          },
        },
      ];
    } else {
      var cols = [...columns];
    }

    return (
      <React.Fragment>
        <MuiThemeProvider theme={myTheme}>
          {/* <MUIDataTable title={title} columns={columns} data={data} options={options} /> */}
          <MUIDataTable title={title} columns={cols} data={data} options={options} />
        </MuiThemeProvider>
        {console.log(this.props.totalCount)}
      </React.Fragment>
    );
  }
}
// export default ServerRecordsList;

const mapStateToProps = ({ crmState }) => {
  const { customerState, crmField } = crmState;
  const { customerList } = customerState;
  return { customerList };
};
// const mapStateToProps = ({ crmState })
export default connect(mapStateToProps, { show })(ServerRecordsList);
