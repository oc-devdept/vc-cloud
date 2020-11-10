import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

// Component Req
import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";
import { singleCustomer } from "Helpers/crmURL";
import RctSectionLoader from "Components/RctSectionLoader";

import NumberFormat from "react-number-format";
import { getTheDate } from "Helpers/helpers";

import { getAllPayment } from "Ducks/crm/onlinepayment";

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

class PaymentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 20,
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

  componentDidMount() {
    this.props.getAllPayment(this.state.limit, this.state.skip);
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

  render(){
    const columns = [
      {
        name: "id",
        options: {
          display: "excluded",
          filter: false,
          sort: false,
          download: false
        }
      },
      {
          name: "customer_id",
          options: {
            display: "excluded",
            filter: false,
            sort: false,
            download: false
          }
      },
      {
        label: "Name",
        name: "name"    
      },
      {
        label: "Amount",
        name: "amount",
        options: {
          customBodyRender: value => {
            return (
              <NumberFormat
                value={value}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            );
          }
        }
      },
      {
        label: "Paid",
        name: "paid" ,
        options: {
          customBodyRender: value => {
            return value ? "Paid" : "Unpaid";
          }
        }     
      },
      {
        label: "Customer",
        name: "customer_name",
        options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            return (<NavLink to={singleCustomer(tableMeta.rowData[1])}>{value}</NavLink>)
          }
        }
      },
      {
        label: "Date Paid",
        name: "datePaid",
        options: {
          customBodyRender: value => {
            return value ? getTheDate(value) : "";
          }
        }
      },
      {
        label: "Contact",
        name: "contact"
      },
      {
        label: "Billing Address",
        name: "billing"
      }    
    ];
  
   
    options.customToolbarSelect = (
      selectedRows,
      displayData,
      setSelectRows
    ) =>
      // delete multiple function
      null;
    const { tableData, loading, totalCount } = this.props.paymentList;

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
        //this.props.getAllPayment(limit, skip);
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
          this.props.getAllPayment(
            limit,
            skip,
            filter,
            this.state.searchText,
            this.state.orderBy
          );
          break;
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

    options.downloadOptions =  {
      filename: 'excel-format.csv',
      separator: ',',
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
  } ;
   options.download = true;
   options.onDownload = (buildHead, buildBody, columns, data) => {
    
      let val= `${buildHead(columns)}${buildBody(data)}`.trim();
      return val;
    
    };
    return (
      <div className="rct-block">
        <RecordsList
          title={this.props.title}
          columns={columns}
          data={tableData}
          options={options}
        />
        {loading && <RctSectionLoader />}
      </div>
    );
  }

  
};
const mapStateToProps = ({ crmState }) => {
  const { onlinepaymentState } = crmState;
  const { paymentList } = onlinepaymentState;
  return { paymentList };
};
export default connect(mapStateToProps, { getAllPayment })(PaymentList);
