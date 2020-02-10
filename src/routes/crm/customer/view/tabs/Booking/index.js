import React, { Component } from "react";
import api from "Api";

import BookingList from './components/BookingList'

class index extends Component {
 
    constructor(props) {
        super(props);
        this.state = ({
          bookings: [],
          loading: true
        })
      }

    async componentDidMount() {
        try {
          var id = this.props.customerID
          const item = await api.get(`/customers/${id}/bookings`);
          this.setState({bookings: item.data, loading: false})
        } catch (e) {
          console.log(e)
        } 
    }


    
    render() {
        
        return (
            <div className="todo-dashboard">
                
                {this.state.bookings.length > 0 && 
                    <div className="d-flex flex-fill" style={{width:'100%'}}>
                        <BookingList
                            tableData={this.state.bookings}
                            // loading={Loading}
                            // SetSingleBooking={SetBookingId}
                        />
                    </div>
                }


                {this.state.bookings.length == 0 && 
                    <div>
                        No Bookings 
                    </div>
                }
            </div>
        );
    }

}

export default index;



