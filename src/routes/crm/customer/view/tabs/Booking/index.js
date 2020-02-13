import React, { Component, useState, useEffect } from 'react';
import api from "Api";

import { NotificationManager } from "react-notifications";

import BookingList from './components/BookingList'
import DialogRoot from "Components/Dialog/DialogRoot";
import SingleBookingForm from './components/SingleBookingForm'

const index = ({customerID}) => {
 
    if(!customerID){return null}

    const [Bookings, setBookings] = useState([]);
    const [ShowDialog, setShowDialog] = useState(false);
    const [SingleBookingId, setSingleBookingId] = useState(null);
    const [SingleBooking, setSingleBooking] = useState(null);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const item = await api.get(`/customers/${customerID}/bookings`);
            setBookings(Bookings => [...Bookings, ...item.data])
            setLoading(() => false)
        }
        fetchData();
    }, [customerID]);

    useEffect(() => {
        async function fetchData() {
            if(SingleBookingId){
                const item = await api.get(`/bookings/${SingleBookingId}`);
                setShowDialog(() => true)
                setSingleBooking(() => item.data)
            }
        }
        fetchData();
    }, [SingleBookingId]);


    const SetSingleBooking = (id) => {
        setSingleBookingId(() => id)
    }

    const RestartDialog = () => {
        setShowDialog(() => false)
        setSingleBooking(() => null)
        setSingleBookingId(() => null)
    }
   
    const ChangeStatus = async(id, status) =>{
        const item = await api.post(`/bookings/changeBookingStatus`, {data: {id, status}});
        const modifiedItem = item.data.fields

        // DeepClone
        const cloneBookings = JSON.parse(JSON.stringify(Bookings)); 
        cloneBookings.map((e, index) => {
            if(e.id == modifiedItem.id){
                return cloneBookings[index] = modifiedItem
            }
        })

        // Update current array with modified item
        setBookings(() => cloneBookings)
        setSingleBooking(() => modifiedItem)

        NotificationManager.success('Booking status has been changed');

    }


    const MakeNotes = async(id, notes) =>{
        const item = await api.post(`/bookings/${id}/notes`, {content: notes});

        let cloneSingleBooking = JSON.parse(JSON.stringify(SingleBooking)); 
        cloneSingleBooking.notes.unshift(item.data)
        setSingleBooking(() => cloneSingleBooking)

        NotificationManager.success('New note has been added');
    }
    



    return (
        <div className="todo-dashboard">
            
            {Bookings.length > 0 && 
                <div className="d-flex flex-fill" style={{width:'100%'}}>
                    <BookingList
                        tableData={Bookings}
                        loading={Loading}
                        SetSingleBooking={SetSingleBooking}
                    />
                </div>
            }

            {Bookings.length == 0 && 
                <div>
                    No Bookings 
                </div>
            }

            {ShowDialog &&
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
            }

        </div>
    );

}

export default index;






