import React, {PureComponent, Component} from "react";

//Page req
import RecordsList from "Components/RecordsList";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import Image from 'Components/Image'
import {Edit, Delete, ExpandMore, Done} from '@material-ui/icons'


// name: "Black"
// price: 321
// isDefault: false
// id: "5e5765e3190b9d06f92a50eb"
// productId: "5e4cfcdd02b1c204891deb37"
// productVariantId: "5de4dd0c2578449a9b38551b"
// files: [{…}]
// images: (4) [{…}, {…}, {…}, {…}]

export default class Index extends PureComponent {

  state=({
    currentProduct: null,
    ProductDetailLoading: false,
  })

  render () {

    const { loading, title, tableData, _StockView } = this.props
        
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },
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
        label: "NAME",
        name: "name",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value
          }
        }
      },
      {
        label: "PRICE",
        name: "price",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value
          }
        }
      },
      {
        name: "VIEW STOCK ORDER",
        options: {
            filter: true,
            sort: false,
            empty: true,
            customBodyRender: (rowData, rowState) => {
                return (
                    <Edit
                      onClick={() => _StockView(rowState.rowData[0])}
                    />
                );
            }
        }
      },
      // {
      //   label: "STOCK",
      //   name: "stock",
      //   options: {
      //     customBodyRender: (value, tableMeta) => {
      //       return value? value.quantity: 0
      //     }
      //   }
      // }
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
