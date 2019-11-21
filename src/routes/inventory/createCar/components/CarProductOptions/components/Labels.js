import React, { PureComponent } from "react";
import api from "Api";


class Labels extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div style={{margin: 5}}>
                {this.props.e && 
                     <div key={this.props.index*0.3} style={{margin: 2.5, flex: 1, display:'flex', justifyContent:'space-between'}}>
                        <span>{this.props.e.name}</span>
                        <span>{this.props.e.value}</span>
                        <span>{this.props.e.value2}</span>
                    </div>
                }
            </div>
        )
    }
  
}

export default Labels;

