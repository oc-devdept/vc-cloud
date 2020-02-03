import React, { Component } from "react";
import api from "Api";


import DisplayValues from './components/DisplayValues'


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



    _RenderBookings = () => {
        const AllBookings = this.state.bookings

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
                
                {this.state.bookings.length > 0 && 
                    <div style={{height: 300, width:'100%', overflow:'auto'}}>
                        {this._RenderBookings()}
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



