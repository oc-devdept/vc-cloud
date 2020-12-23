import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// Component Req
import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";
import { singleDeal } from "Helpers/crmURL";
import RctSectionLoader from "Components/RctSectionLoader";
import StatusBadge from "Components/StatusBadge/StatusBadge";

import NumberFormat from "react-number-format";
import { getTheDate } from "Helpers/helpers";
import Button from "@material-ui/core/Button";
import { FormLabel, FormGroup, TextField, FilledInput } from '@material-ui/core';

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
const options = Object.assign({}, listOptions);
class DealList extends Component {
//const DealList = ({ tableData, loading, title, action, noRelated }) => {
  constructor(props){
    super(props);
    this.state = {      
      limit: 20,
      skip: 0,
      filters: [],
      searchText: "",
      orderBy: [],
      serverSideFilterList: [[],[],[],[],[],[],[],[],[],[]],
      sorted: {
        name: "",
        direction: ""
      },
      columns: [],
      selected: [],
      selectedRows: []
    }
    this.triggerSearch = this.triggerSearch.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);    
  }

  handleFilterSubmit(filterList) {    
    const filter = getFilters(filterList, this.state.columns);

    this.props.getAllDeal(this.state.limit, this.state.skip, filter);
    this.setState({ filters: filter, serverSideFilterList: filterList, selected: [], selectedRows: [] });
  }

  triggerSearch(searchText) {
    clearInterval(this.searchInterval);
    this.props.getAllDeal(this.state.limit, this.state.skip, this.state.filters, searchText, this.state.orderBy);
    this.setState({ searchText: searchText, skip: 0, selected: [], selectedRows: [] });
  }

  render(){
    const { tableData, loading, title, action, noRelated, totalCount } = this.props;

    options.onTableInit = (action, tableState) => {
      const limit = tableState.rowsPerPage;
      const skip = tableState.page * tableState.rowsPerPage;
      if (action  == "tableInitialized"){
        this.setState({
          limit,
          skip,
          serverSideFilterList: tableState.filterList,
          columns: tableState.columns
        });
        this.props.getAllDeal(limit, skip);
      }
    }

    options.onTableChange = (action, tableState) => {
      const limit = tableState.rowsPerPage;
      var selected = [];
      if(this.state.selected.length > 0){
        for(let i=skip; i < limit + skip && i < this.state.selected.length; i++){
          if(this.state.selected[i] == 1){
            selected.push(i - skip);
          }
        }
      }
      switch(action){
        case "propsUpdate":
          tableState.filterList = this.state.serverSideFilterList;
          break;
        case "changePage":
        case "changeRowsPerPage":
          this.setState({ limit, skip, selectedRows: selected});
          this.props.getAllDeal(limit, skip, this.state.filters, this.state.searchText, this.state.orderBy);
          break;
      }
    };

    options.onFilterChipClose = (index, removedFilter, filterList) => {
      
      var filter = getFilters(filterList, this.state.columns);
      this.props.getAllDeal(this.state.limit, this.state.skip, filter, this.state.searchText, this.state.orderBy);
        this.setState({
          filters: filter,
          serverSideFilterList: filterList,
          selected: [],
          selectedRows: []
        })
        
    }

    options.onFilterChange = (column, filterList, type ) => { 
      /*
      var filter = getFilters(filterList, this.state.columns);
      this.props.getAllDeal(this.state.limit, this.state.skip, filter, this.state.searchText, this.state.orderBy);
        this.setState({
          filters: filter,
          serverSideFilterList: filterList,
          selected: [],
          selectedRows: []
        })
        */
    }
    

    options.onSearchChange = (searchText) => {
      if(searchText == null){
        this.setState({ searchText: ""});
        this.triggerSearch("");
      } else if(searchText.length  > 1){
        clearInterval(this.searchInterval);
        this.searchInterval = setInterval(this.triggerSearch, 1000, searchText);
      }
    }

    options.onSearchClose = () => {
      this.setState({ searchText: ""});
      this.triggerSearch("");
    };

    options.onColumnSortChange = (column, direction) => {
      var orderString = column;
      var sorted = { name: column };
      if(direction == "descending"){
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
      this.props.getAllDeal(this.state.limit, this.state.skip, this.state.filters, this.state.searchText, [orderString]);
    }

    options.customFilterDialogFooter = (filterList) => {
      return (
        <div style={{ marginTop: "40px" }}>
          <Button className="btn-success text-white" variant="contained" onClick={() => this.handleFilterSubmit(filterList)}>
            Search
          </Button>
        </div>
      );
    };

    options.search = true;
    options.searchText=  this.state.searchText;
    options.filterType ="dropdown";
    options.serverSideFilterList = this.state.serverSideFilterList;
    options.serverSide = true;
    options.count = totalCount;
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
        label: "Name",
        name: "name",
        options: {
          customBodyRender: (value, tableMeta) => {
            return (
              <NavLink to={singleDeal(tableMeta.rowData[0])}>{value}</NavLink>
            );
          },
          filter: false
        }
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
          },
          filter: true,
          filterType: 'custom',
          filterList: [],
          customFilterListRender: filterList => `Price $${filterList[0]} - $${filterList[1]} `,
          filterOptions: {
            display: (filterList, onChange, index, column) => (
                <div>
                    <FormLabel>Price Range</FormLabel>
                    <FormGroup row>
                        <TextField
                            label='min'
                            type="number"
                            value={filterList[index][0] ? filterList[index][0] : ''}                            
                            onChange={event => {
                                filterList[index][0] = event.target.value;
                                onChange(filterList[index], index, column);
                            }}
                            style={{ width: '45%', marginRight: '10%' }}
                        />
                        <TextField
                            label='max'
                            type="number"
                            value={filterList[index][1] || ''}
                            onChange={event => {
                                filterList[index][1] = event.target.value;
                                onChange(filterList[index], index, column);
                            }}
                            style={{ width: '45%' }}
                        />
                    </FormGroup>
                </div>
            ),
          },
        }
      },
      {
        label: "Stage",
        name: "stageInfo",
        options: {
          customBodyRender: value => {
            return value.name ? (
              <StatusBadge
                name={value.name}
                color={value.color}
                value={value.name}
              />
            ) : (
              ""
            );
          },
          filter: true,
          filterType: "dropdown",
          customFilterListRender: v => `Stage  ${v}`,
          filterOptions: {
              names: ["1", "2", "3", "4",],

          }
        }
      },
      {
        label: "Chance",
        name: "stageInfo",
        options: {
          filter: false,
          customBodyRender: value => {
            return value ? value.chance : "";
          }
        }
      },
      {
        label: "Closed On",
        name: "closingDate",
        options: {
          customBodyRender: value => {
            return value ? getTheDate(value) : "";
          },
          filter: false
        }
      },
      {
        label: "Customer",
        name: "customerInfo",
        options: {
          display: noRelated ? "excluded" : true,
          customBodyRender: value => {
            return value ? (
              <NavLink to={`customers/${value.id}`}>{value.name}</NavLink>
            ) : (
              ""
            );
          },
          filter: false
        }
      },
      {
        label: "Owner",
        name: "userInfo",
        options: {
          customBodyRender: value => {
            return value ? value.name : "";
          },
          filter: false
        }
      },
      {
        label: "Source",
        name: "source",
        options: {
          display: false,
          filter: false
        }
      },
      {
        label: "Type",
        name: "type",
        options: {
          display: false,
          filter: false
        }
      }
      
    ];
    options.customToolbarSelect = (
      selectedRows,
      displayData,
      setSelectRows
    ) =>
      // delete multiple function
      null;

      return (
        <div className="rct-block">
          <RecordsList
            title={title}
            columns={columns}
            data={tableData}
            options={options}           
          />
          {loading && <RctSectionLoader />}
        </div>
      );
  }


  
};

export default DealList;