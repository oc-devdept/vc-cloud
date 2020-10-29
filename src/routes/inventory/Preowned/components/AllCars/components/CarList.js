import React, { PureComponent, Component } from "react";
import { NavLink } from "react-router-dom";
import api from "Api";

//Page req
import RecordsList from "Components/RecordsList";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

// import Car from './Car'
import CarGradeList from "./CarGradeList";
import Image from "Components/Image";

export default class Index extends PureComponent {
  state = {
    currentProduct: null,
    ProductDetailLoading: false
  };

  _HandleVariant = async rowState => {
    if (this.state.currentProduct) {
      if (
        this.state.currentProduct.id !=
        this.props.tableData[rowState.rowIndex].id
      ) {
        const Item = this.props.tableData[rowState.rowIndex];
        const Car = await api.get(`/products/${Item.id}`);
        this.setState({ currentProduct: Car.data });
      }
    } else {
      const Item = this.props.tableData[rowState.rowIndex];
      const Car = await api.get(`/products/${Item.id}`);
      this.setState({ currentProduct: Car.data });
    }
  };

  render() {
    const { loading, title, tableData } = this.props;

    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "makeId",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "product",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "make",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        label: "CAR MODEL",
        name: "name",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value;
          }
        }
      },
      {
        label: "DESCRIPTION",
        name: "description",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value;
          }
        }
      },
      {
        label: "IMAGE",
        name: "files",
        options: {
          customBodyRender: (value, tableMeta) => {
            if (value.length > 0) {
              return (
                <Image imageSource={value} single={true} thumbNail={true} />
              );
            } else {
              return "No image";
            }
          }
        }
      }
    ];

    const listOptions = {
      filterType: "dropdown",
      responsive: "stacked",
      selectableRows: "none",
      //expandableRows: true, // This will make it not expandable as the dropdown list
      print: false,
      download: false,
      viewColumns: false,
      search: false,
      filter: false,
      setTableProps: () => ({ size: "small" }),
      renderExpandableRow: (rowData, rowMeta) => {
        const data = {
          MakeId: rowData[1],
          ModelId: rowData[0],
          make: rowData[3],
          model: rowData[4]
        };
        return (
          <TableRow>
            <TableCell colSpan={rowData.length} style={{ padding: 0 }}>
              <CarGradeList
                modelName={rowData[4]}
                addGrade={() => this.props.ToggleDialog("Add_Grade", "", data)}
                tableData={rowData[2]}
                borderRadius={"0px"}
                boxShadow={"none"}
                ToggleDialog={this.props.ToggleDialog}
                DeleteCar={this.props.DeleteCar}
              />
              <hr />
            </TableCell>
          </TableRow>
        );
      }
    };

    return (
      <div>
        {tableData.length > 0 && (
          <RecordsList
            title={title}
            columns={columns}
            data={tableData}
            options={listOptions}
          />
        )}
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
