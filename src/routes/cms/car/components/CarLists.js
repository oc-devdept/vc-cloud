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
        {
            label: "Category",
            name: "categoryName",
            options: {
                customBodyRender: value => {
                    return (
                        <div>{value}</div>
                    );
                }
            }
        }
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
