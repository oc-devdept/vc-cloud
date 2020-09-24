import React from "react";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";
import RctSectionLoader from "Components/RctSectionLoader";
import RecordsList from "Components/RecordsList";
import Image from "Components/Image";
import { listOptions } from "Helpers/helpers";
import { Radio } from "@material-ui/core";

function ProductPickerDialog(props){
    
    const {
        show,
        handleHide,
        onSelect,
        loading,
        tableData,
        selected,
        target
      } = props;
    const options = Object.assign({}, listOptions);
    options.onRowClick = (rowData, rowMeta) => {
        onSelect(target, rowData[0]);
        handleHide();
    }
    options.search = true;
    const columns = [
        {
            name: "id",
            options: { display: "excluded", filter: false, sort: false }
        },
        {
            label: " ",
            name: "id",
            options: {
              filter: false,
              sort: false,
              customBodyRender: value => (
                <Radio value={value} checked={selected == value} size="small" />
              )
            }
        },
        {
            label: "Name",
            name: "name"            
        },
        {
            label: "Model",
            name: "model"
        },
        {
            label: "Selling Price",
            name: "selling_price"            
        },
        {
            label:"Make",
            name: "make"
        },
        {
            label: "IMAGE",
            name: "image",
            options: {
                customBodyRender: (value, tableMeta) => {
                    if (value.length > 0) {
                        return (
                        <Image imageSource={value} single={true} thumbNail={true} />
                        );
                    } else {
                        return "No image";
                    }
                }
            }
        }
    ];
    return (
        <DialogRoot show={show} handleHide={handleHide} size="lg" close>
          <RecordsList
            title="Select Car"
            columns={columns}
            data={tableData}
            options={options}
          />
        </DialogRoot>
      );

}


export default connectModal({ name: "product_picker" })(ProductPickerDialog);
/*
{
    {
            label: " ",
            name: "id",
            options: {
              filter: false,
              sort: false,
              customBodyRender: value => (
                <Radio value={value} checked={selected == value} size="small" />
              )
            }
        },
        {
            label: "Name",
            name: "name"            
        },
        {
            label: "Model",
            name: "model"
        },
            label: "Selling Price",
            name: "selling_price"            
        },
        {
            label: "IMAGE",
            name: "image",
            options: {
                customBodyRender: (value, tableMeta) => {
                    if (value.length > 0) {
                        return (
                        <Image imageSource={value} single={true} thumbNail={true} />
                        );
                    } else {
                        return "No image";
                    }
                }
            }
        },
*/