import React, { Component } from "react";
import { connect } from "react-redux";

import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";
import RctSectionLoader from "Components/RctSectionLoader";

import { getAllConfigs} from "Ducks/crm/config";

const options = Object.assign({}, listOptions);
options.customToolbarSelect = (selectedRows, displayData, setSelectRows) =>
  null;

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

class ConfigList extends Component {
    constructor(props){
        super(props);
        this.state = {
            limit: 0,
            skip: 0,
            filters:[],
            searchText: "",
            orderBy: [],
            serverSideFilterList: [],
            columns: [],
            sorted : {
                name: "",
                direction: ""
            }
        }
        this.triggerSearch = this.triggerSearch.bind(this);
    }

    handleFilterSubmit(filterList) {
        const filter = getFilters(filterList, this.state.columns);
        this.props.getAllConfigs(this.state.limit, this.state.skip, filter);
        this.setState({ filters: filterList, serverSideFilterList: filterList });
      }
    
      triggerSearch(searchText) {
        this.setState({ searchText: searchText, skip: 0 });
        clearInterval(this.searchInterval);
        this.props.getAllConfigs(
          this.state.limit,
          this.state.skip,
          this.state.filter,
          this.state.searchText,
          this.state.orderBy
        );
      }
      
      render() {
        const { tableData, loading, totalCount } = this.props.configList;
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
                this.props.getAllConfigs(limit, skip);
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
                this.props.getAllConfigs(
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
              this.props.getAllConfigs(
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

        options.sort = true;
        options.search = true;
        options.searchText = this.state.searchText;
        options.filterType = "dropdown";
        options.serverSideFilterList = this.state.serverSideFilterList;
        

        const columns = [
            {
              name: "id",
              options: { display: "excluded", filter: false, sort: false }
            },
            {
              label: "Date",
              name: "date"              
            },
            {
              label: "Email",
              name: "email"
            },
            {
              label: "Serial Num",
              name: "serial"
            },
            {
              label: "Download File",
              name: "file",
              options: {
                filter: false,
                customBodyRender: value => {
                  return value ? <a href={value} target="_blank">File</a> : "";
                }
              }
            }            
          ];

        const { title, optionProps, tableProps, tableStyles } = this.props;
        return (
            <div className="rct-block" {...tableStyles}>
                <RecordsList
                title={title}
                columns={columns}
                data={tableData}
                options={{ ...options, ...optionProps }}
                {...tableProps}
                />
                {loading && <RctSectionLoader />}
            </div>
        );

      }
}

const mapStateToProps = ({ crmState }) => {
    const { configState } = crmState;
    const { configList } = configState;
    return { configList };
  };
export default connect(mapStateToProps, { getAllConfigs })(ConfigList);