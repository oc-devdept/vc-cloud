import React, {PureComponent, Component} from "react";
import { NavLink } from "react-router-dom";
import api from "Api";

//Page req
import RecordsList from "Components/RecordsList";

import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";

import {Edit, Delete, ExpandMore} from '@material-ui/icons'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import ModelList from './ModelList'

export default class Index extends PureComponent {

  state=({
    currentProduct: null,
    ProductDetailLoading: false,

  })

 

  render () {
  
    const { loading, title, tableData, ToggleDialog } = this.props
    
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },
     
      {
        label: "CAR MAKE",
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
            // return value;
            if(value.length> 0){
              return (
                <img
                    src={value[0].url}
                    height={100}
                    width={100}
                    style={{objectFit:'contain'}}
                />
              )
            } else {
              return null
            }
          }
        }
      },
      {
        name: "EDIT",
        options: {
            filter: true,
            sort: false,
            empty: true,
            customBodyRender: (rowData, rowState) => {
                return (
                    <Edit
                      onClick={() => ToggleDialog('Edit_Make', rowState.rowData)}
                    />
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
                  <Delete
                    onClick={() => ToggleDialog('Delete_Make', rowState.rowData)}
                  />
                );
            }
        }
      }

    ]

  
    const listOptions = {
      filterType: "dropdown",
      responsive: "stacked",
      selectableRows: 'none',
      expandableRows: true, // Try Adding This
      print: false,
      download: false,
      viewColumns: false,
      search: false,
      filter: false,
      renderExpandableRow: (rowData, rowMeta) => {


        return (
          <TableRow>
            <TableCell colSpan={rowData.length} style={{padding: 0}}>
                <ModelList
                  id={rowData[0]}
                  Make={rowData[1]}
                  ToggleDialog={ToggleDialog}
                />
            </TableCell>
          </TableRow>
        );
      }
    };


    return (

      <div>

        <BgCard fullBlock>
            <RecordsList
              title={title}
              columns={columns}
              data={tableData}
              options={listOptions}
            />
          {loading && <RctSectionLoader />}
        </BgCard>

      
      </div>

    );
  }
};
