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
    },
    {
        label: "TriggerName",
        name: "triggerName",
        options: {
            display: true,
            customBodyRender: (value, tableMeta) => {
                let returnVal = "";
                switch(value){
                    case "newsletter":
                        returnVal = "User signs up for newsletter";
                        break;
                    case "register":
                        returnVal = "User registers on website";
                        break;
                    case "enquiry":
                        returnVal = "User sends enquiry on website";
                        break;
                    case "pdfdownload":
                        returnVal = "User downloads PDF configurator";
                        break;
                    case "testdrive":
                        returnVal = "User makes test drive booking";
                        break;
                    case "maintenance":
                        returnVal = "User makes maintenance booking";
                        break;
                    case "canceltestdrive":
                        returnVal = "User cancels Test drive booking";
                        break;
                    case "cancelmaintenance":
                        returnVal = "User cancels Maintenance booking";
                        break;
                    case "bookingConfirmed":
                        returnVal = "Booking confirmed";
                        break;
                    case "bookingRejected":
                        returnVal = "Booking rejected";
                        break;
                    case "bookingProcessing":
                        returnVal = "Booking set to Processing";
                        break;
                    case "bookingComplete":
                        returnVal = "Booking Completed";
                        break;
                     case "bookingChangeRequest":
                        returnVal = "Booking Change request sent by customer"
                        break;
                }
                return returnVal;
            }
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
