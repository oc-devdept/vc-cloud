import React from "react";
import { useDispatch, useSelector } from "react-redux";

import BgCard from "Components/BgCard";
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctSectionLoader from "Components/RctSectionLoader";

// Actions
import { getRentalCar } from "Ducks/rental";
import RentalCarList from "./components/RentalCarList";

export default function rental_cars(props) {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(state => state.rentalState);
  React.useEffect(() => {
    dispatch(getRentalCar());
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Rental Cars" />
      <PageTitleBar title="Rental Cars" />

      <BgCard>
        {loading && <RctSectionLoader />}
        <RentalCarList tableData={list} />
      </BgCard>
    </React.Fragment>
  );
}
