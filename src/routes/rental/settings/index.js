import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctSectionLoader from "Components/RctSectionLoader";
import { show, hide } from "redux-modal";

import ItemList from "Components/Settings/itemList";
import AddItemDialog from "Components/Settings/itemForm";
import { getRentalCategory, createRentalCategory, deleteRentalCategory, updateRentalCategory } from 'Ducks/rental';
const RentalSettings = (props) => {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getRentalCategory());
    }, [])

    const { categories, loading } = useSelector(state => state.rentalState);

    const newSetting = () => {
        dispatch(show("add_itemsetting_form", {addItem: addNewSetting, itemName: "Rental Category", hide: hide}));
    }
    const editSetting = (id) => {
        const toEdit = categories.find(cat => cat.id == id);
        dispatch(show("add_itemsetting_form", { toEdit: toEdit, editItem: updateSetting, itemName: "Rental Category", hide: hide}));

    }
    const deleteSetting = (id, typeName) => {
        dispatch(show("alert_delete", {
            name: typeName,
            action: () => handleDelete(id)
        }))
    }

    const handleDelete = id => {
        dispatch(deleteRentalCategory(id));
    }

    const addNewSetting = val => {        
        dispatch(createRentalCategory({ name: val}));
        dispatch(hide("add_itemsetting_form"));
    }

    const updateSetting = (id, val) => {
        dispatch(updateRentalCategory(id, {name: val} ));
        dispatch(hide("add_itemsetting_form"));

    }

    return(
        <React.Fragment>
            <Helmet title="Rental Categories" />
            <PageTitleBar title="Rental Categories" />
            {loading && <RctSectionLoader />}
            <ItemList
              newItem={newSetting}
              editItem={editSetting}
              deleteItem={deleteSetting}
              itemName="Rental Category"
              tableData={categories}
            />
            <AddItemDialog />
        </React.Fragment>
    )
}

export default RentalSettings;