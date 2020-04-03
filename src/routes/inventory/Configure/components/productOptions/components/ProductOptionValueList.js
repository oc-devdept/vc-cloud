import React, { PureComponent } from "react";

//Page req
import { Edit, Delete } from "@material-ui/icons";
import { Button, IconButton } from "@material-ui/core";

import RecordsList from "Components/RecordsList";
import Image from "Components/Image";

export default class Index extends PureComponent {
  state = {
    currentProduct: null,
    ProductDetailLoading: false
  };

  render() {
    const { title, tableData, ToggleDialog, addOptionValue } = this.props;

    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        label: "Name",
        name: "name",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },
      {
        label: "Image",
        name: "files",
        options: {
          customBodyRender: value => {
            if (value.length > 0) {
              return (
                <Image imageSource={value} single={true} thumbNail={true} />
              );
            } else {
              return null;
            }
          }
        }
      },
      {
        label: "Price",
        name: "price",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },
      // {
      //   label: "IsDefault",
      //   name: "isDefault",
      //   options: {
      //     customBodyRender: value => {
      //       return `${value}`;
      //     }
      //   }
      // },
      // {
      //   label: "Editable",
      //   name: "editable",
      //   options: {
      //     customBodyRender: value => {
      //       return `${value}`;
      //     }
      //   }
      // },
      {
        name: "description",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "EDIT",
        options: {
          filter: true,
          sort: false,
          empty: true,
          customBodyRender: (rowData, rowState) => {
            // [rowState.rowData[0], rowState.rowData[2]]
            const data = {
              id: rowState.rowData[0],
              name: rowState.rowData[1],
              image: rowState.rowData[2],
              price: rowState.rowData[3],
              // isDefault: rowState.rowData[4],
              // editable: rowState.rowData[5],
              description: rowState.rowData[4]
            };
            return (
              <IconButton
                onClick={() => ToggleDialog("Edit_ProductOptionValue", data)}
                size="small"
              >
                <Edit style={{ fontSize: 14 }} />
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
            const data = {
              id: rowState.rowData[0],
              name: rowState.rowData[1],
              image: rowState.rowData[2],
              price: rowState.rowData[3],
              // isDefault: rowState.rowData[4],
              // editable: rowState.rowData[5],
              description: rowState.rowData[4]
            };
            return (
              <IconButton
                onClick={() => ToggleDialog("Delete_ProductOptionValue", data)}
                size="small"
              >
                <Delete style={{ fontSize: 14 }} />
              </IconButton>
            );
          }
        }
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
      setTableProps: () => ({ size: "small" }),
      customToolbar: () => {
        return (
          <Button onClick={addOptionValue} variant="outlined" size="small">
            + Add Product to Equipment Group
          </Button>
        );
      }
    };

    return (
      <div>
        <RecordsList
          title={title}
          columns={columns}
          data={tableData}
          options={listOptions}
          borderRadius={"0px"}
          boxShadow={"none"}
        />
      </div>
    );
  }
}

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
