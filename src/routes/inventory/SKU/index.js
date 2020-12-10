
import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { show } from "redux-modal";

import RecordsList from "Components/RecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";
import { singleBanner } from "Helpers/cmsURL";
import Button from "@material-ui/core/Button";
import Image from "Components/Image";
import RctSectionLoader from "Components/RctSectionLoader";
//icon
import { IconButton } from "@material-ui/core";
import { Icon  } from '@iconify/react';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever';
import editFilled from '@iconify/icons-ant-design/edit-filled';





class SKU_customer_list extends Component {
    render() {
        const columns = [
            {
              name: "id",
              options: { display: "excluded", filter: false, sort: false }
            },
            {
              label: "Name",
              name: "name",
              options: {
                customBodyRender: (value, tableMeta) => {
                  return (
                    <NavLink to={singleBanner(tableMeta.rowData[0])}>
                      {value}
                    </NavLink>
                  );
                },
                filter: false,              
              }
            },
            // {
            //   label: "Image",
            //   name: "images",
            //   options: {
            //     filter: false,
            //     customBodyRender: (value, tableMeta) => {
            //         if(value.length > 0){
            //           return (
            //             <Image imageSource={value} single={true} thumbNail={true} />
            //           )
            //         }
            //         else {
            //           return (<div></div>)
            //         }                              
            //     },              
            //   }
            // },
            { label: "P/N", name: "P/N", options: { filter: false} },
            { label: "Description", name: "Description", options: { filter: false} },
            { label: "GRP1", name: "GRP1", options: { filter: false} },
            { label: "GRP2", name: "GRP2", options: { filter: false} },
            { label: "NAMWE 1", name: "caption1", options: { filter: false} },
            { label: "NAMWE 1", name: "caption1", options: { filter: false} },
            { label: "NAMWE 1", name: "caption1", options: { filter: false} },
            { label: "NAMWE 1", name: "caption1", options: { filter: false} },
            { label: "NAMWE 1", name: "caption1", options: { filter: false} },
            { label: "NAMWE 1", name: "caption1", options: { filter: false} },
            { label: "Caption 2", name: "caption2", options: { filter: false} },        
            {
              label: "Action",
              name: "action",
              options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                  return (
                    <div>
                    <IconButton size="small" onClick={ () => {this.edit(tableMeta.rowData[0])}}>
                      <Icon 
                        className="tableEditIcon" 
                        icon={editFilled}
                        color="#595959"
                        width="1.5rem"
                        height="1.5rem"
                        />
                    </IconButton>
                    <IconButton 
                         size="small" className="tableDeleteIcon" onClick={() => {this.delete(tableMeta.rowData[0], tableMeta.rowData[1])}}>
                      <Icon
                        icon={baselineDeleteForever}
                        color="#595959" 
                        width="1.5rem"
                        height="1.5rem"
                      />
                    </IconButton>
                  </div>
                  )
                }
              }
            },
          ];       
    return (

          

              <div className="rct-block">
                <RecordsList
                  
                  columns={columns} data={[]} options={[]} />
                  {/* {loading && <RctSectionLoader />} */}
                
            </div>
    )

        }
}

export default (SKU_customer_list);