import React, {  Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import { listOptions, getDateTime } from "Helpers/helpers";
import RecordsList from "Components/RecordsList";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Image from "Components/Image";
//icon
import { IconButton } from "@material-ui/core";
import { Icon  } from '@iconify/react';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever';
import editFilled from '@iconify/icons-ant-design/edit-filled';

import { getSingleFeatured, deleteFeaturedCar } from "Ducks/cms/featured";
const options = Object.assign({}, listOptions);

class FeaturedCarList extends Component {
    constructor(props){
        super(props);
        this.handleSingleDelete = this.handleSingleDelete.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount(){
        let needLoad = true;
        let tableData = this.props.sectionList.tableData;     
        if(tableData.length > 0){
            for(let i=0; i < tableData.length; i++){
                if(tableData[i] == this.props.parentId && tableData.cars !== undefined){
                    needLoad = false;
                }
            }
        }
        if(needLoad){
            this.props.getSingleFeatured(this.props.parentId);
        }        
    }

    addNewCar = () =>{
        this.props.newCar(this.props.parentId);
    }

    handleSingleDelete(custId) {
        this.props.deleteFeaturedCar(custId);   
    }

    delete(custID, custname) {
        this.props.show("alert_delete", {
            name: custname,
            action: () => this.handleSingleDelete(custID)
        });
    }



    render(){
        const { title, tableData } = this.props.sectionList;
        let carData = [];
        for(let i=0; i < tableData.length; i++){
            if(tableData[i].id == this.props.parentId && tableData[i].cars){
                carData = tableData[i].cars;
            }
        }        
        const columns = [
            {
                name: "id",
                options: { display: "excluded", filter: false, sort: false }
            },
            {
                label: "Name",
                name: "name",                
            },
            {
                label: "Position",
                name: "position"
            },
            {
                label: "Image",
                name: "image",
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        if(value.length > 0){
                            return (
                            <Image imageSource={value} single={true} thumbNail={true} />
                            )
                        }
                        else {
                            return (<div></div>)
                        }                              
                    },              
                }
            },
            {
                label: "Selected",
                name: "featured",
                options: {
                    customBodyRender: (value, tableMeta) => {
                        if(value){
                            return value.join();
                        }
                        else {
                            return "";
                        }
                        
                    }
                }
            },
            {
                label: "Action",
                name: "action",
                options: {
                  filter: false,
                  sort: false,
                  customBodyRender: (value, tableMeta) => {
                    return (
                      <div>                      
                      <IconButton 
                           size="small" className="tableDeleteIcon" onClick={() => {this.delete(tableMeta.rowData[0], tableMeta.rowData[1])}}>
                        <Icon
                          icon={baselineDeleteForever}
                          color="#595959" 
                          width="1.5rem"
                          height="1.5rem"
                        />
                      </IconButton>
                    </div>
                    )
                  }
                }
              },
        ]
        options.search = false;
        options.filter = false;
        options.viewColumns = false;
        options.customToolbar = ()=> {
            return (
            <Button
             onClick={this.addNewCar}
             variant="contained"
             color="primary"
             size="small"
            >
            + Add Car to {this.props.parentName}
            </Button>)
        }
        return (
        <RecordsList
            title={title}
            columns={columns}
            data={carData}
            options={options}           
          />);
    }
}
const mapStateToProps = ({ cmsState }) => {
    const { featuredState } = cmsState;
    const { sectionList } = featuredState;
    return { sectionList };
}
export default connect(mapStateToProps, { show, getSingleFeatured, deleteFeaturedCar} )(FeaturedCarList)