import React, { Component, PureComponent } from "react";
import api from "Api";


class index extends PureComponent {

   
    render() {
       
        const {imageSource, single } = this.props
        
        if(single) {
            return (
                <div className="d-flex" style={{height: 120, width: 120, justifyContent:'center', boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', borderRadius: 20}}>
                    <img
                        src={imageSource[0].url}
                        height={120}
                        width={120}
                        style={{objectFit:'contain', borderRadius: 20}}
                    />
                </div>
            );
        } else {
            return (
                <div className="d-flex" style={{width: 120, height: 120}}>
                    no single
                </div>
            );
        }
        
    }
}

export default index;
