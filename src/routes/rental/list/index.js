import React from "react";
import { useDispatch, useSelector } from "react-redux";

import BgCard from "Components/BgCard";
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctSectionLoader from "Components/RctSectionLoader";
import DialogRoot from "Components/Dialog/DialogRoot";
import SingleBookingForm from "Components/Booking/SingleBookingForm";
import RentalList from "./components/RentalList";
import RentalForm from './components/RentalBookingForm';

// Actions
import { getBookings, updateBookingStatus } from "Ducks/booking";

export default function rental_list(props) {
  const [viewState, setViewState] = React.useState({
    viewDialog: false,
    bookingToview: null,
  });

  const dispatch = useDispatch();
  const {
    bookings: { loading, listData }
  } = useSelector(state => state.bookingState);

  React.useEffect(() => {
    //dispatch(getBookings("Rental"));
  }, []);

  const handleHideDialog = () => {
    setViewState(prevState => ({
      ...prevState,
      viewDialog: !prevState.viewDialog,
      bookingToview: null
    }));
  };
  const handleOpenDialog = bookingId => {
    const singleBooking = listData.find(list => list.id == bookingId);
    setViewState({ viewDialog: true, bookingToview: singleBooking });
  };

  const ChangeStatus = async (id, status) => {
    dispatch(updateBookingStatus(id, status));
    handleHideDialog();
  };

  const handleNewBooking = () => {
    setViewState({ viewDialog: true, bookingToview: null});
  }

  return (
    <React.Fragment>
      <Helmet title="Rental List" />
      <PageTitleBar title="Rental Enquiries" />

      <BgCard>
        {loading && <RctSectionLoader />}
        <RentalList tableData={listData} viewBooking={handleOpenDialog} newBooking={handleNewBooking} />
      </BgCard>
      <DialogRoot
        show={viewState.viewDialog}
        handleHide={handleHideDialog}
        size="md"
      >
        { viewState.bookingToview != null ? <SingleBookingForm
          SingleBooking={viewState.bookingToview}
          ChangeStatus={ChangeStatus}
        /> : 
        <RentalForm />
        }
      </DialogRoot>
    </React.Fragment>
  );
}
