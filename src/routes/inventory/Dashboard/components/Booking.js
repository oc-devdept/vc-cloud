import React, { Component } from "react";
import api from "Api";

import Image from 'Components/Image'

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import DatePickerInput from "Components/Form/Pickers/DatePicker";

import Input from 'Components/Inventory/Input'
import Text from 'Components/Inventory/Text'
import Button from 'Components/Inventory/Button'


const options = ['Test Drive', 'Maintenance', 'Rental']

const origin = {
    name: '',
    email: '',
    service: '',
    interest: '',
    contact: '',

    status: 'Awaiting',
    created: '',
    start: '',
    end: '',
}

class Booking extends Component {

  constructor(props) {
    super(props);
    this.state = {
    //   booking: {
    //     name: '',
    //     email: '',
    //     service: '',
    //     interest: '',
    //     contact: '',

    //     status: 'Awaiting',
    //     created: '',
    //     start: '',
    //     end: '',
    //   },
      booking: {
        name: 'John Doe',
        email: 'hello@gmail.com',
        service: '',
        interest: 'BMW3i Series X',
        contact: '92289321',

        status: 'Awaiting',
        created: '',
        start: '',
        end: '',
      }
    }
  }
 
  _HandleChange = (e, element) => {
    let booking = {...this.state.booking}
    booking[element] = e
    this.setState({booking: booking})
  }

  handleContact = (field, value) => {
    console.log(typeof(value))
    let booking = {...this.state.booking}
    booking[field] = value
    this.setState({booking: booking})
  }

  _SaveContact = async() => {

      let booking = {...this.state.booking}
      booking.created = new Date()

      // Create Api to backend to save bookings
      await api.post(`/bookings/createBooking`, {data: booking});

      this.setState({booking: origin})
  }

  _ToggleCategoryKey = (item) => {
    let booking = {...this.state.booking}
    booking.service = item.target.value
    this.setState({booking: booking})
  }


  render() {
        
    const {name, email, contact, service, interest} = this.state.booking

    return (
      <div className="todo-dashboard" style={{border : '1px solid black', borderStyle : 'dashed', marginTop: 50, display: 'flex', flexDirection:'row', flex: 1}}>
                            
            <div style={{display:'flex', flexDirection:"column", padding: 10, flex: 1}}>
   
                <div style={{display:'flex', flexDirection:"row", flex:1}}>
                    <Input
                        divStyle={{width: '100%', marginRight: 30}}
                        title="NAME"
                        placeholder="e.g John Doe"
                        value={name}
                        element={'name'}
                        _HandleProduct={this._HandleChange}

                    />  

                    <Input
                        divStyle={{width: '100%', marginRight: 30}}
                        title="EMAIL"
                        placeholder="e.g hello@email.com"
                        value={email}
                        element={'email'}
                        _HandleProduct={this._HandleChange}

                    /> 

                    <div style={{display:'flex', flexDirection:"row", flex:1}}>
                        <Text
                            divStyle={{width: '100%', marginRight: 10, display:'flex'}}
                            inputStyle={{alignItems:'center', justifyContent:'center', display:'flex', height:'100%'}}
                            title="SG"
                            value={'+65'}
                        />
                    
                        <Input
                            divStyle={{width: '100%'}}
                            title="PHONE CONTACT"
                            placeholder="e.g 12345678"
                            value={contact}
                            element={'contact'}
                            _HandleProduct={this._HandleChange}

                        /> 
                    </div>
                </div>

                <div style={{display:'flex', flexDirection:"row", flex:1}}>
                   
                    <div style={{display:'flex', flexDirection:"column", width:'100%', marginRight: 30,}}>
                        <span style={{paddingBottom: 10, paddingTop: 10, color:'rgba(150,150,150,1)'}}>CAR PRODUCT VARIANT GROUP NAME</span>
                        <FormControl>
                            <Select 
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={this.state.booking.service ? this.state.booking.service : 'Select Category'}
                                onChange={this._ToggleCategoryKey}
                                style={{minWidth: 100, marginLeft: 5}}
                            >
                            
                                {options.map((e, index) => {
                                    return <MenuItem key={index} value={e}>{e}</MenuItem>
                                })}
                            
                            </Select>
                        </FormControl>
                    </div>

                    <Input
                        divStyle={{width: '100%'}}
                        title="INTEREST"
                        placeholder="What is your model of interest?"
                        value={interest}
                        element={'interest'}
                        _HandleProduct={this._HandleChange}

                    /> 
                </div>

                {this.state.booking.service == "Rental" && 
                    <div style={{display:'flex', flex: 1, marginTop:10, alignItems:"center"}}>
                        <div style={{marginRight: 30}}>
                            <DatePickerInput
                                label="Start Date"
                                value={this.state.booking.start ? this.state.booking.start : null}
                                target="start"
                                handleChange={this.handleContact}
                            />
                        </div>

                        <div>
                            <DatePickerInput
                                label="End Date"
                                style={{marginRight: 30}}
                                value={this.state.booking.end ? this.state.booking.end : null}
                                target="end"
                                handleChange={this.handleContact}
                            />
                        </div>
                    </div>
                }

                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <Button
                        _Function={this._SaveContact}
                        product={''}
                        files={''}
                        title={'Submit'}
                    />
                </div>

            </div>

        </div>
    );
  }
}

export default Booking;



