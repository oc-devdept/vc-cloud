import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

// Component Req
import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";
import { singleBlog } from "Helpers/cmsURL";
import RctSectionLoader from "Components/RctSectionLoader";
import Image from "Components/Image";

const BlogLists = ({ tableData, loading, title }) => {
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
            name: "title",
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <NavLink to={singleBlog(tableMeta.rowData[0])}>{value}</NavLink>
                    );
                }
            }
        },
        {
            label: "Link",
            name: "title",
            options: {
                customBodyRender: (value, tableData) => {
                    return (
                        <div>
                            <a href={`http://localhost:3000/blog-post/${tableData.rowData[0]}`} target="_blank">Website Link</a>
                        </div>
                    );
                }
            }
        },
        {
            label: "Date publish",
            name: "publishDate",
            options: {
                customBodyRender: value => {
                    return (
                        <div>{moment(value).format("YYYY-MM-DD")}</div>
                    )
                }
            }
        },
        {
            label: "Image",
            name: "file",
            options: {
                customBodyRender: value => {
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
        {
            label: "Status",
            name: "status",
            options: {
                customBodyRender: value => {
                    if (value === 'publish') {
                        return (
                            <div style={{
                                backgroundColor: 'green',
                                color: 'white',
                                textAlign: 'center',
                                width: '50%',
                                padding: 5,
                                borderRadius: 5
                            }}>
                                {value}
                            </div>
                        )
                    } else {
                        return (
                            <div style={{
                                backgroundColor: 'red',
                                color: 'white',
                                textAlign: 'center',
                                width: '50%',
                                padding: 5,
                                borderRadius: 5
                            }}>
                                {value}
                            </div>
                        )
                    }
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

export default BlogLists;
