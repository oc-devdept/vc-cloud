import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { show } from "redux-modal";

import RecordsList from "Components/RecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";
import { singleBanner } from "Helpers/cmsURL";
import RctSectionLoader from "Components/RctSectionLoader";
import Button from "@material-ui/core/Button";
import Image from "Components/Image";

//icon
import { IconButton } from "@material-ui/core";
import { Icon  } from '@iconify/react';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever';
import editFilled from '@iconify/icons-ant-design/edit-filled';

// Actions
import { getAllBanner, deleteBanner  } from "Ducks/cms/banner";

const options = Object.assign({}, listOptions);


class BannerList extends Component {
    constructor(props) {
        super(props);        
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }
    
    

    componentDidMount(){
        this.props.getAllBanner();
    }

    edit(custId) {
      this.props.editPage(custId);
    }
    
    
    handleSingleDelete(custId) {
        this.props.deleteBanner(custId);   
    }

    delete(custID, custname) {
        this.props.show("alert_delete", {
            name: custname,
            action: () => this.handleSingleDelete(custID)
        });
    }

    render() {
      const { tableData, loading, totalCount } = this.props.bannerList;        
    
      //server side options
      options.serverSide = false;
      options.count = totalCount;                        
      options.sort = false;
      options.search = false;
      options.filterType = "dropdown";
      options.customFilterDialogFooter = filterList => {
        return (
          <div style={{ marginTop: "40px" }}>
            <Button
              className="btn-success text-white"
              variant="contained"
              onClick={() => this.handleFilterSubmit(filterList)}
            >
              Search
            </Button>
          </div>
        );
      };
      const columns = [
        {
          name: "id",
          options: { display: "excluded", filter: false, sort: false }
        },
        {
          label: "Name",
          name: "name",
          options: {
            customBodyRender: (value, tableMeta) => {
              return (
                <NavLink to={singleBanner(tableMeta.rowData[0])}>
                  {value}
                </NavLink>
              );
            },
            filter: false,              
          }
        },
        {
          label: "Image",
          name: "images",
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
        { label: "Caption 1", name: "caption1", options: { filter: false} },
        { label: "Caption 2", name: "caption2", options: { filter: false} },        
        {
          label: "Action",
          name: "action",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
              return (
                <div>
                <IconButton size="small" onClick={ () => {this.edit(tableMeta.rowData[0])}}>
                  <Icon 
                    className="tableEditIcon" 
                    icon={editFilled}
                    color="#595959"
                    width="1.5rem"
                    height="1.5rem"
                    />
                </IconButton>
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
      ];         
        return (
          <div className="rct-block">
            <RecordsList
              
              columns={columns} data={tableData} options={options} />
              {loading && <RctSectionLoader />}
            
          </div>
        );
      }
}
const mapStateToProps = ({ cmsState }) => {
    const { bannerState } = cmsState;
    const { bannerList } = bannerState;
    return { bannerList };
  };
export default connect(mapStateToProps, { show, getAllBanner, deleteBanner })(BannerList);