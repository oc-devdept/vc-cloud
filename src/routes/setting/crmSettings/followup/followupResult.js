import React, { Component } from "react";
import { connect } from "react-redux";
import { show, hide } from "redux-modal";

import ItemList from "Components/Settings/itemList";
import RctSectionLoader from "Components/RctSectionLoader";

// Dialogs
import AddItemDialog from "Components/Settings/itemForm";

import { getFollowupResult, deleteFollowupResult, editFollowupResult, newFollowupResult } from "Ducks/followUp";

class FollowupResult extends Component {
    constructor(props){
        super(props);        

    }

    componentDidMount(){
        this.props.getFollowupResult();
    }

    newSetting = () => {
        this.props.show("add_itemsetting_form", { addItem: this.addNewSetting, itemName: "Follow Up Result", hide: this.props.hide});

    }

    editSetting = (id) => {
        const toEdit = this.props.followupResult.find(ctype => ctype.id == id);
        const editType = { ...toEdit };
        this.props.show("add_itemsetting_form", { toEdit: editType, editItem: this.updateSetting, itemName: "Follow Up Result", hide: this.props.hide});        
    }

    deleteSetting = (id, typeName) => {
        this.props.show("alert_delete", {
            name: typeName,
            action: () => this.handleDelete(id)
        });
    }

    handleDelete = id => {
        this.props.deleteFollowupResult(id);
    }

    addNewSetting = val => {
        this.props.newFollowupResult({ name: val});
    }

    updateSetting = (id, val) => {
        this.props.editFollowupResult({ id: id, name: val});
    }

    render() {
        const { followupResult, loading } = this.props;
        return (
            <React.Fragment>
                {loading && <RctSectionLoader />}
                <ItemList 
                    newItem={this.newSetting}
                    editItem={this.editSetting}
                    deleteItem={this.deleteSetting}
                    itemName="Follow Up Result"
                    tableData={followupResult}
                />
                <AddItemDialog />
            </React.Fragment>
        )
    }    
}

const mapStateToProps = ({ followupState}) => {
    const { followupResult } = followupState;
    return { followupResult };
}
export default connect(mapStateToProps, { getFollowupResult, newFollowupResult, editFollowupResult, deleteFollowupResult, show, hide})(FollowupResult);