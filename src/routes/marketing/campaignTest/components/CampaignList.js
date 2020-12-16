import React from "react";
import { NavLink } from "react-router-dom";

import { getTheDate, listOptions } from "Helpers/helpers";
import RecordsList from "Components/RecordsList";
import { singleCampaign } from "Helpers/marketingURL";
import RctSectionLoader from "Components/RctSectionLoader";
import { getDateTime } from "Helpers/helpers";



function CampaignList(props) {

  const { tableData, loading, title, } = props;
  const columns = [
    {
      name: "id",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
        download: false
      }
    },
    {
      label: "Name",
      name: "name",
      options: {
        customBodyRender: (value, tableMeta) => {
          // console.log("SINGLE CAMPAIGN");
          // console.log(tableMeta.rowData[0]);
          return (

            <NavLink to={singleCampaign(tableMeta.rowData[0])}>{value}</NavLink>
          );
        }
      }
    },
    {
      label: "Sent On",
      name: "sentOn",
      options: {
        display: true,
        customBodyRender: (value, tableMeta ) => {          
          if(value !== "" && value !== null){
            return getDateTime(value);
          }
          return "";
        }
      }
    },
    {
      label: "Scheduled At",
      name: "scheduledAt",
      options: {
        display: true,
        customBodyRender: (value, tableMeta ) => {          
          if(value !== "" && value !== null){
            return getDateTime(value);
          }
          return "";
        }
      }
    },
    {
      label: "Subject",
      name: "subject",
      options: {
        display: true
      }
    },
    {
      label: "List Name",
      name: "listName",
      options: {
        display: true
      }
    },
    {
      label: "List Count",
      name: "listCount",
      options: {
        display: true
      }
    }
  ];

  listOptions.customToolbarSelect = (
    selectedRows,
    displayData,
    setSelectRows
  ) =>
    // delete multiple function
    null;
  return (
    <div className="rct-block">
      <RecordsList
        title={title}
        columns={columns}
        data={tableData}
        options={listOptions}
      />
      {loading && <RctSectionLoader />}
    </div>
  );
}

export default CampaignList;
