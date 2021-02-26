import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctSectionLoader from "Components/RctSectionLoader";
import { show, hide } from "redux-modal";

import ItemList from "Components/Settings/itemList";
import AddItemDialog from "Components/Settings/itemForm";
import { getRentalCategory, createRentalCategory } from 'Ducks/rental';
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

    }
    const deleteSetting = (id, typeName) => {

    }

    const handleDelete = id => {

    }

    const addNewSetting = val => {
        dispatch(createRentalCategory({ name: val}));
    }

    const updateSetting = (id, val) => {

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