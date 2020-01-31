import React, { Component } from "react";
import api from "Api";


class index extends Component {
 
    render() {
        
        return (
            <div className="todo-dashboard" style={{border : '1px solid black', borderStyle : 'dashed', marginTop: 50, display: 'flex', flexDirection:'column', flex: 1}}>
                
                <div>last check for maintenance: date</div>
                <div>next check for maintenance: date</div>

                <div>last follow up: date</div>
                <div>next follow up: date</div>

                <div>Car Profile: </div>


                <div>detail of last appointment: Object</div>
                <div>Number of pending booking: Number</div>

                <div>Pending Transaction?</div>


            </div>
        );
    }

}

export default index;



