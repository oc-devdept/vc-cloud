import React, {useState, useEffect } from 'react';
import api from 'Api'
import Moment from 'moment'

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const StatusOption = ['Awaiting', 'Processing', 'Confirmed', 'Rejected']

const Index = ({SingleBooking}) => {
    
    if(!SingleBooking) {return null}

    const {created_at, service, status, contact, content, id} = SingleBooking
    const {firstName, lastName, email, phone} = contact
    const {model, date, timeslot, description} = content

    const [newStatus, setnewStatus] = useState(null);


    return (
        <div className="d-flex" style={{flex: 1, margin: 20}}>   
            <div className="d-flex flex-column" style={{flex:1}}>

                <div className="d-flex flex-row" style={{flex:1}}>
                    <div className="d-flex flex-column" style={{flex: 1, boxShadow: '0 5px 9px 0 rgba(0,0,0,0.15), 0 8px 25px 0 rgba(0,0,0,0.15)', marginRight: 25}}>
                        <div className="d-flex justify-content-center" style={{backgroundColor:'rgba(76,109,126,1)', padding: 10}}>
                            <span style={{textAlign:'center', color:'white'}}>BOOKING DETAILS</span>
                        </div>

                        <div style={{margin:25}}>
                            <Forms
                                Style={"row"}
                                Details={{
                                    id : id,
                                    Created: created_at,
                                    Scheduled: date,
                                    Timeslot: timeslot,
                                    Service: service,
                                    Model: model,
                                    Status: status,
                                    Description: description,

                                }}
                            />
                        </div>
                    </div>

                    <div className="d-flex flex-column" style={{boxShadow: '0 5px 9px 0 rgba(0,0,0,0.15), 0 8px 25px 0 rgba(0,0,0,0.15)'}}>
                        <div className="d-flex justify-content-center" style={{backgroundColor:'rgba(76,109,126,1)', padding: 10}}>
                            <span style={{textAlign:'center', color:'white'}}>USER DETAIL</span>
                        </div>

                        <div style={{margin:25}}>
                            <Forms
                                Style={"column"}
                                Details={{
                                    Name : `${firstName} ${lastName}`,
                                    Email: email,
                                    Phone: phone,
                                }}
                            />
                        </div>
                    </div> 
                </div>

                <div>
                    Change Status Awaiting, Processing, Confirmed || Rejected
                    <FormControl>
                        <Select 
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={newStatus ? newStatus : ''}
                            onChange={(e)=> setnewStatus(()=> e.target.value)}
                            style={{minWidth: 100, marginLeft: 5}}
                        >
                        
                            {StatusOption.map((e, index) => {
                                return <MenuItem key={index} value={e}>{e}</MenuItem>
                            })}
                        
                        </Select>
                    </FormControl>
                    
                    <button>Change Status</button>
                </div>

                <div>
                    Input replies // noteable?

                    or Input comment Description
                </div>

                </div>
        </div>
    );
};

export default Index;


const Forms = ({Details, Style}) => {  
    const BookingEntries = Object.entries(Details)

    if(Style == 'column'){
        return (
            <React.Fragment>
                {
                    BookingEntries.map((e, index) => {
                        const key = e[0]
                        const value = e[1]
                        return (
                            <div className="d-flex flex-column justify-content-between" key={index} style={{padding: 10}}>
                                <span>{key}</span>
                                <span style={{marginLeft: 15, marginTop: 5}}>{value}</span>
                            </div>
                        )
                    })
                }
            </React.Fragment>
        );

    } else {

        return (
            <React.Fragment>
                {
                    BookingEntries.map((e, index) => {
                        const key = e[0]
                        const value = e[1]

                        if (key == 'Created' || key == 'Scheduled'){
                            return (
                                <div className="d-flex flex-row justify-content-between" key={index} style={{padding: 10}}>
                                    <span>{key}</span>
                                    <span>{Moment(value).format('LL')}</span>
                                </div>
                            )
                        } else {
                            return (
                                <div className="d-flex flex-row justify-content-between" key={index} style={{padding: 10}}>
                                    <span>{key}</span>
                                    <span>{value}</span>
                                </div>
                            )
                        }
                    })
                }
            </React.Fragment>
        );
    }
}
