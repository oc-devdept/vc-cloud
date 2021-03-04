import React, {Component} from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import RecordsList from 'Components/RecordsList';
import { NavLink } from "react-router-dom";

import { IconButton } from "@material-ui/core";
import { Icon } from '@iconify/react';
import editFilled from '@iconify/icons-ant-design/edit-filled';
import WebIcon from '@material-ui/icons/Web';
import RctSectionLoader from "Components/RctSectionLoader";
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import DialogRoot from "Components/Dialog/DialogRoot";
import { Delete } from "@material-ui/icons";

import AddPageForm from './components/formDialog';

import {getAllCmspage, newCmspage, deleteCmspage } from 'Ducks/cms/cmspage';
import { grapeJsPageEditPage} from 'Helpers/cmsURL';

class GrapeJSMainList extends Component {
  constructor(props){
    super(props);
    this.state = {
      showForm: false,
      isEdit: false
    }
  }

  componentDidMount(){
    this.props.getAllCmspage();
    
  }

  newCust =() => {
    //show popup
    this.setState({
      showForm: true,
      isEdit: false
    })
  }

  hideForm =() => {
    this.setState({
      showForm: false
    })
  }

  saveForm = (data) => {
    this.props.newCmspage(data);
    this.hideForm();
  }
  

  confirmDelete = (id, pagename) => {
    this.props.show("alert_delete", {
      name: pagename,
      action: () => this.props.deleteCmspage(id)
    })
  }

  pageEditor = (id) => {
    
    this.props.history.push(grapeJsPageEditPage(id));
    /*
    if(id == 1){
      this.props.history.push("/app/cms/pageeditor/about-us");
    }
    else {
      this.props.history.push("/app/cms/pageeditor/terms-n-conditions");
    }
    */
  }

  render(){
    const { tableData, loading } = this.props.pageState.pageList;
  const columns = [
    {
      name: "id",
      options: {
        display: "excluded", filter: false, sort: false 
      }
    },
    {
      name: "name",
      label: "Page Title"
    },    
    {
      name: "url",
      label: "Page URL"
    },
    {
      name: "isActive",
      label: "Is active",
      options: {
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return( value ? "True" : "False")
        }
      }
    },
    {
      name: "lastEdited",
      label: "Last Edited Date"
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {

          return (
            <div>
              
              <IconButton size="small" onClick={() => {                 
              }}>
                  <Icon
                      className="tableEditIcon"
                      icon={editFilled}
                      color="#595959"
                      width="1.5rem"
                      height="1.5rem"
                  />
              </IconButton>   

              <IconButton size="small">
                <WebIcon onClick={() => { 
                this.pageEditor(tableMeta.rowData[0]);
              }} />
              </IconButton> 
              <IconButton size="small">
                <Delete onClick={
                    () => this.confirmDelete(tableMeta.rowData[0], tableMeta.rowData[1])
                } />
                </IconButton>       
            </div>
          )
        }
      }
    }
  ]
/*
  const data = [
    ["About Us", "/about-us", "15 Mar 20"],
    ["Terms and Conditions", "/terms-n-conditions", "17 Sep 19"]
  ]
*/
  const options = {
    selectableRows:false,
    download: false,
    print: false,
    responsive: "simple",
    viewColumns: false
  }

    return (

      <React.Fragment>
      <Helmet title="Website pages" metaDesc="Website pages" />
      <PageTitleBar
      title="Website Pages List"
        actionGroup={{
          add: { onClick: this.newCust },
        }}
      />
          <RecordsList
            title="Page Editor"
            columns={columns}
            data={tableData}
            options={options}
          />
           {loading && <RctSectionLoader />}
        <DialogRoot show={this.state.showForm} handleHide={this.hideForm}>
          <AddPageForm saveForm={this.saveForm} toEdit={this.state.toEdit} />
        </DialogRoot>
     </React.Fragment>
    )
  }

}
const mapStateToProps = ({ cmsState}) => {
  const  { pageState} = cmsState;
  return { pageState };
}
export default connect(mapStateToProps, { show, getAllCmspage, newCmspage, deleteCmspage })(GrapeJSMainList);