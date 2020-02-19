import React from "react";
import RecordsList from "Components/RecordsList";
import { getTheDate } from "Helpers/helpers";
import { IconButton, Button, TableRow, TableCell } from "@material-ui/core";
import { Edit, Delete, FilterDrama } from "@material-ui/icons";

function AnnouncementTable({
  data,
  editAnnouncement,
  deleteAnnouncement,
  newAnnouncement
}) {
  const columns = [
    { label: "Title", name: "name", options: { filter: false } },
    {
      label: "Content",
      name: "content",
      options: { display: false, filter: false, search: false }
    },
    {
      label: "Files",
      name: "files",
      options: { display: false, filter: false, search: false }
    },
    {
      label: "Annoucement Start",
      name: "start",
      options: {
        customBodyRender: value => getTheDate(value)
      }
    },
    {
      label: "Annoucement End",
      name: "end",
      options: {
        customBodyRender: value => getTheDate(value)
      }
    },
    {
      label: "Created By",
      name: "userInfo",
      options: {
        customBodyRender: value => (value ? value.name : "")
      }
    },
    {
      name: "id",
      label: " ",
      options: {
        customBodyRender: value => (
          <React.Fragment>
            <IconButton size="small" onClick={() => editAnnouncement(value)}>
              <Edit style={{ fontSize: "1rem" }} />
            </IconButton>
            <IconButton
              className="ml-10 text-danger"
              size="small"
              onClick={() => deleteAnnouncement(value)}
            >
              <Delete style={{ fontSize: "1rem" }} />
            </IconButton>
          </React.Fragment>
        ),
        filter: false,
        search: false
      }
    }
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scrollFullHeight",
    download: false,
    print: false,
    viewColumns: false,
    elevation: 0,
    selectableRows: "none",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 30, 60, 100],
    textLabels: { body: { noMatch: "No Announcements" } },
    customToolbar: () => {
      return (
        <Button onClick={newAnnouncement} variant="contained">
          New Announcement
        </Button>
      );
    },
    expandableRows: true,
    expandableRowsOnClick: true,
    renderExpandableRow: (rowData, rowMeta) => {
      const title = rowData[0];
      const content = rowData[1];
      const files = rowData[2];
      return (
        <TableRow>
          <TableCell colSpan={4} className="px-30">
            <h2>{title}</h2>
            <p>{content}</p>
            {files.length > 0 &&
              files.map((file, key) => (
                <React.Fragment key={key}>
                  <small>
                    <a href={file.url} download>
                      {file.filename}
                    </a>
                  </small>
                  <br />
                </React.Fragment>
              ))}
          </TableCell>
        </TableRow>
      );
    }
  };
  return (
    <RecordsList
      title={"All Announcements"}
      columns={columns}
      data={data}
      options={options}
    />
  );
}

export default AnnouncementTable;
