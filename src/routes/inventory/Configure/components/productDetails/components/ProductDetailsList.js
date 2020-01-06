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

import ProductDetailsValueList from './ProductDetailsValueList'


export default class Index extends PureComponent {

  state=({
    currentProduct: null,
    ProductDetailLoading: false,
  })

  render () {

    const { loading, title, tableData, ToggleDialog } = this.props

    const columns = [
      {
        name: "value",
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
                const data = {
                  id : rowState.rowData[0],
                  name: rowState.rowData[2]
                }
                return (
                    <Edit
                      onClick={() => ToggleDialog('Edit_Detail', data)}
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
        
                if(rowState.rowData[1].length == 0){
                  
                  const data = {
                    id: rowState.rowData[0],
                    name: rowState.rowData[2],
                  }

                  return (
                    <Delete
                      onClick={() => ToggleDialog('Delete_Detail', data)}
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
      renderExpandableRow: (rowData, rowMeta) => {
        return (
          <TableRow>
            <TableCell colSpan={rowData.length} style={{padding: 0}}>

                <div style={{flex: 1, display:'flex', justifyContent: 'flex-end'}}>
                  <button onClick={()=> ToggleDialog('Create_Detail_Value', [rowData[0], rowData[2]])} style={{color:'white', borderRadius: 5, padding: 8, backgroundColor:'rgba(24,59,129,1)', marginBottom: 10, marginTop: 20, marginRight: 20}}>{`+ CREATE ITEM TO ${rowData[2].toUpperCase()} GROUP`}</button>
                </div>

                <ProductDetailsValueList
                  // title={'CAR PRODUCT VARIANT ITEM'}
                  tableData={rowData[1]}
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