import React, { Component } from "react";
import api from "Api";

import Image from 'Components/Image'

import Input from 'Components/Inventory/Input'
import Text from 'Components/Inventory/Text'
import Button from 'Components/Inventory/Button'

class index extends Component {

  constructor(props) {
    super(props);
   
  }


    render() {
        
        return (
            <div className="todo-dashboard" style={{border : '1px solid black', borderStyle : 'dashed', marginTop: 50, display: 'flex', flexDirection:'row', flex: 1}}>
                <div>
                    Rental
                </div>
            </div>
        );
    }

}

export default index;



