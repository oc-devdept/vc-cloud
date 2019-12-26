import React, {PureComponent, Component} from "react";
import { NavLink } from "react-router-dom";
import api from "Api";

//Page req
import RecordsList from "Components/RecordsList";

import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";
import {Edit, Delete, ExpandMore} from '@material-ui/icons'


export default class Index extends Component {

  state=({
    currentProduct: null,
    ProductDetailLoading: false,
  })

  // _HandleVariant = async (rowState) => {

  //   if(this.state.currentProduct){

  //     if(this.state.currentProduct.id != this.props.tableData[rowState.rowIndex].id){
  //       const Item = this.props.tableData[rowState.rowIndex]
  //       const Car = await api.get(`/products/${Item.id}`)
  //       this.setState({currentProduct: Car.data})
  //     }

  //   } else {

  //     const Item = this.props.tableData[rowState.rowIndex]
  //     const Car = await api.get(`/products/${Item.id}`)
  //     this.setState({currentProduct: Car.data})
  //   }
    
  // }

 



  render () {
  
    const { loading, title, tableData } = this.props

    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },
      // {
      //   label: "SKU",
      //   name: "id",
      //   options: {
      //     customBodyRender: (value, tableMeta) => {
      //       return value
      //       return (
      //         <NavLink to={`quotations/${tableMeta.rowData[0]}`}>{value}</NavLink>
      //       );
      //     }
      //   }
      // },
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
        name: "EDIT",
        options: {
            filter: true,
            sort: false,
            empty: true,
            customBodyRender: (rowData, rowState) => {
                return (
                    <Edit
                      onClick={() => console.log('Edit!')}
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
                    onClick={() => console.log('Delete!')}
                  />
                );
            }
        }
      },
    
    ]

    const listOptions = {
      filterType: "dropdown",
      responsive: "stacked",
      selectableRows: 'none',
      selectableRowsOnClick: true,
      print: false,
      download: false,
      viewColumns: false,
      search: false,
      filter: false,
      // onCellClick: (rowData, rowState) => this._HandleVariant(rowState),
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