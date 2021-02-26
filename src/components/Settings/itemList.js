import React from "react";

import BgCard from "Components/BgCard";
import RecordsList from "Components/RecordsList";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Add, Edit, Delete } from "@material-ui/icons";

const ItemList = ({ tableData, newItem, editItem, deleteItem, itemName }) => {
    const columns = [
        {
            label: "Name",
            name: "name"
        },
        {
            label: "Actions",
            name: "id",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <React.Fragment>
                            <Tooltip id="tooltip-icon" title={"Edit " + itemName}>
                                <IconButton
                                    aria-label="More Options"
                                    style={{ padding: 6 }}
                                    onClick={() => {
                                        editItem(value);
                                    }}
                                >
                                    <Edit style={{ fontSize: 16 }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip id="tooltip-icon" title="Delete User">
                                <IconButton
                                    aria-label="delete user"
                                    style={{ padding: 6 }}
                                    onClick={() => {
                                        deleteItem(value, tableMeta.rowData[0]);
                                    }}
                                >
                                    <Delete style={{ fontSize: 16 }} />
                                </IconButton>
                            </Tooltip>
                        </React.Fragment>
                    );
                }
            }
        }
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
            <Tooltip id="tooltip-icon" title={"Add " + itemName}>
                <IconButton className="mr-2" aria-label={"Add " + itemName} onClick={newItem}>
                    <Add />
                </IconButton>
            </Tooltip>
        )
    };

    return (
        <BgCard fullBlock>
            <RecordsList
                title={"All " + itemName}
                columns={columns}
                data={tableData}
                options={options}
            />
        </BgCard>
    );
};

export default ItemList;
