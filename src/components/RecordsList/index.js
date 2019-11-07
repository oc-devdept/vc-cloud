import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
const myTheme = createMuiTheme({
  overrides: {
    MUIDataTable: {
      responsiveScroll: {
        maxHeight: "auto"
      }
    },
    MuiPaper: {
      rounded: { borderRadius: "15px" }
    },
    MuiTableCell: {
      root: { fontFamily: "Lato", borderBottom: "none" }
    },
    MuiTypography: {
      root: {
        fontFamily: "Lato!important"
      },
      h6: { fontSize: "1rem" }
    },
    MUIDataTableBodyRow: {
      root: {
        "&:nth-child(odd)": {
          backgroundColor: "#f8f8f8a1"
        }
      }
    }
  }
});

export default function RecordsList(props) {
  const { title, columns, data, options, style } = props;
  return (
    <MuiThemeProvider theme={myTheme}>
      <MUIDataTable
        title={title}
        columns={columns}
        data={data}
        options={options}        
      />
    </MuiThemeProvider>
  );
}
