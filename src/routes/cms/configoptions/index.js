import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import DialogRoot from "Components/Dialog/DialogRoot";

import ConfigForm from "./components/configForm";
import CoeList from './components/coeList';
import ServicingList from './components/servicingList';
import WarrantyList from './components/warrantyList';

import { getCoeSelected, newCoe, editCoe, deleteCoe, 
    getServicingSelected, newServicing, editServicing, deleteServicing,
    getWarrantySelected, newWarranty, editWarranty, deleteWarranty
 } from "Ducks/cms/configOptions";

class configOptionList extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggle: false,
            element: null,
            edit: null,
            formTitle: "",
            formSectionTitle: "",
            formDesc: ""
        }
        
    }

    componentDidMount(){
        this.props.getCoeSelected();
        this.props.getServicingSelected();
        this.props.getWarrantySelected();
    }

    restartToggle = () => {
        this.setState({
            toggle: false,
            element: null,
            edit: null            
        })
    }

    addNew = (choice) => {
        if(choice == 1){
            this.setState({
                formTitle: "Create New COE",
                formSectionTitle: "Create a new COE type",
                formDesc: "This COE type will appear on the website during configuration processs",
                toggle:true,
                element: 1
            })
        }
        else if(choice == 2){
            this.setState({
                formTitle: "Create New Servicing package",
                formSectionTitle: "Create a new Servicing package",
                formDesc: "This Servicing package will appear on the website during configuration processs",
                toggle:true,
                element: 2
            })
        }
        else if(choice == 3){
            this.setState({
                formTitle: "Create New Warranty package",
                formSectionTitle: "Create a new Warranty package",
                formDesc: "This Warranty package will appear on the website during configuration processs",
                toggle:true,
                element: 3
            })
        }
    }

    editItem = (choice, itemIndex) => {
        if(choice == 1){
            let item = this.props.coeList.tableData[itemIndex];
            this.setState({
                formTitle: "EDIT COE",
                formSectionTitle: "Edit COE",
                formDesc: "This COE type will appear on the website during configuration processs",
                toggle:true,
                element: 1,
                edit: item
            })
        }
        else if(choice == 2){
            let item = this.props.servicingList.tableData[itemIndex];
            this.setState({
                formTitle: "EDIT Servicing",
                formSectionTitle: "Edit Servicing",
                formDesc: "This Servicing package will appear on the website during configuration processs",
                toggle:true,
                element: 2,
                edit: item
            })
        }
        else if(choice == 3){
            let item = this.props.warrantyList.tableData[itemIndex];
            this.setState({
                formTitle: "EDIT Warranty",
                formSectionTitle: "Edit Warranty",
                formDesc: "This Warranty package will appear on the website during configuration processs",
                toggle:true,
                element: 3,
                edit: item
            })
        }
    }

    deleteItem = (choice, itemIndex) => {
        let item;
        if(choice == 1){
            item = this.props.coeList.tableData[itemIndex];
        }
        else if(choice == 2){
            item = this.props.servicingList.tableData[itemIndex];
        }
        else if(choice == 3){
            item = this.props.warrantyList.tableData[itemIndex];
        }
        this.props.show("alert_delete", {
            name: item.name,
            action: () => this.handleSingleDelete(choice, item.id)
        });
    }

    handleSingleDelete(choice, itemId){
        if(choice == 1){
            this.props.deleteCoe(itemId);
        }
        else if(choice == 2){
            this.props.deleteServicing(itemId);
        }
        else if(choice == 3){
            this.props.deleteWarranty(itemId);
        }
    }

    saveConfig = (data) => {       
        if(this.state.element == 1){
            if(this.state.edit != null){
                this.props.editCoe(data);
            }
            else {
                this.props.newCoe(data);
            }
            
        }
        else if(this.state.element == 2){
            if(this.state.edit != null){
                this.props.editServicing(data);
            }
            else {
                this.props.newServicing(data);
            }
            
        }
        else if(this.state.element == 3){            
            if(this.state.edit != null){
                this.props.editWarranty(data);
            }
            else {
                this.props.newWarranty(data);
            }
            
        }
    }

    render(){
        return (
            <React.Fragment>
                <Helmet title="COE, Warranty and Servicing" metaDesc="COE, Warranty and Servicing" />
                <PageTitleBar
                title="COE, Warranty and Servicing"                
                />
                <CoeList title="COE Selections" tableData={this.props.coeList.tableData} loading={this.props.coeList.loading} addNew={this.addNew} editItem={this.editItem} delete={this.deleteItem} />
                <br /><br />
                <ServicingList title="Servicing Packages" tableData={this.props.servicingList.tableData} loading={this.props.servicingList.loading} addNew={this.addNew} editItem={this.editItem} delete={this.deleteItem} />
                <br /><br />
                <WarrantyList title="Warranty Packages" tableData={this.props.warrantyList.tableData} loading={this.props.warrantyList.loading} addNew={this.addNew} editItem={this.editItem} delete={this.deleteItem} />
                <DialogRoot show={this.state.toggle}
                handleHide={ this.restartToggle}
                size={"md"}>
                    <ConfigForm formTitle={this.state.formTitle} formDesc={this.state.formDesc} formSectionTitle={this.state.formSectionTitle} closeForm={this.restartToggle} saveConfig={this.saveConfig} edit={this.state.edit} />
                </DialogRoot>
            </React.Fragment>
        )
    }
}
const mapStateToProps = ({ cmsState }) => {
    const { configState } = cmsState;
    const { coeList, servicingList, warrantyList } = configState;
    return { coeList, servicingList, warrantyList };
} 
export default connect(mapStateToProps, { show, getCoeSelected, newCoe, editCoe, deleteCoe, getServicingSelected, newServicing, editServicing, deleteServicing, getWarrantySelected, newWarranty, editWarranty, deleteWarranty })(configOptionList)