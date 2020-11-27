import React from "react";
import RecordsList from "Components/RecordsList";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import { Icon } from '@iconify/react';
import editFilled from '@iconify/icons-ant-design/edit-filled';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever';
// function getFilters(filterList, columns) {
//   let filter = [];
//   for (let i = 0; i < filterList.length; i++) {
//     let list = filterList[i];
//     if (list.length > 0) {
//       let property = columns[i].name;
//       for (let a = 0; a < list.length; a++) {
//         let value = list[a];
//         filter.push({ [property]: value });
//       }
//     }
//   }
//   return filter;
// }

function UserEmailTable(props) {
  // const { tableData, onSelectRow, totalCount, changeUserQuota,
  //   tableStateChange, isServer, searchText, filterList, handleFilterSubmit } = props;

    const { tableData } = props;
  const columns = [
    // { label: "Company", name: "companyName" },
    { label: "Email", name: "email", options: { filter: false } },
    { label: "Test Drive", name: "testDrive", 
    options: {
      filter: true,
      customBodyRender: value => (
        value ? ( 
          <React.Fragment>
          <CheckIcon style={{color : "#388557"}} />
         </React.Fragment >
         ) : (
          <React.Fragment>
          <ClearIcon style={{color : "#C62C2A"}}/>
         </React.Fragment >
         )
        
      
      ),
    }
  },
    { label: "Maintenance", name: "maintenance",    options: {
      filter: true,
      customBodyRender: value => (
        value ? ( 
          <React.Fragment>
          <CheckIcon style={{color : "#388557"}}/>
         </React.Fragment >
         ) : (
          <React.Fragment>
          <ClearIcon  style={{color : "#C62C2A"}}/>
         </React.Fragment >
         )
      ),
    } },
    { label: "Enquiries", name: "enquiry",     options: {
      filter: true,
      customBodyRender: value => (
        value ? ( 
          <React.Fragment>
          <CheckIcon style={{color : "#388557"}}/>
         </React.Fragment >
         ) : (
          <React.Fragment>
          <ClearIcon       style={{color : "#C62C2A"}}/>
         </React.Fragment >
         )
      ),
    } },
    { label: "id", name: "id", options: { filter: false, display: false } },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value, rowData) => (
          <React.Fragment>
            <IconButton size="small"
              onClick={() => props.changeEmailSettings(rowData.rowData)}
            >
              <Icon
                className="baselineDeleteForever"
                icon={editFilled}
                color="#595959"
                width="1.5rem"
                height="1.5rem"
              />
            </IconButton>
            {/* {console.log(rowData.rowData)} */}
          </React.Fragment >
        ),
        filter: false,
        search: false
      }
    },

  ];
  const listOptions = {
    // filterType: "dropdown",
    responsive: "scrollMaxHeight",
    download: false,
    print: false,
    elevation: 0,
    textLabels: { body: { noMatch: "No data to display" } },
  }

  return (
    <RecordsList columns={columns} data={tableData} options={listOptions} />
  );
}

export default UserEmailTable;
