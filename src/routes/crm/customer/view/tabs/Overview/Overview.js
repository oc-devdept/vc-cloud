import React, { Component } from "react";
import api from "Api";

import Image from 'Components/Image'

import Input from 'Components/Inventory/Input'
import Text from 'Components/Inventory/Text'
import Button from 'Components/Inventory/Button'

import DisplayValues from './components/DisplayValues'


class index extends Component {
 
    _RenderBookings = () => {
        const AllBookings = this.props.bookings

        return (
            <div style={{flex: 1}}>
                <div style={{width: '100%', display:'flex', flexDirection:"row", backgroundColor: 'rgba(73,100,150,1)', padding: 10, justifyContent:'space-between'}}>
                        <div >
                            <span style={{color:"white"}}>NAME</span>
                        </div>
                        <div>
                            <span style={{color:"white"}}>EMAIL</span>
                        </div>
                        <div>
                            <span style={{color:"white"}}>CONTACT</span>
                        </div>
                        <div>
                            <span style={{color:"white"}}>SERVICE</span>
                        </div>
                        <div>
                            <span style={{color:"white"}}>INTEREST</span>
                        </div>
                        <div>
                            <span style={{color:"white"}}>DATE</span>
                        </div>
                        <div>
                            <span style={{color:"white"}}>STATUS</span>
                        </div>
                    {/* </div> */}
                </div>

                <div style={{paddingBottom:10,}}>
                    {AllBookings.map((e, index) => {
                        return (
                            <div key={index} >
                                <DisplayValues
                                    DisplayValues={e}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
               
        
    }

    render() {
        
        return (
            <div className="todo-dashboard" style={{border : '1px solid black', borderStyle : 'dashed', marginTop: 50, display: 'flex', flexDirection:'row', flex: 1}}>
                
                {this.props.bookings.length > 0 && 
                    this._RenderBookings()
                }


                {this.props.bookings.length == 0 && 
                    <div>
                        No Bookings 
                    </div>
                }
            </div>
        );
    }

}

export default index;



