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
import CarGradeList from './CarGradeList'


export default class Index extends PureComponent {

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
        name: "makeId",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "product",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        label: "CAR MAKE",
        name: "make",
        options: {
          customBodyRender: value => {
            return value
          }
        }
      },
      {
        label: "CAR MODEL",
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
      {
        label: "Image",
        name: "files",
        options: {
          customBodyRender: (value, tableMeta) => {
            return "value"
            // if(value.files.length > 0){
            //   return (
            //     <img
            //       src={e.files[0].url}
            //       height={100}
            //       width={100}
            //     />
            //   )
            // } else {
            //   return "No image"
            // }
          }
        }
      },
    
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
      // onCellClick: (rowData, rowState) => this._HandleVariant(rowState),
      renderExpandableRow: (rowData, rowMeta) => {


        const data = {
          MakeId: rowData[1],
          ModelId : rowData[0],
          make: rowData[3],
          model : rowData[4]
        }

        return (
          <TableRow>
            <TableCell colSpan={rowData.length} style={{padding: 0}}>

                    
                <div style={{flex: 1, display:'flex', justifyContent: 'flex-end'}}>
                    <button onClick={()=> this.props.ToggleDialog('Add_Grade', '', data)} style={{color:'white', borderRadius: 5, padding: 8, backgroundColor:'rgba(24,59,129,1)', marginBottom: 10, marginRight: 20, marginTop: 10}}>{`+ CREATE GRADE TO ${rowData[4].toUpperCase()}`}</button>
                </div>
                
                <CarGradeList
                  tableData={rowData[2]}
                  borderRadius={"0px"}
                  boxShadow={"none"}
                  ToggleDialog={this.props.ToggleDialog}
                />

            </TableCell>
          </TableRow>
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