import React from "react";
import { connectModal } from "redux-modal";

import DialogRoot from "Components/Dialog/DialogRoot";
import DetailsTable from "Components/Booking/DetailsTable";
import Image from "Components/Image";

function ViewRentalCar(props) {
  const { show, handleHide, view } = props;
  return (
    <DialogRoot
      show={show}
      handleHide={handleHide}
      size="md"
      title="View Rental Car"
    >
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          {view.files.length > 0 ? (
            <img
              src={view.files[0].path}
              style={{
                height: 300,
                width: 300
              }}
            />
          ) : (
            <div
              className="text-center"
              style={{ height: 300, width: 300, backgroundColor: "#e6e6e6" }}
            >
              No Image
            </div>
          )}
        </div>
        <div className="col-md-8">
          <div className="p-10">
            <DetailsTable
              Style={"row"}
              Details={{
                Name: view.name,
                Category: view.rentalCategory && view.rentalCategory.name,
                Status: view.status,
                "Number of People": view.person,
                "Luggage Space": view.luggage,
                "Number of Doors": view.doors,
                Transmission: view.transmission,
                Price: view.price
              }}
            />
          </div>
        </div>
      </div>
    </DialogRoot>
  );
}

export default connectModal({ name: "view_rental_car" })(ViewRentalCar);
