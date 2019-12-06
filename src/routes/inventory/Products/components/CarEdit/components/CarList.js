import React, {PureComponent, Component} from "react";
import { NavLink } from "react-router-dom";
import api from "Api";

//Page req
import RecordsList from "Components/RecordsList";

import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";

import Car from './Car'

export default class Index extends Component {

  state=({
    currentProduct: null,
    ProductDetailLoading: false,
  })

  _HandleVariant = async (rowState) => {

    if(this.state.currentProduct){

      if(this.state.currentProduct.id != this.props.tableData[rowState.rowIndex].id){
        const Item = this.props.tableData[rowState.rowIndex]
        const Car = await api.get(`/products/${Item.id}`)
        this.setState({currentProduct: Car.data})
      }

    } else {

      const Item = this.props.tableData[rowState.rowIndex]
      const Car = await api.get(`/products/${Item.id}`)
      this.setState({currentProduct: Car.data})
    }
    
  }

 



  render () {
  
    const { loading, title, tableData } = this.props
    
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "productVariant",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "productDetail",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        label: "SKU",
        name: "id",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value
            // return (
            //   <NavLink to={`quotations/${tableMeta.rowData[0]}`}>{value}</NavLink>
            // );
          }
        }
      },
      {
        label: "Make",
        name: "make",
        options: {
          customBodyRender: value => {
            return value
          }
        }
      },
      {
        label: "Model",
        name: "model",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value
          }
        }
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
        label: "Cost Price",
        name: "cost_Price",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },
      {
        label: "Selling Price",
        name: "selling_Price",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },
      {
        label: "Active",
        name: "isActive",
        options: {
          customBodyRender: value => {
            return `${value}`;
          }
        }
      },
    
    ]

    const listOptions = {
      filterType: "dropdown",
      responsive: "stacked",
      selectableRows: 'none',
      selectableRowsOnClick: true,
      onCellClick: (rowData, rowState) => this._HandleVariant(rowState),
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

        <Car
          Car={this.state.currentProduct}
        />

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