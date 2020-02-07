import React from "react";
import Moment from 'moment'

const Index = ({Bookings}) =>{
    return (
        <div>
            {Bookings.map((e, index) => {
                return (
                    <div key={index} >
                        <DisplayValues
                            DisplayValues={e}
                        />
                    </div>
                )
            })}
        </div>
    );
}

export default Index


const DisplayValues = ({DisplayValues}) =>{
    console.log(DisplayValues)

    const {service, status, contact, content, id, created_at} = DisplayValues
    const {firstName, lastName, email, phone} = contact
    const {model, date, timeslot, description} = content
    
    return (
        <div style={{width: '100%', display:'flex', flexDirection:"row", justifyContent:'space-between', padding:10, alignItems:'center'}}>
            <div style={{width: 100}}>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{firstName + ' ' + lastName}</span>
            </div>
            <div style={{width: 100}}>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{Moment(created_at).format('LL')}</span>
            </div>
            <div style={{width: 100}}>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{email}</span>
            </div>
            <div style={{width: 100}}>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{phone}</span>
            </div>
            <div style={{width: 100}}>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{service}</span>
            </div>
            <div style={{width: 100}}>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{model}</span>
            </div>
            <div style={{width: 100}}>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{Moment(date).format('LL')}</span>
            </div>
            <div style={{width: 100}}>
                <span style={{color:"rgba(0,0,0,0.7)"}}>{status}</span>
            </div>
        </div>
    );
}

