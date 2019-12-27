import React, {PureComponent, Component} from "react";
import { NavLink } from "react-router-dom";
import api from "Api";

//Page req
import RecordsList from "Components/RecordsList";

import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

// import Car from './Car'

export default class Index extends PureComponent {

  state=({
    currentProduct: null,
    ProductDetailLoading: false,
  })


  // id: "5df0bcf78db21fb4d95f145b"
  // name: "Jazz Test Car"
  // description: "It is the slowest car in the world"
  // isActive: true
  // cost_Price: "25000"
  // categoryId: "5de9c5bcbce4b703a335c206"
  // categoryGroupId: "5de9c553bce4b703a335c204"
  // selling_Price: "49990"

  render () {
  
    const { loading, title, tableData } = this.props
    
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
            return value
          }
        }
      },
      {
        label: "Description",
        name: "description",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value
          }
        }
      },
      {
        label: "DISPLAY STATUS",
        name: "isActive",
        options: {
          customBodyRender: (value, tableMeta) => {
            return `${value}`
          }
        }
      },
      {
        label: "IMAGE",
        name: "files",
        options: {
          customBodyRender: (value, tableMeta) => {
            if(value.length > 0){
              return (
                <img
                  src={value[0].url}
                  height={100}
                  width={100}
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
      }
  
    ]

    const listOptions = {
      filterType: "dropdown",
      responsive: "stacked",
      selectableRows: 'none',
      expandableRows: false, // Try Adding This
      print: false,
      download: false,
      viewColumns: false,
      search: false,
      filter: false,
      onRowClick: (rowData, rowState) => this.props.ToggleDialog('Selected_Grade', rowData[0])
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