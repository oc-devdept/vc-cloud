import React, {Component} from "react";
import RecordsList from 'Components/RecordsList';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { IconButton } from "@material-ui/core";
import { Icon } from '@iconify/react';
import editFilled from '@iconify/icons-ant-design/edit-filled';

class GrapeJSMainList extends Component {

  componentDidMount(){

  }

  render(){

  const columns = [
    {
      name: "pageTitle",
      label: "Page Title"
    },    
    {
      name: "url",
      label: "Page URL"
    },
    {
      name: "lastEdit",
      label: "Last Edited Date"
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {

          console.log(tableMeta.rowData[1]);
          return (
            <div>
              <Link to={`${this.props.location.pathname}${tableMeta.rowData[1]}`}>
              <IconButton size="small" onClick={() => { <Link></Link>}}>
                  <Icon
                      className="tableEditIcon"
                      icon={editFilled}
                      color="#595959"
                      width="1.5rem"
                      height="1.5rem"
                  />
              </IconButton>   
              </Link>         
            </div>
          )
        }
      }
    }
  ]

  const data = [
    ["About Us", "/about-us", "15 Mar 20"],
    ["Terms and Conditions", "/terms-n-conditions", "17 Sep 19"]
  ]

  const options = {
    selectableRows:false,
    download: false,
    print: false,
    responsive: "simple"
  }

    return (
      <div>
          <RecordsList
            title="Page Editor"
            columns={columns}
            data={data}
            options={options}
          />
      </div>
    )
  }

}

export default GrapeJSMainList;