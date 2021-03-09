import React, { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DayPicker from "react-day-picker";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Moment from 'moment';
import CustomerPicker from "Routes/crm/components/CustomerPicker";
import RentalPicker from './RentalPicker';

import { NotificationManager } from "react-notifications";
import api from 'Api'

let InitBookService = {
    model: '',
    date: new Date, // schedule date
    timeslot: '9am', // AM/PM
    description: '',
}

let InitUserProfile = {
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
}


const BookingForm = memo(({_HandleDayChange,_HandleInputForm, rentalId, timeslot, description, currentDate, Timeslot, _setItemTimeSlot, date, service, _setItemService, serviceOption}) => {

    return (
        <div className="d-flex flex-column">

            <div className="d-flex flex-column flex-fill">
                <div className="d-flex flex-row">
                    <div style={{flex: 1, padding: 25}}>
                        <div  className="d-flex flex-row flex-fill">
                            <div className="form-group d-flex flex-column" style={{flex:0.5, marginRight:25}}>
                            <RentalPicker
                    value={rentalId}                   
                    target="rentalId"                    
                    handleChange={_HandleInputForm}
                    required={true}
                    />
                            </div>

                            <div className="form-group d-flex flex-column" style={{flex:0.5}}>
                                <label>Service Type: </label> Rental

                               
                            </div>

                        </div>

                        <div  className="d-flex flex-row flex-fill">
                            <div className="form-group d-flex flex-column" style={{flex:0.5,  marginRight:25}}>
                                <label>Date</label>
                                <input type="text" value={currentDate} onChange={() => console.log('Date!')} className="form-control" placeholder="Pick your date" id="date" name="date" />
                            </div>

                            <div className="form-group d-flex flex-column" style={{flex:0.5}}>
                                <label>Timeslot</label>
                                {/* <input type="text" value={timeslot} onChange={() => console.log('Timeslot!')} className="form-control" placeholder="Select your time" id="timeslot" name="timeslot" /> */}

                                <FormControl>
                                    <Select 
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={timeslot ? timeslot : ''}
                                        onChange={_setItemTimeSlot}
                                        style={{minWidth: 100, marginLeft: 5}}
                                    >
                                    
                                        {Timeslot.map((e, index) => {
                                            return <MenuItem key={index} value={e}>{e}</MenuItem>
                                        })}
                                    
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <div  className="d-flex flex-row flex-fill">
                            <div className="form-group d-flex flex-column" style={{flex:1}}>
                                <label>Description</label>
                                <input type="text" value={description}  onChange={(e) => _HandleInputForm('description', e.target.value)} className="form-control" placeholder="Rental Description" id="description" name="description" />
                            </div>
                        </div>
                       
                    </div>

                    <DayPicker          
                        selectedDays={[date]}   
                        onDayClick={_HandleDayChange} 
                        style={{width: "50%",}}
                        month={new Date()}
                        disabledDays={[
                            {
                              after: new Date(new Date().setMonth(new Date().getMonth()+1)),
                              before: new Date(),
                            },
                        ]}
                    />

                </div>
            </div>

        </div>
        
    )

})

const UserProfile = memo(({_HandleInputProfile, customerName, customerId, email, phone}) => {

    return (
        <div className="d-flex flex-column">
            
            <div className="d-flex flex-column">
                <div style={{flex: 1, padding: 25}}>
                <div  className="d-flex flex-row flex-fill">
                    <CustomerPicker
                    value={customerId}                   
                    target="customerId"                    
                    handleChange={_HandleInputProfile}
                    />
                </div>          
                   
                    <div  className="d-flex flex-row flex-fill">
                        <div className="form-group d-flex flex-column" style={{flex:0.3,  marginRight:25}}>
                            <label>Phone</label>
                            <input type="text" value={phone}  readOnly className="form-control" placeholder="Phone number" id="phone" name="phone" />
                        </div>

                        <div className="form-group d-flex flex-column" style={{flex:0.7}}>
                            <label>Email</label>
                            <input type="text" value={email}  readOnly className="form-control" placeholder="Email" id="email" name="email" />
                        </div>
                    </div>

                </div>
            </div>

           


        </div>
    )
    
})
  


const index = ({customer, _handleComplete, serviceOption}) => {
 
  
    // BOOKING    
    const [Timeslot] = useState(["9am","10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]);
    const [Profile, setUserProfile] = useState({});
    const [currentDate, setDate] = useState(Moment(new Date).format('LL'));
    const [BookService, setBookService] = useState(InitBookService);
    const [Service, setService] = useState('');
    const customerList = useSelector(state => state.crmState.customerState.customerList.tableData);




    const _HandleInputProfile = (element, e) => {
        let cust = customerList.find(item => item.id == e);
        if(cust){
            setUserProfile({
                customerId: e,               
                phone: cust.mobile,
                email: cust.email
            })
        }
        
        //setUserProfile(Profile => ({ ...Profile, [element]: e }));
    };
    
    const _HandleDayChange = (date) => {
        setDate(() => Moment(date).format('LL'))
        setBookService(BookService => ({ ...BookService, date: date }));
    }

    const _HandleInputForm = (element, e) => {
        console.log(element);
        console.log(e);
        setBookService(BookService => ({ ...BookService, [element]: e }));
    };

    const _setItemTimeSlot = (e) => {
        setBookService(BookService => ({ ...BookService, timeslot: e.target.value }));
    }

    const _setItemService = (e) => {
        setService(() => (e.target.value));
    } 


    const onSubmit = async() =>{
        console.log("submit");
        /*
        const newBooking = {
            service: Service,
            status: 'Awaiting',
            contact: Profile,
            content: BookService,
        }
        const result = await api.post(`/bookings/createBooking`, {data: newBooking});
        console.log(result.data);
        console.log(result.data.data.success);

        switch(result.data.data.success){
            case 0:
                console.log("failure");
                // this.setState({error: true})
                NotificationManager.error('Unable to make booking request! Please check your fields or try again later');
                break
            case 1:
                // this.props._FetchProfile()
                console.log("success");
                NotificationManager.success('Booking created successfully');
                _handleComplete()
                break
            default:
                break
        }
        */
       
    }

    const RenderBookingForm = () => {

        const {customerId, email, phone} = Profile
        const {rentalId, date, timeslot, description} = BookService

        return (
            <div>
                <UserProfile
                    _HandleInputProfile={_HandleInputProfile}                    
                    email={email}
                    phone={phone}
                    customerId={customerId}
                />

                <BookingForm
                    _HandleDayChange={_HandleDayChange}
                    _HandleInputForm={_HandleInputForm}
                    _setItemTimeSlot={_setItemTimeSlot}
                    _setItemService={_setItemService}
                    Timeslot={Timeslot}
                    currentDate={currentDate}
                    rentalId={rentalId}
                    timeslot={timeslot}
                    description={description}
                    date={date}
                    service={Service}
                    serviceOption={serviceOption}
                />
                
                <div className="d-flex justify-content-end">
                    <button onClick={onSubmit} style={{width: 250, padding: 10, margin:20, borderRadius: 10,}} className="btn-primary">SAVE</button>
                </div>
            </div>
        )
    }


   

    return (
        <div className="todo-dashboard">
            {RenderBookingForm()}
        </div>
    );

}

export default index;
  