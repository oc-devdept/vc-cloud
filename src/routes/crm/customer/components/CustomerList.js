import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import RecordsList from "Components/RecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";
import { singleCustomer, singleAccount } from "Helpers/crmURL";
import RctSectionLoader from "Components/RctSectionLoader";
import ActiveStatusBadge from "Components/StatusBadge/ActiveStatusBadge";
import Button from "@material-ui/core/Button";

// Actions
import { getAllCustomer } from "Ducks/crm/customer";

function getFilters(filterList, columns) {
  let filter = [];
  for (let i = 0; i < filterList.length; i++) {
    let list = filterList[i];
    if (list.length > 0) {
      let property = columns[i].name;
      for (let a = 0; a < list.length; a++) {
        let value = list[a];
        filter.push({ [property]: value });
      }
    }
  }
  return filter;
}

const options = Object.assign({}, listOptions);
options.customToolbarSelect = (selectedRows, displayData, setSelectRows) =>
  null;

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 0,
      skip: 0,
      filters: [],
      searchText: "",
      orderBy: [],
      serverSideFilterList: [],
      columns: [],
      sorted: {
        name: "",
        direction: ""
      }
    };
    this.triggerSearch = this.triggerSearch.bind(this);
  }

  handleFilterSubmit(filterList) {
    const filter = getFilters(filterList, this.state.columns);
    this.props.getAllCustomer(this.state.limit, this.state.skip, filter);
    this.setState({ filters: filterList, serverSideFilterList: filterList });
  }

  triggerSearch(searchText) {
    this.setState({ searchText: searchText, skip: 0 });
    clearInterval(this.searchInterval);
    this.props.getAllCustomer(
      this.state.limit,
      this.state.skip,
      this.state.filter,
      this.state.searchText,
      this.state.orderBy
    );
  }

  render() {
    const { tableData, loading, totalCount } = this.props.customerList;
    //server side options
    options.serverSide = true;
    options.count = totalCount;
    options.onTableInit = (action, tableState) => {
      const limit = tableState.rowsPerPage;
      const skip = tableState.page * tableState.rowsPerPage;
      if (action == "tableInitialized") {
        this.setState({
          limit,
          skip,
          filters: tableState.filterList,
          columns: tableState.columns
        });
        // Component did mount
        this.props.getAllCustomer(limit, skip);
      }
    };
    options.onTableChange = (action, tableState) => {
      const limit = tableState.rowsPerPage;
      const skip = tableState.page * tableState.rowsPerPage;
      let filter;
      switch (action) {
        case "propsUpdate":
          tableState.filterList = this.state.filters;
          break;
        case "changePage":
        case "changeRowsPerPage":
          filter = getFilters(tableState.filterList, tableState.columns);
          this.setState({ limit, skip });
          this.props.getAllCustomer(
            limit,
            skip,
            filter,
            this.state.searchText,
            this.state.orderBy
          );
          break;
      }
    };

    options.onFilterChange = (column, filterList, type) => {
      if (type == "chip") {
        var filter = getFilters(filterList, this.state.columns);
        this.props.getAllCustomer(
          this.state.limit,
          this.state.skip,
          filter,
          this.state.searchText,
          this.state.orderBy
        );
      }
    };

    options.onSearchChange = searchText => {
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
        sorted: sorted
      });
      this.props.getAllCustomer(
        this.state.limit,
        this.state.skip,
        this.state.filter,
        this.state.searchText,
        [orderString]
      );
    };

    options.sort = true;
    options.search = true;
    options.searchText = this.state.searchText;
    options.filterType = "dropdown";
    options.serverSideFilterList = this.state.serverSideFilterList;
    options.customFilterDialogFooter = filterList => {
      return (
        <div style={{ marginTop: "40px" }}>
          <Button
            className="btn-success text-white"
            variant="contained"
            onClick={() => this.handleFilterSubmit(filterList)}
          >
            Search
          </Button>
        </div>
      );
    };

    // Columns
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        label: "Name",
        name: "name",
        options: {
          customBodyRender: (value, tableMeta) => {
            return (
              <NavLink to={singleCustomer(tableMeta.rowData[0])}>
                {value}
              </NavLink>
            );
          },
          filter: false,
          sortDirection:
            this.state.sorted.name == "name"
              ? this.state.sorted.direction
              : "none"
        }
      },
      {
        label: "Account",
        name: "accountInfo",
        options: {
          customBodyRender: value => {
            return value ? (
              <NavLink to={singleAccount(value.id)}>{value.name}</NavLink>
            ) : (
              ""
            );
          }
        }
      },
      {
        label: "Last Contact",
        name: "lastContact",
        options: {
          filter: false,
          customBodyRender: value => {
            return value ? getDateTime(value) : "";
          }
        }
      },
      {
        label: "Email",
        name: "email",
        options: {
          filter: false,
          sortDirection:
            this.state.sorted.name == "email"
              ? this.state.sorted.direction
              : "none"
        }
      },
      {
        label: "Mobile",
        name: "mobile",
        options: {
          filter: false,
          sortDirection:
            this.state.sorted.name == "mobile"
              ? this.state.sorted.direction
              : "none"
        }
      },
      {
        label: "Company",
        name: "company",
        sortDirection:
          this.state.sorted.name == "company"
            ? this.state.sorted.direction
            : "none"
      },
      { label: "Contact Type", name: "typeInfo" },
      { label: "Source", name: "source" },
      {
        label: "Status",
        name: "isActive",
        options: {
          customFilterListOptions: {
            render: v => {
              if (v) {
                return "Active";
              } else {
                return "Not Active";
              }
            }
          },
          display: false,
          customBodyRender: value => {
            return <ActiveStatusBadge value={value} isActive={value} />;
          }
        }
      },
      {
        label: "Owner",
        name: "userInfo",
        options: {
          customBodyRender: value => {
            return value ? value.name : "";
          }
        }
      },
      {
        label: "Office",
        name: "phone",
        options: {
          display: false,
          filter: false
        }
      },
      {
        label: "DNC Expiry",
        name: "dnc_expiry",
        options: {
          display: false,
          filter: false
        }
      },
      {
        label: "DNC Status",
        name: "dnc_status",
        options: {
          display: false,
          filter: false
        }
      },
      {
        label: "Nationality",
        name: "nationality",
        options: {
          display: false,
          filter: false
        }
      }
    ];
    return (
      <div className="rct-block">
        <RecordsList columns={columns} data={tableData} options={options} />
        {loading && <RctSectionLoader />}
      </div>
    );
  }
}
const mapStateToProps = ({ crmState }) => {
  const { customerState } = crmState;
  const { customerList } = customerState;
  return { customerList };
};
export default connect(mapStateToProps, { getAllCustomer })(CustomerList);
