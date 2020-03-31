import React, { useState, useEffect } from "react";
import api from "Api";

import { NotificationManager } from "react-notifications";

import BookingList from "Components/Booking/BookingList";
import DialogRoot from "Components/Dialog/DialogRoot";
import SingleBookingForm from "Components/Booking/SingleBookingForm";

import BookingForm from "Components/Booking/BookingForm";

const index = ({ customer }) => {
  if (!customer.id) {
    return null;
  }

  const [Bookings, setBookings] = useState([]);
  const [ShowDialog, setShowDialog] = useState(false);
  const [SingleBookingId, setSingleBookingId] = useState(null);
  const [SingleBooking, setSingleBooking] = useState(null);
  const [Loading, setLoading] = useState(true);

  // BOOKING
  const [Booking, setBooking] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const item = await api.get(`/customers/${customer.id}/bookings`);
      setBookings(Bookings => [...Bookings, ...item.data]);
      setLoading(() => false);
    }
    fetchData();
  }, [customer.id]);

  useEffect(() => {
    async function fetchData() {
      if (SingleBookingId) {
        const item = await api.get(`/bookings/${SingleBookingId}`);
        setShowDialog(() => true);
        setSingleBooking(() => item.data);
      }
    }
    fetchData();
  }, [SingleBookingId]);

  const SetSingleBooking = id => {
    setSingleBookingId(() => id);
  };

  const RestartDialog = () => {
    setShowDialog(() => false);
    setSingleBooking(() => null);
    setSingleBookingId(() => null);
  };

  const RestartBooking = () => {
    setBooking(() => !Booking);
  };

  const ChangeStatus = async (id, status) => {
    const item = await api.post(`/bookings/changeBookingStatus`, {
      data: { id, status }
    });
    const modifiedItem = item.data.fields;

    // DeepClone
    const cloneBookings = JSON.parse(JSON.stringify(Bookings));
    cloneBookings.map((e, index) => {
      if (e.id == modifiedItem.id) {
        return (cloneBookings[index] = modifiedItem);
      }
    });

    // Update current array with modified item
    setBookings(() => cloneBookings);
    setSingleBooking(() => modifiedItem);

    NotificationManager.success("Booking status has been changed");
  };

  const MakeNotes = async (id, notes) => {
    const item = await api.post(`/bookings/${id}/notes`, { content: notes });

    let cloneSingleBooking = JSON.parse(JSON.stringify(SingleBooking));
    cloneSingleBooking.notes.unshift(item.data);
    setSingleBooking(() => cloneSingleBooking);

    NotificationManager.success("New note has been added");
  };

  const CompleteBooking = async () => {
    const item = await api.get(`/customers/${customer.id}/bookings`);
    setBookings(() => [...item.data]);
    setBooking(() => !Booking);
  };

  return (
    <div className="todo-dashboard">
      <div className="d-flex justify-content-end" style={{ marginBottom: 10 }}>
        <button
          className="btn btn-primary"
          style={{ color: "white" }}
          onClick={RestartBooking}
        >
          Make A Booking
        </button>
      </div>

      {Bookings.length > 0 ? (
        <div className="d-flex flex-fill" style={{ width: "100%" }}>
          <BookingList
            tableData={Bookings}
            loading={Loading}
            SetSingleBooking={SetSingleBooking}
          />
        </div>
      ) : (
        <div>No Bookings</div>
      )}

      {ShowDialog && (
        <DialogRoot
          // title={title}
          show={ShowDialog}
          handleHide={RestartDialog}
          size={"md"}
        >
          <SingleBookingForm
            SingleBooking={SingleBooking}
            ChangeStatus={ChangeStatus}
            MakeNotes={MakeNotes}
          />
        </DialogRoot>
      )}

      {Booking && (
        <DialogRoot
          // title={title}
          show={Booking}
          handleHide={RestartBooking}
          size={"md"}
        >
          <BookingForm customer={customer} _handleComplete={CompleteBooking} />
        </DialogRoot>
      )}
    </div>
  );
};

export default index;
