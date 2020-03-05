import React, {PureComponent, Component} from "react";
import { NavLink } from "react-router-dom";
import api from "Api";

//Page req
import RecordsList from "Components/RecordsList";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import Image from 'Components/Image'
import Stock from './Cars/Stock'
import {Edit, Delete, ExpandMore} from '@material-ui/icons'

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';


const PurpleSwitch = withStyles({
  switchBase: {
    color: orange[300],
    '&$checked': {
      color: orange[500],
    },
    '&$checked + $track': {
      backgroundColor: orange[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

export default class Index extends PureComponent {

  state=({
    currentProduct: null,
    ProductDetailLoading: false,
  })

  render () {
  
    const { loading, title, tableData } = this.props
        
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        label: "NAME",
        name: "name",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value
          }
        }
      },
      {
        label: "DESCRIPTION",
        name: "description",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value
          }
        }
      },
      //  {
      //   label: "DISPLAY STATUS",
      //   name: "isActive",
      //   options: {
      //     customBodyRender: (value, tableMeta) => {
      //       return (
      //         <FormGroup row>
      //           <FormControlLabel
      //             control={
      //               <PurpleSwitch
      //                 checked={value}
      //                 onChange={(e) => console.log(e.target)}
      //                 value="checkedA"
      //               />
      //             }
      //           />
      //         </FormGroup>
      //     )
            
      //     }
      //   }
      // },
      {
        label: "IMAGE",
        name: "files",
        options: {
          customBodyRender: (value, tableMeta) => {
            if(value.length > 0){
              return (
               
                <Image
                  imageSource={value}
                  single={true}
                  thumbNail={true}

                />
              )
            } else {
              return "No image"
            }
          }
        }
      },
      {
        label: "COST PRICE",
        name: "cost_Price",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value
          }
        }
      },
      {
        label: "SELLING PRICE",
        name: "selling_Price",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value
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
                      onClick={() => this.props.ToggleDialog('Selected_Grade', rowState.rowData[0])}
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
                    onClick={() => this.props.DeleteCar(rowState.rowData[0])}
                  />
            );
          }
        }
      },
  ]

    // const listOptions = {
    //   filterType: "dropdown",
    //   responsive: "stacked",
    //   selectableRows: 'none',
    //   expandableRows: false, // Try Adding This
    //   print: false,
    //   download: false,
    //   viewColumns: false,
    //   search: false,
    //   filter: false,
    // };

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
      // onCellClick: (rowData, rowState) => this._HandleVariant(rowState),
      renderExpandableRow: (rowData, rowMeta) => {
        return (
          <TableRow>
            <TableCell colSpan={rowData.length} style={{padding: 0}}>
              <Stock
                ProductID = {rowData[0]}
              />
            </TableCell>
          </TableRow>
        );
      }
    };

    return (
    
        <RecordsList
          title={title}
          columns={columns}
          data={tableData}
          options={listOptions}
          borderRadius={"0px"}
          boxShadow={"none"}
        />
       
    );
  }
};



// customRowRender:(data, dataIndex, rowIndex) => {
//   console.log('data' + data);
//   return (
//     <div>
//       {data}{' '}{dataIndex}{' '}{rowIndex}
//     </div>
//   );
// }
// renderExpandableRow: (rowData, rowMeta) => {
//   console.log(rowData);
//   return (
//     <TableRow>
//       <TableCell colSpan={rowData.length}>
//         <div>
//           <button onClick={() => this._HandleVariant(rowMeta.rowIndex)}>Add new variant</button>
          
//         </div>
//       </TableCell>
//     </TableRow>
//   );
// }