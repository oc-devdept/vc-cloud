import React, {Component} from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import RecordsList from 'Components/RecordsList';
import { NavLink } from "react-router-dom";

import { IconButton } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Icon } from '@iconify/react';
import editFilled from '@iconify/icons-ant-design/edit-filled';
import WebIcon from '@material-ui/icons/Web';
import RctSectionLoader from "Components/RctSectionLoader";
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import DialogRoot from "Components/Dialog/DialogRoot";
import { Delete, Add, KeyboardArrowDown, KeyboardArrowUp, Clear, ChevronLeft, ChevronRight, MenuBookSharp } from "@material-ui/icons";
import BgCard from "Components/BgCard";
import FormInput from "Components/Form/FormInput";
import Button from "@material-ui/core/Button";
import AddPageForm from './components/formDialog';

import {getAllCmspage, newCmspage, deleteCmspage,updateCmspage, getAllMenuPages, getMenu, saveCmsMenu } from 'Ducks/cms/cmspage';
import { grapeJsPageEditPage} from 'Helpers/cmsURL';

class GrapeJSMainList extends Component {
  constructor(props){
    super(props);
    this.state = {
      showForm: false,
      toEdit: null,
      currentMenu: [],
      menuPages: [],
      menuChanged: false,
      newUrl: "",
      newTitle: "",      
    }
    this.changeMenuItem = this.changeMenuItem.bind(this);
    this.addNewMenu = this.addNewMenu.bind(this);
    this.moveMenu = this.moveMenu.bind(this);
    this.removeMenu = this.removeMenu.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount(){
    this.props.getAllCmspage();
    this.props.getAllMenuPages();
    this.props.getMenu();
    
  }

  newCust =() => {
    //show popup
    this.setState({
      showForm: true,
      toEdit: null
    })
  }

  editPage = (id) => {
    const toEdit = this.props.pageState.pageList.tableData.find(typ => typ.id == id);
    const editData = { ...toEdit };
    this.setState({
      showForm: true,
      toEdit: editData
    })
  }

  hideForm =() => {
    this.setState({
      showForm: false
    })
  }

  saveForm = (data) => {
    if(this.state.toEdit != null){
      data.id = this.state.toEdit.id;
      this.props.updateCmspage(data);
    }
    else {
      this.props.newCmspage(data);
    }
    
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

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.pageState.availablePages);
    if(this.props.pageState.availablePages.length != prevProps.pageState.availablePages.length || this.props.pageState.cmsMenu.length != prevProps.pageState.cmsMenu.length){
      if(!this.state.menuChanged){        

        this.setState({
          menuPages: this.props.pageState.availablePages,
          currentMenu: this.props.pageState.cmsMenu 
        })
      }
    }
  }

  changeMenuItem(target, value){
    this.setState({
      [target]: value
    });
  }

  addNewMenu() {
    let menus = [...this.state.currentMenu];
    let pages = [...this.state.menuPages];
    if(this.state.newUrl != ""){
      //remove item
      pages = pages.filter(item => item.value != this.state.newUrl);
      menus.push({ name: this.state.newTitle, url: this.state.newUrl});
    }
    else {
      menus.push({ name: this.state.newTitle, url: "#"});
    }
    
    this.setState({
      menuChanged: true,
      newTitle: "",
      newUrl: "",
      currentMenu: menus,
      menuPages: pages
    });

  }

  moveMenu(pos, direction, parent){
    let menus = [...this.state.currentMenu];
    let moveItem, swapItem;
    if(parent){
      moveItem = menus[parent].children[pos];
    }
    else {
      moveItem = menus[pos];
    }
    if(direction == "up" && pos > 0){
      if(parent){
        swapItem = menus[parent].children[pos-1];
        menus[parent].children.splice(pos-1, 2, moveItem, swapItem);
      }
      else {
        swapItem = menus[pos-1];
        menus.splice(pos-1,2, moveItem, swapItem);
      }
      
    }
    else if(direction == "down"){      
      if(parent){
        swapItem = menus[parent].children[pos+1];
        menus[parent].children.splice(pos, 2, swapItem, moveItem);
      }
      else {
        swapItem = menus[pos+1];
        menus.splice(pos,2, swapItem, moveItem);
      }

    }
    else if(direction == "right"){
      let children = [];
      if(moveItem.children){
        children = moveItem.children;
        moveItem.children = [];
      }
      menus.splice(pos, 1, ...children);
      if(menus[pos-1].children){
        menus[pos-1].children.push(moveItem);
      }
      else {
        menus[pos-1].children = [moveItem];
      }

    }
    else if(direction == "left" && parent){
      menus[parent].children.splice(pos, 1);
      menus.splice(parent, 0, moveItem);
    }
    this.setState({
      currentMenu: menus,
      menuChanged: true
    })

  }

  removeMenu(pos, parent){
    let menus = [...this.state.currentMenu];
    let pages = [...this.state.menuPages];
    let menuItem;
    if(parent){      
      menuItem = menus[parent].children.splice(pos, 1);
    }
    else {
      let children = [];
      if(menus[pos].children){
        children = menus[pos].children;
      }
      menuItem = menus.splice(pos, 1, ...children);
    }

    pages.push({ name: menuItem[0].url, value: menuItem[0].url});
    this.setState({
      currentMenu: menus,
      menuChanged: true,
      menuPages: pages
    })
  }

  saveChanges(){
    this.props.saveCmsMenu(this.state.currentMenu);
    this.setState({      
      menuChanged: false,
    })
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
                this.editPage(tableMeta.rowData[0])                 
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
           <br /><br /><br />
           <BgCard heading="Menu Settings">

             <BgCard heading="Add new" customClasses="formline">
               <div class="row">
               <div class="col-md-3">
                <FormInput
                  label="Title"
                  value={this.state.newTitle}
                  target="newTitle"
                  handleChange={this.changeMenuItem}                
                />
                </div>
                <div class="col-md-3">
                <FormInput
                  label="URL"
                  value={this.state.newUrl}
                  target="newUrl"
                  selectValues={this.state.menuPages}
                  handleChange={this.changeMenuItem}                
                />
                </div>
                
                <div class="col-md-3">
                <Button 
               variant="contained"
               size="medium"
                color="primary"
                className="text-white"
                disabled={this.state.newTitle == ""}
                onClick={this.addNewMenu}                                          
              >
                  Add
              </Button>
                </div>
                </div>
             </BgCard>             
            { this.state.menuChanged  && (<Alert style={{marginBottom: 20}} severity="warning">Changes not saved.</Alert>) }
           <ul className="menuSetting">
             {
               this.state.currentMenu.map( (menu, index) => {
                 let children = "";
                if(menu.children){
                  children = menu.children.map((child, ci) => (
                    <li key={"child"+ci} class="child">
                     <div class="menutext">{ child.name} ({child.url }) </div> 
                      <div class="icongroup">
                        <IconButton>
                          <ChevronLeft onClick={()=> this.moveMenu(ci, "left", index)}/>
                        </IconButton>
                        
                        { index > 0 && 
                      <IconButton>
                          <KeyboardArrowUp onClick={()=> this.moveMenu(ci, "up", index)} />
                        </IconButton>
                        }
                        {
                          index < menu.children.length-1 &&                         
                        <IconButton>
                          <KeyboardArrowDown onClick={()=>this.moveMenu(ci, "down", index)} />
                        </IconButton>
                        }
                        <IconButton>
                          <Clear onClick={()=>this.removeMenu(ci, index)} />
                        </IconButton>
                      </div>
                 </li>
                  ));
                }
                 return (
                 <React.Fragment>
                 <li key={index}>
                     <div class="menutext">{ menu.name} ({menu.url }) </div> 
                      <div class="icongroup">
                      { index > 0 && 
                      <IconButton>
                          <ChevronRight onClick={()=> this.moveMenu(index, "right")}/>
                        </IconButton>
                         }
                          { index > 0 && 
                      <IconButton>
                          <KeyboardArrowUp onClick={()=>this.moveMenu(index, "up")} />
                        </IconButton>
                         }
                          {
                          index < this.state.currentMenu.length-1 && 
                        <IconButton>
                          <KeyboardArrowDown onClick={()=>this.moveMenu(index, "down")} />
                        </IconButton>
                        }
                        <IconButton>
                          <Clear onClick={()=>this.removeMenu(index)} />
                        </IconButton>
                      </div>
                 </li> 
                 { children }
                 </React.Fragment>
                 )
               })
             }
           
           </ul>
           <Button 
               variant="contained"
               size="medium"
                color="primary"
                className="text-white"
                onClick={this.saveChanges}                                          
              >
                  Save Changes
              </Button>
           </BgCard>
           

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
export default connect(mapStateToProps, { show, getAllCmspage, newCmspage, updateCmspage, deleteCmspage, getAllMenuPages, getMenu, saveCmsMenu })(GrapeJSMainList);