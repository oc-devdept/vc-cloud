import React from "react";
import { NavLink } from "react-router-dom";

// Component Req
import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";
import { singleCar } from "Helpers/cmsURL";
import RctSectionLoader from "Components/RctSectionLoader";

const CarLists = ({ tableData, loading, title, action, noRelated }) => {
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
                    return (
                        <NavLink to={singleCar(tableMeta.rowData[0])}>{value}</NavLink>
                    );
                }
            }
        },
        // {
        //     label: "Category",
        //     name: "category",
        //     options: {
        //         customBodyRender: value => {
        //             return (
        //                 <div>category</div>
        //             );
        //         }
        //     }
        // },
        // {
        //     label: "Cover Photo",
        //     name: "coverPhoto",
        //     options: {
        //         customBodyRender: value => {
        //             return value.name ? (
        //                 <div>cover</div>
        //             ) : (
        //                 ""
        //             );
        //         }
        //     }
        // },
        // {
        //     label: "Grade Info",
        //     name: "gradeInfo",
        //     options: {
        //         filter: false,
        //         customBodyRender: value => {
        //             return value ? value.chance : "";
        //         }
        //     }
        // },
        // {
        //     label: "Description",
        //     name: "description",
        //     options: {
        //         customBodyRender: value => {
        //             return value ? value : "";
        //         }
        //     }
        // },
        // {
        //     label: "360",
        //     name: "360",
        //     options: {
        //         display: noRelated ? "excluded" : false,
        //         customBodyRender: value => {
        //             return value ? (
        //                 <div>Yes</div>
        //             ) : (
        //                 <div>No</div>
        //             );
        //         }
        //     }
        // }
    ];
    listOptions.customToolbarSelect = (
        selectedRows,
        displayData,
        setSelectRows
    ) =>
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
};

export default CarLists;
