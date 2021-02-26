import React, { Component } from "react";
import { connect } from "react-redux";
import { show, hide } from "redux-modal";

import ItemList from "Components/Settings/itemList";
import RctSectionLoader from "Components/RctSectionLoader";

// Dialogs
import AddItemDialog from "Components/Settings/itemForm";

import { getFollowupType, deleteFollowupType, editFollowupType, newFollowupType } from "Ducks/followUp";

class FollowupType extends Component {
    constructor(props){
        super(props);        

    }

    componentDidMount(){
        this.props.getFollowupType();
    }

    newSetting = () => {
        this.props.show("add_itemsetting_form", { addItem: this.addNewSetting, itemName: "Follow Up Type", hide: this.props.hide});

    }

    editSetting = (id) => {
        const toEdit = this.props.followupType.find(ctype => ctype.id == id);
        const editType = { ...toEdit };
        this.props.show("add_itemsetting_form", { toEdit: editType, editItem: this.updateSetting, itemName: "Follow Up Type", hide: this.props.hide});        
    }

    deleteSetting = (id, typeName) => {
        this.props.show("alert_delete", {
            name: typeName,
            action: () => this.handleDelete(id)
        });
    }

    handleDelete = id => {
        console.log(id);
        this.props.deleteFollowupType(id);
    }

    addNewSetting = val => {
        this.props.newFollowupType({ name: val});
    }

    updateSetting = (id, val) => {
        this.props.editFollowupType({ id: id, name: val});
    }

    render() {
        const { followupType, loading } = this.props;
        return (
            <React.Fragment>
                {loading && <RctSectionLoader />}
                <ItemList 
                    newItem={this.newSetting}
                    editItem={this.editSetting}
                    deleteItem={this.deleteSetting}
                    itemName="Follow Up Type"
                    tableData={followupType}
                />
                <AddItemDialog />
            </React.Fragment>
        )
    }    
}

const mapStateToProps = ({ followupState}) => {
    const { followupType } = followupState;
    return { followupType };
}
export default connect(mapStateToProps, { getFollowupType, newFollowupType, editFollowupType, deleteFollowupType, show, hide})(FollowupType);