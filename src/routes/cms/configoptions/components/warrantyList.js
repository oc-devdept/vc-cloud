import React from "react";

import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";

import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import { Icon  } from '@iconify/react';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever';
import editFilled from '@iconify/icons-ant-design/edit-filled';
import RctSectionLoader from "Components/RctSectionLoader";

const options = Object.assign({}, listOptions);
const WarrantyList = (props) => {
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
            label: "Position",
            name: "position",            
        },
        {
            label: "Name",
            name: "name",            
        },
        {
            label: "Price",
            name: "price",            
        },
        {
            label: "Action",
            name: "action",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                return (
                    <div>
                    <IconButton size="small" onClick={()=> props.editItem(3, tableMeta.rowIndex)} >
                            <Icon 
                            className="tableEditIcon" 
                            icon={editFilled}
                            color="#595959"
                            width="1.5rem"
                            height="1.5rem"
                            />
                    </IconButton>                      
                    <IconButton 
                        size="small" className="tableDeleteIcon" onClick={() => {props.delete(3, tableMeta.rowIndex)}}>
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
        }
        
    ]
    options.search = false;
    options.filter = false;
    options.viewColumns = false;
    options.customToolbar = ()=> {
        return (
        <Button
         onClick={()=> props.addNew(3)}
         variant="contained"
         color="primary"
         size="small"
        >
        + Add New
        </Button>)
    }
    return (
        <React.Fragment>
            <RecordsList
        title={props.title}
        columns={columns}
        data={props.tableData}
        options={options}           
      />
       {props.loading && <RctSectionLoader />}
        </React.Fragment>
    )
      
      ;
}

export default WarrantyList;