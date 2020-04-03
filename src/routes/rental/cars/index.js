import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { show } from "redux-modal";

import BgCard from "Components/BgCard";
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctSectionLoader from "Components/RctSectionLoader";
import RentalCarForm from "./components/RentalCarForm";
import ViewRentalCar from "./components/ViewRentalCar";

// Actions
import {
  getRentalCar,
  getRentalCategory,
  createRentalCar,
  deleteRentalCar,
  updateRentalCar
} from "Ducks/rental";
import RentalCarList from "./components/RentalCarList";

export default function rental_cars() {
  const dispatch = useDispatch();
  const { list, loading, categories } = useSelector(state => state.rentalState);
  React.useEffect(() => {
    dispatch(getRentalCar());
    dispatch(getRentalCategory());
  }, []);

  const newRentalCar = () => {
    dispatch(
      show("rental_car_form", {
        action: data => dispatch(createRentalCar(data))
      })
    );
  };
  const editRentalCar = id => {
    const edit = list.find(li => li.id == id);
    dispatch(
      show("rental_car_form", {
        action: data => dispatch(updateRentalCar(id, data)),
        edit
      })
    );
  };
  const viewRentalCar = id => {
    const view = list.find(li => li.id == id);
    dispatch(show("view_rental_car", { view }));
  };
  const deleteCar = id => {
    dispatch(
      show("alert_delete", { action: () => dispatch(deleteRentalCar(id)) })
    );
  };

  return (
    <React.Fragment>
      <Helmet title="Rental Cars" />
      <PageTitleBar title="Rental Cars" />
      <BgCard>
        {loading && <RctSectionLoader />}
        <RentalCarList
          tableData={list}
          newRentalCar={newRentalCar}
          editRentalCar={editRentalCar}
          viewRentalCar={viewRentalCar}
          deleteRentalCar={deleteCar}
        />
      </BgCard>
      <RentalCarForm categories={categories} />
      <ViewRentalCar />
    </React.Fragment>
  );
}
