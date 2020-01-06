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

import ProductOptionValueList from './ProductOptionValueList'


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
        name: "selectOne",
        options: { display: "excluded", filter: false, sort: false }
      },
      {
        name: "objects",
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
        name: "EDIT",
        options: {
            filter: true,
            sort: false,
            empty: true,
            customBodyRender: (rowData, rowState) => {
                

                // [rowState.rowData[0], rowState.rowData[2]]
                const data = {
                  id: rowState.rowData[0],
                  name: rowState.rowData[3],
                  selectOne: rowState.rowData[1]
                }

                return (
                    <Edit
                      onClick={() => ToggleDialog('Edit_ProductOption', data)}
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
              
                if(rowState.rowData[2].length == 0){
                  
                  const data = {
                    id: rowState.rowData[0],
                    name: rowState.rowData[3],
                    selectOne: rowState.rowData[1]
                  }

                  return (
                    <Delete
                      onClick={() => ToggleDialog('Delete_ProductOption', data)}
                    />
                  );
                } else {
                  return null
                }
                
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
      renderExpandableRow: (rowData) => {

        const data = {
          id: rowData[0],
          name: rowData[3],
          selectOne: rowData[1]
        }

        return (
          <TableRow>
            <TableCell colSpan={rowData.length} style={{padding: 0}}>

                <div style={{flex: 1, display:'flex', justifyContent: 'flex-end'}}>
                  <button onClick={()=> ToggleDialog('Create_ProductOptionValue', data)} style={{color:'white', borderRadius: 5, padding: 8, backgroundColor:'rgba(24,59,129,1)', marginBottom: 10, marginTop: 20, marginRight: 20}}>{`+ CREATE NEW ITEM TO ${rowData[3].toUpperCase()} GROUP`}</button>
                </div>

                <ProductOptionValueList
                  // title={'CAR PRODUCT VARIANT ITEM'}
                  tableData={rowData[2]}
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