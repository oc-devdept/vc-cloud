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

import { getAllFeatured, getSingleFeatured, deleteFeaturedCar } from "Ducks/cms/featured";
const options = Object.assign({}, listOptions);

class AllFeaturedCarList extends Component {
    constructor(props){
        super(props);
        this.handleSingleDelete = this.handleSingleDelete.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount(){
        
        this.props.getAllFeatured();
      
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
                name: "thumbnail",
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        if(value && value.length > 0){
                            return (
                            <Image imageSource={[{path: value}]} single={true} thumbNail={true} />
                            )
                        }
                        else {
                            return (<div></div>)
                        }                              
                    },              
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
       
        return (
        <RecordsList
            title={title}
            columns={columns}
            data={tableData}
            options={options}           
          />);
    }
}
const mapStateToProps = ({ cmsState }) => {
    const { featuredState } = cmsState;
    const { sectionList } = featuredState;
    return { sectionList };
}
export default connect(mapStateToProps, { show, getAllFeatured, getSingleFeatured, deleteFeaturedCar} )(AllFeaturedCarList)