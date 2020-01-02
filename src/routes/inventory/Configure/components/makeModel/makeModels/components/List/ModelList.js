import React, {PureComponent, Component} from "react";
import { NavLink } from "react-router-dom";
import api from "Api";

//Page req
import RecordsList from "Components/RecordsList";

import BgCard from "Components/BgCard";
import RctSectionLoader from "Components/RctSectionLoader";

import {Edit, Delete, ExpandMore} from '@material-ui/icons'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export default class Index extends PureComponent {

  state=({
    ModelSource: [],
    ModelLoading: true
  })

  async componentDidMount(){
    try {
      const ModelSource = await api.get(`/categories/${this.props.id}/category`);
      this.setState({ModelSource: ModelSource.data, ModelLoading: false})
    } catch (e) {
        this.setState({ModelSource: [], ModelLoading: false})
    }
  }

 
  render () {
  
    const { loading, title, tableData, ToggleDialog } = this.props

    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false }
      },
     
      {
        label: "CAR MODEL",
        name: "name",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },

      {
        label: "DESCRIPTION",
        name: "description",
        options: {
          customBodyRender: value => {
            return value;
          }
        }
      },
      {
        label: "IMAGE",
        name: "files",
        options: {
          customBodyRender: value => {
            // return value;
            if(value.length> 0){
              return (
                <img
                    src={value[0].url}
                    height={100}
                    width={100}
                    style={{objectFit:'contain'}}
                />
              )
            } else {
              return null
            }
          }
        }
      },

      {
        name: "EDIT",
        options: {
            filter: true,
            sort: false,
            empty: true,
            customBodyRender: (rowData, rowState) => {
                return (
                    <Edit
                      onClick={() => ToggleDialog('Edit_Model', rowState.rowData)}
                    />
                );
            }
        }
      },
      {
        name: "DELETE",
        options: {
            filter: true,
            sort: false,
            empty: true,
            customBodyRender: (rowData, rowState) => {
                return (
                  <Delete
                    onClick={() => ToggleDialog('Delete_Model', rowState.rowData)}
                  />
                );
            }
        }
      },
    
    ]

 
    const listOptions = {
      filterType: "dropdown",
      responsive: "stacked",
      selectableRows: 'none',
      expandableRows: false, // Try Adding This
      print: false,
      download: false,
      viewColumns: false,
      search: false,
      filter: false
    };


    return (

      <div style={{}}>

          <div style={{flex: 1, display:'flex', justifyContent: 'flex-end'}}>
            <button onClick={()=> ToggleDialog('Create_Model')} style={{color:'white', borderRadius: 5, padding: 8, backgroundColor:'rgba(24,59,129,1)', marginBottom: 10, marginTop: 20, marginRight: 20,}}>{`+ CREATE MODEL TO ${this.props.Make.toUpperCase()}`}</button>
          </div>

          <RecordsList
            title={title}
            columns={columns}
            data={this.state.ModelSource}
            options={listOptions}
            borderRadius={"0px"}
            boxShadow={"none"}
          />
        
      </div>

    );
  }
};
