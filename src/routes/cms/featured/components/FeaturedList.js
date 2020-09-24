import React, {  Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";

import { listOptions, getDateTime } from "Helpers/helpers";
import RecordsList from "Components/RecordsList";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import FeaturedCarList from './FeaturedCarList';
//icon
import { IconButton } from "@material-ui/core";
import { Icon  } from '@iconify/react';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever';
import editFilled from '@iconify/icons-ant-design/edit-filled';



const options = Object.assign({}, listOptions);

//Actions
import { getAllFeatured, deleteFeaturedSection } from "Ducks/cms/featured";

class FeaturedList extends Component {
    constructor(props){
        super(props);
        this.handleSingleDelete = this.handleSingleDelete.bind(this);
        this.delete = this.delete.bind(this);

    }

    componentDidMount(){
        this.props.getAllFeatured();
        
    }

    handleSingleDelete(custId) {
        this.props.deleteFeaturedSection(custId);   
    }

    delete(custID, custname) {
        this.props.show("alert_delete", {
            name: custname,
            action: () => this.handleSingleDelete(custID)
        });
    }


    render(){
        const { loading, title, tableData } = this.props.sectionList;
        options.responsive = "stacked";
        options.expandableRows = true;
        options.rowsExpanded = [];
        for(let i=0; i < tableData.length; i++){
            if(tableData[i].expanded){
                console.log("expanding");
                options.rowsExpanded.push(i);
            }
        }
        options.renderExpandableRow =  (rowData, rowMeta) => {
            return (
                <TableRow>
                    <TableCell colSpan={rowData.length} className="px-20">
                        <FeaturedCarList parentId={rowData[0]} parentName={rowData[1]} newCar={this.props.newCar} />
                    </TableCell>
                </TableRow>
            )
        }
        
        const columns = [
            {
                name: "id",
                options: { display: "excluded", filter: false, sort: false }
            },
            {
                name: "name",
                label: "Category Name",            
            },
            {
                name: "position",
                label: "Position"
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
        return(

            <RecordsList
              title={title}
              columns={columns}
              data={tableData}
              options={options}
            />
        )
    }
}
const mapStateToProps = ({ cmsState }) => {
    const { featuredState } = cmsState;
    const { sectionList } = featuredState;
    return { sectionList };
}
export default connect(mapStateToProps, { show, getAllFeatured, deleteFeaturedSection} )(FeaturedList)