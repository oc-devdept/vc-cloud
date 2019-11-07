import React from "react";

import BgCard from "Components/BgCard";
import RecordsList from "Components/RecordsList";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { PersonAdd, Edit } from "@material-ui/icons";

import RctSectionLoader from "Components/RctSectionLoader";

const UsersList = ({ tableData, loading, action }) => {
  const columns = [
    {
      label: "Name",
      name: "name"
    },
    { label: "Email", name: "email" },
    {
      label: "Mobile",
      name: "baseContact",
      options: { customBodyRender: value => (value ? value.mobile : "") }
    }
    // {
    //   label: "Actions",
    //   name: "id",
    //   options: {
    //     filter: false,
    //     customBodyRender: value => {
    //       return (
    //         <React.Fragment>
    //           <Tooltip id="tooltip-icon" title="Edit Role">
    //             <IconButton
    //               aria-label="More Options"
    //               style={{ padding: 6 }}
    //               onClick={() => {
    //                 action.openUserControlDialog(value);
    //               }}
    //             >
    //               <Edit style={{ fontSize: 16 }} />
    //             </IconButton>
    //           </Tooltip>
    //         </React.Fragment>
    //       );
    //     }
    //   }
    // }
  ];

  const options = {
    filterType: "multiselect",
    responsive: "scrollMaxHeight",
    download: false,
    print: false,
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 15,
    viewColumns: false,
    rowsPerPageOptions: [15, 30, 60, 100],
    textLabels: { body: { noMatch: "No data to display" } },
    customToolbar: () => (
      <Tooltip id="tooltip-icon" title="Add User">
        <IconButton
          className="mr-2"
          aria-label="Add User"
          onClick={action.openAddUserDialog}
        >
          <PersonAdd />
        </IconButton>
      </Tooltip>
    )
  };

  return (
    <BgCard fullBlock>
      <RecordsList
        title={"All Users"}
        columns={columns}
        data={tableData}
        options={options}
      />
      {loading && <RctSectionLoader />}
    </BgCard>
  );
};

export default UsersList;
