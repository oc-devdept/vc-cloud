import React, { Component } from "react";
import { connect } from "react-redux";
import { show, hide } from "redux-modal";

import ItemList from "./components/typeList";
import RctSectionLoader from "Components/RctSectionLoader";

// Dialogs
import AddItemDialog from "./components/typeForm";

import { getCalendarSettings, deleteCalendarSetting, updateCalendarSettings, newCalendarSetting } from "Ducks/calendar";

class BookingType extends Component {
    constructor(props){
        super(props);        

    }

    componentDidMount(){
        this.props.getCalendarSettings();
    }

    newSetting = () => {
        this.props.show("add_calsetting_form", { addItem: this.addNewSetting, itemName: "Booking Type settings", hide: this.props.hide});

    }

    editSetting = (id) => {
        const toEdit = this.props.calendarSettings.find(ctype => ctype.id == id);
        const editType = { ...toEdit };
        this.props.show("add_calsetting_form", { toEdit: editType, editItem: this.updateSetting, itemName: "Booking Type settings", hide: this.props.hide});        
    }

    deleteSetting = (id, typeName) => {
        this.props.show("alert_delete", {
            name: typeName,
            action: () => this.handleDelete(id)
        });
    }

    handleDelete = id => {        
        this.props.deleteCalendarSetting(id);
    }

    addNewSetting = val => {
        console.log(val);
        this.props.newCalendarSetting({ name: val.name, settingType: "booking", value: val.value});
    }

    updateSetting = (val) => {
        this.props.updateCalendarSettings({ ...val});
    }

    render() {
        const { calendarSettings  } = this.props;
        return (
            <React.Fragment>                
                <ItemList 
                    newItem={this.newSetting}
                    editItem={this.editSetting}
                    deleteItem={this.deleteSetting}
                    itemName="Booking Type setting"
                    tableData={calendarSettings}
                />
                <AddItemDialog />
            </React.Fragment>
        )
    }    
}

const mapStateToProps = ({ calendarState}) => {
    const { settings } = calendarState;
    let bookingtypes = settings.filter(item => item.settingType == "booking");
    return { calendarSettings: bookingtypes };
}
export default connect(mapStateToProps, { getCalendarSettings, deleteCalendarSetting, updateCalendarSettings, newCalendarSetting, show, hide})(BookingType);